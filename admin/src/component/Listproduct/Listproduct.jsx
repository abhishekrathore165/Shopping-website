import React, { useEffect, useState } from 'react'
import './listproduct.css'
import cross from '../../assets/cross_icon.png'
const Listproduct = () => {
  const [allproducts,setAllproducts] = useState([]);

  const fetchInfo = async()=>{
    await fetch('http://localhost:4000/allproducts').then((resp)=>resp.json()).then((data)=>{setAllproducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeproduct = async(id)=>{
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    })
   await fetchInfo();
  }

  return (
    <div className='listproduct'>
        <h1>All Products List</h1>
       <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old_Price</p>
        <p>New_Price</p>
        <p>Category</p>
        <p>Remove</p>
       </div>
       <div className="listproduct-allproduct">
        <hr />
          {allproducts.map((product,index)=>{
        
        return <> <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} className='listproduct-icon' alt="" />
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img className='listproduct-remove-icon' onClick={()=>{removeproduct(product.id)}} src={cross} alt="" />
              </div>
            <hr /> 
            </> 
          })}
       </div>

    </div>
  )
}

export default Listproduct
