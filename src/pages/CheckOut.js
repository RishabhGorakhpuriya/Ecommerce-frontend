import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItem, updateCartAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { discountPrice } from '../app/constants';
import Navbar from '../features/navbar/Navbar';
import { selectUserInfo } from '../features/user/userSlice';

const CheckOut = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const items = useSelector(selectItem)
    const currentOrder = useSelector(selectCurrentOrder)
    const totalAmount = items.reduce((amount, item) => discountPrice(item.product) * item.quantity + amount, 0);
    const totalItem = items.reduce((total, item) => item.quantity + total, 0);
    // const user = useSelector(selectLoggedInUser)
    const user = useSelector(selectUserInfo)

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
    }
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null)

    const handleAddress = (e) => {
        console.log(e.target.value)
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
        console.log(e.target.value)
        setPaymentMethod(e.target.value)
    }

    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = { items, totalAmount, totalItem, user: user.id, paymentMethod, selectedAddress, status: 'pending' }
            dispatch(createOrderAsync(order))

        } else {
            alert("Enter the Address and Payment Method")
        }
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    return (
        <>
            {!items.length && <Navigate to="/" replace={true}></Navigate>}
            {currentOrder && currentOrder.paymentMethod === 'cash' && (<Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>)}
            {currentOrder && currentOrder.paymentMethod === 'card' && (<Navigate to={`/stripe-checkout/`} replace={true}></Navigate>)}
            <Navbar>
                <div className='contianer mt-10' style={{ marginTop: '60px' }}>
                    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-4">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            <div className='lg:col-span-3'>
                                <form className='bg-white p-5' noValidate onSubmit={handleSubmit((data) => {
                                    console.log(data)
                                    dispatch(updateUserAsync({ ...user, addresses: user.addresses ? [...user.addresses, data] : [data] }))
                                    reset()
                                })}>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-4">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('name', { required: 'name is required' })}
                                                            id="name"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register('email', { required: 'email is required' })}
                                                            type="email"
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Phone Number
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            {...register('phone', { required: 'Phone number is required' })}
                                                            type="tel"
                                                            autoComplete="phone"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            {...register('country', { required: 'country is required' })}
                                                            autoComplete="country-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            <option>United States</option>
                                                            <option>Canada</option>
                                                            <option>India</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('address', { required: 'address is required' })}
                                                            id="address"
                                                            autoComplete="address"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('city', { required: 'city address is required' })}
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('state', { required: 'state  is required' })}
                                                            id="state"
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="PinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Pin code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('PinCode', { required: 'pin-code  is required' })}
                                                            id="PinCode"
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                Reset
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose from existing address
                                            </p>
                                            <ul role="list" >
                                                {user && user.addresses?.map((address, index) => (
                                                    <li key={index} className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray my-2">
                                                        <div className="flex gap-x-4">
                                                            <input
                                                                onChange={handleAddress}
                                                                value={index}
                                                                id="address"
                                                                name="address"
                                                                type="radio"
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm leading-6 text-gray-900">{address.address} {address.city}</p>
                                                            {address.PinCode ? (
                                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                    PinCode : <time dateTime={address.PinCode}>{address.PinCode}</time>
                                                                </p>

                                                            ) : (
                                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                    </div>
                                                                    <p className="text-xs leading-5 text-gray-500">{address.city}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-10 space-y-10">
                                                <fieldset>
                                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                                    <div className="mt-6 space-y-6">
                                                        <div className="flex items-center gap-x-3">
                                                            <input
                                                                id="cash"
                                                                onChange={handlePayment}
                                                                value='cash'
                                                                name="payment"
                                                                type="radio"
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Cash On delivery
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <input
                                                                id="card"
                                                                onChange={handlePayment}
                                                                value='card'
                                                                name="payment"
                                                                type="radio"
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Card Payment
                                                            </label>
                                                        </div>

                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-5">
                                    <div className="border-t border-gray-200 px-2 py-3 sm:px-4">
                                        <h2 className="text-4xl my-1 font-bold tracking-tight text-gray-900 text-align-center">Cart</h2>
                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {items.map((item) => (
                                                        <li key={item.id} className="flex py-6 my-4">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={item.product.thumbnail}
                                                                    alt={item.product.title}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={item.product.id}>{item.product.title}</a>
                                                                        </h3>
                                                                        <p className="ml-4">${discountPrice(item.product)}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="text-gray-500  rounded-sm">
                                                                        <label htmlFor="quantity" className="inline text-xl font-medium leading-6 text-gray-900 me-2">
                                                                            Qty
                                                                        </label>
                                                                        <select className='rounded-md mt-2' onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                            <option value="10">10</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            onClick={e => handleRemove(e, item.id)}
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>${totalAmount}</p>
                                            </div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Total Item in Cart</p>
                                                <p>{totalItem} item</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <div
                                                    onClick={handleOrder}
                                                    className="flex items-center justify-center rounded-md border border-transparent  bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                                >
                                                    Order Now
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <Link to="/">
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Navbar>
        </>

    )
}

export default CheckOut
