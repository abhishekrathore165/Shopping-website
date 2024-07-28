import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './placeorder.css'
const Placeorder = () => {
    const {getTotalCartAmount} = useContext(ShopContext)
  return (
    <div className='container '>
    <h1>Thank You!</h1>
    <p>Thank you for your order with our website. We appreciate your business!</p>
  </div>
  )
}

export default Placeorder
