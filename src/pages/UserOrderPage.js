import React from 'react'
import { UserOrder } from '../features/user/Component/UserOrder'
import Navbar from '../features/navbar/Navbar'
const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrder></UserOrder>
      </Navbar>
    </>
  )
}

export default UserOrderPage
