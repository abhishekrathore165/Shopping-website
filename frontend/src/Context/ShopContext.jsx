import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [all_product,setAll_product] =useState([]);
    const [cartItem, setCartItem] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts').then((resp)=>resp.json()).then((data)=> setAll_product(data))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method: "POST",
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response)=>response.json()).then((data)=>setCartItem(data))
        }
    },[])
    
    const addToCart = (itemId) => {
        setCartItem((prev) => ({ ...prev,[itemId]:prev[itemId]+1 }))
      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        // .then((resp)=> resp.json()).then((data)=>console.log(data))   
      }
    }
    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        // .then((resp)=> resp.json()).then((data)=>console.log(data))
      }
    

    const getTotalCartAmount = ()=>{
        let totalamount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let iteminfo = all_product.find((product)=>product.id === Number(item))
                totalamount += iteminfo.new_price * cartItem[item];
            }
        }
        return totalamount;
    }

  const  getTotalCartItem =()=>{
        let totalitem = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                totalitem+= cartItem[item];
            }
        }
        return totalitem;
    }

    const contextValue = {getTotalCartItem, getTotalCartAmount, all_product, cartItem,addToCart,removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;