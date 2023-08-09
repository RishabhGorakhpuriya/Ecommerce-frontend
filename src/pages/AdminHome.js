import React from 'react'
import Navbar from '../features/navbar/Navbar'
// import ProductList from '../features/product/components/ProductList'
import AdminProductList from '../features/admin/components/AdminProductList'

const AdminHome = () => {
  return (
    <Navbar>
        <AdminProductList></AdminProductList>
    </Navbar>
  )
}

export default AdminHome
