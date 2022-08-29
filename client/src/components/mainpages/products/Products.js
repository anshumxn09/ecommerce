import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem';

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products
  console.log(products);

  return (
    <div className='products'>{
      products.map(products => {
        return <ProductItem key={products._id} product={products}/>
      })
    }</div>
  )
}

export default Products