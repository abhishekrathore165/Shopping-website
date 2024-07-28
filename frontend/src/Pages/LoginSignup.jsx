import React, { useState } from 'react'
import './css/loginsignup.css'
const LoginSignup = () => {
  const [state,setState] = useState("Login");

  const [formData,SetFormData] = useState({
    name:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    SetFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login funcion Executed",formData)
    let responsedata;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((resp)=> resp.json()).then((data)=>responsedata = data)

    if(responsedata.success){
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    }
    else{
     alert(responsedata.errors)
    }

  }
  const signup = async()=>{
    console.log("Signup funcion Executed" , formData)
    let responsedata;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((resp)=> resp.json()).then((data)=>responsedata = data)

    if(responsedata.success){
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    }
    else{
     alert(responsedata.errors)
    }
  }
  return (
    <div className='loginsingup'>
      <div className="loginsingup-cont">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
         {state==="Sign Up"?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>} 
          <input type="text" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="text"  name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={()=>{state === "Login"?login():signup() }}>Continue</button>
        {state==="Sign Up"? <p className='loginSingup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p> : <p className='loginSingup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
       
       
        <div className="loginSingup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
