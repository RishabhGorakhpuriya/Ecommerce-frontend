import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductForm from '../features/admin/components/ProductForm'

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  )
}

export default AdminProductFormPage
