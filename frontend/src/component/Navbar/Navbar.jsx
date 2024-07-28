import React, { useContext, useRef, useState } from 'react'
import './navbar.css'
import logo from '../Assets/logo.png'
import carticon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_down from '../Assets/dropdown.png'
const Navbar = () => {
    const [menu,setMenu] = useState("shop")
    const {getTotalCartItem} = useContext(ShopContext)
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
     <div className="nav-logo">
     <img src={logo} alt="" />
      <p>SHOPPER</p>
     </div>
     <img className='nav-dropdown' onClick={dropdown_toggle} src={drop_down} alt="" />
     <ul ref={menuRef} className='nav-menu'>
        <li onClick={()=>{setMenu("shop")}} > <Link to='/'>Shop</Link>  {menu === 'shop'?<hr />:<></>}</li>
        <li onClick={()=>{setMenu("mens")}} > <Link to='/mens'>Men</Link>   {menu === 'mens'?<hr />:<></>}</li>
        <li onClick={()=>{setMenu("womens")}} > <Link to='/womens'>Women</Link>  {menu === 'womens'?<hr />:<></>}</li>
        <li onClick={()=>{setMenu("kids")}} > <Link to='/kids'>Kids</Link>  {menu === 'kids'?<hr />:<></>}</li>
     </ul>
     <div className="nav-login">
      {
        localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>  
      }
      
      <Link to='/cart'><img src={carticon} alt="" /></Link> 
        <div className="nav-count">{getTotalCartItem()}</div>
     </div>
    </div>

  )
}

export default Navbar
