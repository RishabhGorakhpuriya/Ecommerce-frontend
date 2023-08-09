import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../user/userSlice';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice'
import { discountPrice } from '../../../app/constants';
export function UserOrder() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders)
  useEffect(() => {
    // dispatch(fetchLoggedInUserOrdersAsync(user.id))
    dispatch(fetchLoggedInUserOrdersAsync())
  }, [dispatch])

  function formatOrderDate(dateString) {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString(); // Use any date format you prefer here
  }
  console.log(formatOrderDate())


  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-purple-600';
      case 'dispatch':
        return ' text-yellow-600'
      case 'delivered':
        return ' text-green-600'
      case 'cancelled':
        return ' text-red-600'
      default:
        return 'text-purple-600';
    }
  }
  return (
    <>
      {Array.isArray(orders) ? orders.map((order, index) => {
        return (
          <div className='contianer p-5'>
            <div className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8 mt-10">
              <div className="border-t border-gray-200 px-2 py-6 sm:px-6" key={index}>
                <h3 className="flex text-3xl my-1 font-bold tracking-tight text-gray-900 text-align-center sm-flex flex-wrap text-xl">Order Number  #{order.id}</h3>
                <h4 className={`${chooseColor(order.status)} text-xl my-1 font-bold tracking-tight  text-align-center my-5`}>Order Status {order.status}</h4>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex py-6 my-2">
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
                                  <a href={item.product.href}>{item.product.title}</a>
                                </h3>
                                <p className="ml-4">${discountPrice(item.product)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900 me-2">
                                  Qty : {item.quantity}
                                </label>
                              </div>
                              <div className="flex">
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
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Order Date : {formatOrderDate(order.date)}</p>

                  </div>
                  <p className="mt-2 text-sm text-gray-500">Shipping Address</p>
                </div>
                <div className="flex justify-between px-3 gap-x-6 py-5 border-solid border-2 border-gray my-2 sm-flex flex-wrap">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">Name : {order.selectedAddress.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-700">Email : {order.selectedAddress.email}</p>
                    </div>
                  </div>
                  <div className="xsm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Phone Number : {order.selectedAddress.phone}</p>
                    <p className="text-sm leading-6 text-gray-900">Address : {order.selectedAddress.address} {order.selectedAddress.city} {order.selectedAddress.state}</p>
                    <p className="text-sm leading-6 text-gray-900">Pincode : {order.selectedAddress.PinCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }) : null}
    </>
  );
}
