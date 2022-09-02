import React from 'react'
import {Link} from 'react-router-dom';

const NothingCart = () => {
  return (
    <div className="mainntg">
    <div className='ntgcartcenter'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613108-3020773.png" alt="" />
        <h3>Your Cart Is Empty.</h3>
        <Link to={"/"}>SHOP NOW</Link>
    </div>
    </div>
  )
}

export default NothingCart