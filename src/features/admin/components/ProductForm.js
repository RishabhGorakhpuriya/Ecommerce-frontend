import React, { useEffect, useState } from 'react'
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product/productSlice'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Modal from '../../comman/Modal'

const ProductForm = () => {
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch()
    const params = useParams()
    const selectProduct = useSelector(selectProductById)
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [openModel, setOpenModel] = useState(false)
    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductByIdAsync(params.id))
        } else {
            dispatch(clearSelectedProduct())
        }
    }, [params.id, dispatch])


    useEffect(() => {
        if (selectProduct && params.id) {
            setValue('title', selectProduct.title)
            setValue('description', selectProduct.description)
            setValue('price', selectProduct.price)
            setValue('brand', selectProduct.brand)
            setValue('categories', selectProduct.categories)
            setValue('discountPercentage', selectProduct.discountPercentage)
            setValue('stock', selectProduct.stock)
            setValue('rating', selectProduct.rating)
            setValue('thumbnail', selectProduct.thumbnail)
            setValue('image1', selectProduct.images[0])
            setValue('image2', selectProduct.images[1])
            setValue('image3', selectProduct.images[2])
        }
    }, [selectProduct, params.id, setValue])


    const handleDelete = () => {
        const product = { ...selectProduct };
        product.deleted = true;
        dispatch(updateProductAsync(product))
    }
    return (
        <div className='container'>
            <form noValidate onSubmit={handleSubmit((data) => {
                console.log(data)
                const product = { ...data };
                product.images = [product.image1, product.image2, product.image3, product.thumbnail];
                product.rating = product.rating || 0;
                delete product['image1'];
                delete product['image2'];
                delete product['image3'];
                console.log(product)
                product.price = +product.price;
                product.rating = +product.rating;
                product.stock = +product.stock;
                if (params.id) {
                    product.id = params.id;
                    dispatch(updateProductAsync(product))
                } else {
                    dispatch(createProductAsync(product))
                }
                reset()
            })}>
                <div className="space-y-12 mt-10 p-10 bg-white" style={{ marginTop: '60px' }}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Add Product</h2>
                        {selectProduct && selectProduct.deleted && <h2 className='text-red-500 my-4'>This product is deleted</h2>}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            {...register('title', { required: "title is required" })}
                                            id="title"
                                            autoComplete="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register('description', { required: "title is required" })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select  {...register('brand', { required: "brand is required" })}>
                                        <option value="">--choose brand--</option>
                                        {brands.map((brand, index) => {
                                            return (
                                                <option key={index} value={brand.value}>{brand.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                                    categories
                                </label>
                                <div className="mt-2">
                                    <select  {...register('categories', { required: "categories is required" })}> <option defaultValue="">--choose category --</option>
                                        {categories.map((category, index) => {
                                            return (
                                                <option key={index} value={category.value}>{category.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('price', { required: "price is required", min: 1, max: 10000 })}
                                        id="price"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('discountPercentage', { required: "discount is required", min: 1, max: 80 })}
                                        id="discountPercentage"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('stock', { required: "stock is required", min: 1, max: 1000 })}
                                        id="stock"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register('rating', { required: "stock is required", min: 1, max: 5 })}
                                        id="rating"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('thumbnail', { required: "Thumbnail is required" })}
                                        id="thumbnail"
                                        autoComplete="thumbnail"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="image1"
                                        {...register('image1', { required: "image1 is required" })}
                                        type="text"
                                        autoComplete="image1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="image2"
                                        {...register('image2', { required: "image2 is required" })}
                                        type="text"
                                        autoComplete="image2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="image3"
                                        {...register('image3', { required: "image3 is required" })}
                                        type="text"
                                        autoComplete="image3"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    {selectProduct && !selectProduct.deleted && <button
                        type="submit"
                        onClick={(e) => { e.preventDefault(); setOpenModel(true) }}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete
                    </button>}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
            {selectProduct &&<Modal
                title={`Delete ${selectProduct.title}`}
                dangerOption="Delete"
                cancelOption="Cancel"
                message="Are you sure you want to delete this Product"
                cancelAction={(e) => setOpenModel(false)}
                dangerAction={handleDelete}
                shoModal={openModel}>

            </Modal>}
        </div>
    )
}

export default ProductForm
