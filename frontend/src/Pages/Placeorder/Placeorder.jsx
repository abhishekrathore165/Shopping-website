import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './placeorder.css'
const Placeorder = () => {
    const {getTotalCartAmount} = useContext(ShopContext)
  return (
    <form className='placeorder'>
       <div className="placeleft">
        <p className='title'>Delivery Information</p>
        <div className="nulti-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text"  placeholder='Street'/>
        <div className="nulti-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="nulti-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
       </div>
       <div className="placeright">
       <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-details">
              <p>Delivery Free</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button >PROCEED TO Payment</button>
        </div>
       </div>
    </form>
  )
}

export default Placeorder
