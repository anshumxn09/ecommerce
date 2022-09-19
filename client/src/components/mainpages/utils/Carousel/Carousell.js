import React, { useState } from 'react'
import { Slide } from 'react-slideshow-image';
import { myImages } from './ImageData';

const Carousell = () => {
  const [autoplay] = useState(true);
  return (
    <>
      <section className="hero-images slider">
        <Slide transitionDuration={500} indicators autoplay={autoplay}>
          {myImages.map((image) => (
            <div key={image.id} className="hero slide">
                <img
                  id={image.id}
                  className="responsive"
                  src={image.src}
                  alt={image.alt}
                />
            </div>
          ))}
        </Slide>
      </section>
    </>
  )
}

export default Carousell