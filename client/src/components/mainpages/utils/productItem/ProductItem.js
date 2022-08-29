import React from 'react'
import {Link} from 'react-router-dom';

const ProductItem = ({product}) => {
  return (
    <div className='product_card'>
        <img src={product.images.url} alt="" />

        <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span><span className='small'>₹ </span><span className='bolder'>{product.price}</span></span>
            <p>{product.description}</p>
        </div>

        <div className="row_btn">
            <Link id='btn_buy' to="#!">
                Add To Cart 
            </Link>
            <Link id='btn_view' to={`/detail/${product._id}`}>
                View
            </Link>
        </div>
    </div>
  )
}

export default ProductItem;