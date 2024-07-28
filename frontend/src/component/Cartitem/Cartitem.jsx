import React, { useContext } from 'react'
import axios from 'axios';
import './Cart.css'
import { ShopContext } from '../../Context/ShopContext'
import carticon from '../Assets/cart_product_icon.png'
import remove from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
const Cartitem = () => {
    const {getTotalCartAmount,all_product,cartItem,removeFromCart} = useContext(ShopContext);

    // const history = useHistory();
    const navigate = useNavigate();
  return (
    <div className='cartitem'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
     {
        all_product.map((e)=>{
          if(cartItem[e.id]>0){
            return  <div>
            <div className="cartitem-format cartitem-format-main">
                <img className='carticon' src={e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitem-quantity'>{cartItem[e.id]}</button>
                <p>${e.new_price*cartItem[e.id]}</p>
                <img className='carticon-remove' src={remove} onClick={()=>{removeFromCart(e.id)}} alt="" />
            </div>
                <hr />
          </div>
          }
          return null;
        })
     }
     <div className="cartitem-down">
      <div className="cartitem-total">
        <h1>cart Totals</h1>
        <div>
          <div className="cartitem-total-item">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitem-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitem-total-item">
            <h3>Total</h3>
            <h3>${getTotalCartAmount()}</h3>
          </div>
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cartitem-promocode">
        <p>If you have a promo code, Enter it here  </p>
        <div className="cartitem-promobox">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Cartitem
