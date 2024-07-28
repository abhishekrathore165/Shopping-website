import React from 'react'
import './offer.css'
import exclusive from '../Assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className='offer'>
      <div className="offer-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offer-right">
        <img src={exclusive} alt="" />
      </div>
    </div>
  )
}

export default Offers
