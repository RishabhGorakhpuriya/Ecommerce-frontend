import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/comman/Footer'

const ProductdetialsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer> </Footer>
    </>
  )
}

export default ProductdetialsPage
