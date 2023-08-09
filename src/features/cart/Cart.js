import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectCartStatus, selectItem, updateCartAsync } from './cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { discountPrice } from '../../app/constants';
import { Circles } from 'react-loader-spinner'
import Modal from '../comman/Modal';


export function Cart() {
  const [open, setOpen] = useState(true);
  const [openModel, setOpenModel] = useState(false)
  const dispatch = useDispatch();
  const items = useSelector(selectItem)
  const totalAmount = items.reduce((amount, item) => discountPrice(item.product) * item.quantity + amount, 0);
  const status = useSelector(selectCartStatus)
  const totalItem = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }))
  }
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>
      {!items.length &&  <Navigate to="/" replace={true}></Navigate>}
      <div className='contianer p-5'>
        <div className="mx-auto bg-white max-w-7xl px-1 sm:px-6 lg:px-8 mt-10">
          <div className="border-t border-gray-200 px-3 py-6 sm:px-6">
            <h2 className="text-4xl my-1 font-bold tracking-tight text-gray-900 text-align-center">Cart</h2>
            <div className="mt-8">
              <div className="flow-root">
                {status === 'loading' ? <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> : null}
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6 my-2">
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
                          <div className="text-gray-500">
                            <label htmlFor="quantity" className="inline text-xl font-medium leading-6 text-gray-900 me-2">
                              Qty
                            </label>
                            <select className='rounded-md mt-4' onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
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
                            {/* <Modal
                               title={`Delete ${item.product.title}`}
                               dangerOption="Delete"
                               cancelOption="Cancel"
                              message="Are you sure you want to delete this cart item"
                              cancelAction={(e)=>{setOpenModel(false)}}
                              dangerAction={e => handleRemove(item.id)}
                              shoModal={openModel === item.id}></Modal> */}
                            <button
                              type="button"
                              onClick={(e)=>handleRemove(e, item.id)}
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
            <div className="border-t border-gray-200 px-4 py-6 sm:px-1 my-2 lh-lg">
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
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
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
    </>

  );
}
export default Cart