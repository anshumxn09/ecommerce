import React, {useState} from 'react'
import Dcard from './Dcard';
import './Developer.css';

const Developer = () => {
    const [name] = useState([{name : 'Anshuman Sharma', work :  'Backend'}, {name : 'Hamza Shaikh', work :  'Frontend'}, {name : 'Vansh Chinta', work :  'Design and Model'}]);
  return (
    <>
    <h1 className='titleD'>◇─◇Developing Team◇─◇</h1>
    <div className='contD'>
    {
        name.map((elem) => {
            return <Dcard details={elem}/>
        })
    }
    </div>
    </>
  )
}

export default Developer