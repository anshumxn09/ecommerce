import React, {useContext, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products
    const addCart = state.UserAPI.addCart;
    const [detailProduct, setDetailProduct] = useState([]);
    // console.log(addCart(detailProduct));
    useEffect(() => {
        if(params.id){
            products.forEach(p => {
                if(p._id === params.id) setDetailProduct(p);
            })
        }
    }, [params.id, products])


    // console.log(detailProduct);
    if(detailProduct.length === 0) return null;
  return (
    <>
    <div className='detail'>
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
            <div className="row">
                <h2>{detailProduct.title}</h2>
                {/* <h6>{detailProduct.product_id}</h6> */}
            </div>
            <span><span className='small'>₹ </span><span className='bolder'>{detailProduct.price}</span></span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p>Sold : {detailProduct.sold}</p>
        <Link to={"/cart"} className="cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
        </div>
    </div>
    <div>
        <h2 className='padd'>Related Products</h2>
        <div className="products">
            {
                products.map(product => {
                    return ((product.category === detailProduct.category) && product._id !== detailProduct._id) ? <ProductItem key={product._id} product={product} /> : null
                })
            }
        </div>
    </div>
    </>
  )
}

export default DetailProduct;