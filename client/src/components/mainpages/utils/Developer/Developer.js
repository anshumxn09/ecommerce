import React, {useState} from 'react'
import Dcard from './Dcard';
import './Developer.css';

const Developer = () => {
    const [name] = useState([{name : 'Anshuman Sharma', work :  'Backend', url : "https://res.cloudinary.com/anshumxn09/image/upload/v1664981087/test/radiuspic_vbdveu.jpg"}, {name : 'Hamza Shaikh', work :  'Frontend', url : "https://res.cloudinary.com/anshumxn09/image/upload/v1665719916/test/hamza_vpxysa.jpg"}, {name : 'Vansh Chinta', work :  'Design and Model', url : "https://res.cloudinary.com/anshumxn09/image/upload/v1665719926/test/vansh_pro_kawn0j.jpg"}]);
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