import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrum from '../component/Breadcrum/Breadcrum';
import Productdisplay from '../component/ProductDisplay/Productdisplay';
import Description from '../component/Description/Description';
import RealtedProduct from '../component/RelatedProduct/RealtedProduct';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {ProductId} = useParams();
  const product = all_product.find((e)=>e.id=== Number(ProductId))
  return (
    <div>
      <Breadcrum product={product}/>
      <Productdisplay product={product}/>
      <Description/>
      <RealtedProduct/>
    </div>
  )
}

export default Product
