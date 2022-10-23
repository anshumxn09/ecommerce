import React from 'react'
import './Developer.css'

const Dcard = (props) => {
  return (
    <div className='cardD'>
        <div className="pupleHaze">
            <div className="imageD">
                <img src={props.details.url} alt="" />
            </div>
        </div>
        <div className="aboutD">
            <h2>{props.details.name}</h2>
            <h3>{props.details.work}</h3>
            <h3 className='smallD'>Links To Connect</h3>
            <a href="">LinkedIn</a>
            <a href="">GitHub</a>
        </div>
    </div>
  )
}

export default Dcard