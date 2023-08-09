import React, { useEffect, useState } from 'react'
import { ITEM_PER_PAGE, discountPrice } from '../../../app/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice'
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import Pagination from '../../comman/Pagination'
const AdminOrder = () => {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders)
  const [editableOrderId, setEditableOrderId] = useState(-1)
  const [sort, setSort] = useState({})
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE }
    dispatch(fetchAllOrderAsync(pagination))
  }, [dispatch, page])


  const handleSort = (SortOption) => {
    const sort = { _sort: SortOption.sort, _order: SortOption.order }
    setSort(sort)
    console.log(sort)
  }

  const handleShow = () => {

  }

  const handleEdit = (order) => {
    setEditableOrderId(order.id)
  }


  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value }
    dispatch(updateOrderAsync(updateOrder))
    setEditableOrderId(-1)
  }
  const handlePaymentStatus = (e, order) => {
    const updateOrder = { ...order, paymentStatus: e.target.value }
    dispatch(updateOrderAsync(updateOrder))
    setEditableOrderId(-1)
  }


  const handlePage = (page) => {
    setPage(page)
    // const pagination = { _page: page, _limit: ITEM_PER_PAGE }
    // dispatch(fetchAllOrderAsync(pagination))
  }


  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE }
    dispatch(fetchAllOrderAsync({ sort, pagination }))
  }, [dispatch, page, sort])


  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatch':
        return 'bg-yellow-200 text-yellow-600'
      case 'delivered':
        return 'bg-green-200 text-green-600'
      case 'recieved':
        return 'bg-green-200 text-green-600'
      case 'cancelled':
        return 'bg-red-200 text-red-600'
      default:
        return 'bg-purple-200 text-purple-600';
    }
  }
  return (
    <>
      <div className="overflow-x-auto mt-10">
        <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-2 text-left cursor-pointer"
                      onClick={(e) => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc' })}>Order #
                      {sort._sort === 'id' && (sort._order === 'asc' ? <ArrowUpIcon className='w-4 h-4 inline mx-2'></ArrowUpIcon>
                        : <ArrowDownIcon className='w-4 h-4 inline mx-2'></ArrowDownIcon>)}
                    </th>
                    <th className="py-3 px-4 text-left">Items</th>
                    <th className="py-3 px-2 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Order Status</th>
                    <th className="py-3 px-6 text-center">Payment Method</th>
                    <th className="py-3 px-6 text-center">Payment Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {Array.isArray(orders) ? orders.map((order, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-2 px-6 text-left">
                          {order.items.map((item, index) => {
                            return (
                              <div key={index} className="flex items-center text-sm font-semibold">
                                <div className="mr-2 my-2">
                                  <img
                                    className="w-10 h-10 rounded-full mx-2"
                                    src={item.product.thumbnail}
                                    alt={`Thumbnail of ${item.product.title}`}
                                  />
                                </div>
                                <span className='mx-2'>{item.product.title}  QTY-{item.quantity} ${discountPrice(item.product)}</span>
                              </div>
                            );
                          })}
                        </td>
                        <td className="py-3 px-6 text-center text-sm font-semibold">
                          <div className="flex items-center justify-center">
                            ${order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center text-sm">
                          <div className="">
                            <div className='mx-1'><strong>{order.selectedAddress.name}</strong></div>
                            <div className='mx-1'>{order.selectedAddress.phone}</div>
                            <div className='mx-1'>{order.selectedAddress.address}</div>
                            <div className='mx-1'>{order.selectedAddress.city}, {order.selectedAddress.PinCode}, {order.selectedAddress.country}</div>
                            <div className='mx-1'>{order.selectedAddress.state}</div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={e => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatch">Dispatch</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className={`${chooseColor(order.status)}  py-1 px-3 rounded-full text-xs`}>
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center text-sm font-semibold">
                          <div className="flex items-center justify-center">
                            {order.paymentMethod}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={e => handlePaymentStatus(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="recieved">Recieved</option>
                            </select>
                          ) : (
                            <span className={`${chooseColor(order.paymentStatus)}  py-1 px-3 rounded-full text-xs`}>
                              {order.paymentStatus}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-around">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon className='w-5 h-5' onClick={handleShow}></EyeIcon>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon className='w-5 h-5' onClick={e => handleEdit(order)}></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  }) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItem={totalOrders}></Pagination>
      </div>
    </>

  )
}

export default AdminOrder
