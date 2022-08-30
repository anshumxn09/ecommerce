import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading';
import ProductItem from '../utils/productItem/ProductItem';

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products
  // console.log(products);
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <>
    <div className='products'>{
      products.map(products => {
        return <ProductItem key={products._id} product={products} isAdmin={isAdmin}/>
      })
    }</div>
    {products.length === 0 && <Loading/>}
    </>
  )
}

export default Products