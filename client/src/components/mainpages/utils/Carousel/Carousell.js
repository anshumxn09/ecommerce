import React, { useState } from 'react'
import './Carousell.css';

const Carousell = () => {
  const [autoplay] = useState(true);
  return (
    <>
      <div className="containerC">
        <div className="contentC">
            <div className="imageC">
                <img src="https://res.cloudinary.com/anshumxn09/image/upload/v1664974876/test/vansh_vsvlii.jpg" alt="vansh image" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Carousell;