import React, { useState } from 'react'
import './addproduct.css'
import upload_area from '../../assets/upload_area.svg'
const Addproduct = () => {
  const [image,setImage]= useState(false);

  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:"",
  })

  const imagehandler =(e)=>{
   setImage(e.target.files[0]);
  }

  const changehandler = (e)=>{
       setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const Add_Product = async ()=>{
    console.log(productDetails)
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData = data})

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=> resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })        
    }

  }



  return (
    <div className='addproduct'>
      <div className="addproduct-item">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changehandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-item">
            <p>Other Price</p>
            <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-item">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={changehandler} className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-item">
        <label htmlFor="file-input">
            <img  src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imagehandler} type="file" name='image' id='file-input'hidden />
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct
