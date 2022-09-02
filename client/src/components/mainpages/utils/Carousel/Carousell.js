import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Carousell.css';

const Carousell = () => {
  return (
    <Carousel autoPlay infiniteLoop showArrows={false} className="main-slide">
        <div>
            <img src="https://res.cloudinary.com/anshumxn09/image/upload/v1662139716/test/vansh_tnfno6.jpg" alt="Raftaar" />
        </div>
        <div>
            <img src="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/raftaar_2.jpg" alt="Raftaar" />
        </div>
        <div>
            <img src="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/raftaar_2.jpg" alt="Raftaar" />
        </div>
    </Carousel>
  )
}

export default Carousell