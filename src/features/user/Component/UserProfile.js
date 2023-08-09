import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../../user/userSlice'
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUserInfo)
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [showAddAddressFrom, setShowAddAddressFrom] = useState(false)
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1, addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const address = userInfo.addresses[index];
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('country', address.country)
    setValue('address', address.address)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('PinCode', address.PinCode)
  }

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }
    dispatch(updateUserAsync(newUser))
    setShowAddAddressFrom(false)
  }
  return (
    <>
      <div className='contianer p-5'>
        <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="border-t border-gray-200  py-6 sm:px-6">
            <h4 className="text-xl my-1 font-bold tracking-tight text-gray-500 text-align-center my-5">Email : {userInfo.email}</h4>
            {userInfo.role === 'admin' && userInfo.role === 'admin' && <h4 className="text-xl my-1 font-bold tracking-tight text-gray-500 text-align-center my-5">Role : {userInfo.role}</h4>}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-1 my-2 lh-lg">
              <div className="my-6 flex items-center justify-start gap-x-6">
                <button
                  type="submit"
                  onClick={(e) => { setShowAddAddressFrom(true); setSelectedEditIndex(-1) }}
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add Address
                </button>
              </div>

              {showAddAddressFrom ? <form className='bg-white' noValidate onSubmit={handleSubmit((data) => {
                console.log(data)
                handleAdd(data);
                reset()
              })}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add Address</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                            autoComplete="PinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      onClick={(e) => setShowAddAddressFrom(false)}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

              </form> : null}
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>
            </div>
            {userInfo.addresses.map((address, index) => {
              return (
                <div>
                  {selectedEditIndex === index ? <form className='bg-white p-5'  onSubmit={handleSubmit((data) => {
                    console.log(data)
                    handleEdit(data, index);
                    reset()
                  })}>
                    <div className="space-y-12" key={index}>
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                autoComplete="PinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          onClick={(e) => setSelectedEditIndex(-1)}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form> : null}
                  <div className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray my-2 sm-flex flex-wrap">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-700">{address.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.address} {address.city}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-700">PinCode : {address.PinCode}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-700">Phone : {address.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-x-4">
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={e => handleEditForm(index)}
                          className="font-medium text-indigo-600 hover:text-indigo-500 my-2"
                        >
                          Edit
                        </button>
                        <br />
                        <button
                          type="button"
                          onClick={e => handleRemove(e, index)}
                          className="font-medium text-indigo-600 hover:text-indigo-500 my-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
