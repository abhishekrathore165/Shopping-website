import React, { useEffect, useState } from 'react'
import './newcollecion.css'
import Item from '../item/Item'
// import newcollection from '../Assets/new_collections'
const Newcollection = () => {
  const [newcollection,setNewcollection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollection').then((resp)=>resp.json()).then((data)=>setNewcollection(data));
  },[])
  return (
    <div className='newcollection'>
      <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
          {
            newcollection.map((item,i)=>{
               return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
          }
        </div>
    </div>
  )
}

export default Newcollection
