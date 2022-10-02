import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import axios from 'axios';


const Register = () => {
  const [user, setUser] = useState({
    name:'',
    email:'', 
    password:'',
    cpassword:''
  })

  const onChangeEvent = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name] : value,
    })
  }

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if(user.password !== user.cpassword){
        toast("Password And Confirm Password Doesn't Matched", {
          className:'toastify'
        });
      }else{
      await axios.post('/users/register', {
        ...user
      });

      localStorage.setItem('firstLogin', true);
      window.location.href = "/";
    }
    } catch (error) {
      toast(error.response.data.message, {
        className:'toastify'
      });
    }
  }
  return (
    <div className='login-page'>
      <form onSubmit={registerSubmit}>
        <h2>◇─◇REGISTER◇─◇</h2>  
        <input type="text" name='name' id='name' required placeholder='NAME' value={user.name} onChange={onChangeEvent}/>
        <input type="email" name="email" id="email" required placeholder='E-MAIL' value={user.email} onChange={onChangeEvent}/>
        <input type="password" name="password" id="password" required placeholder='PASSWORD' value={user.password} onChange={onChangeEvent} autoComplete="on"/>
        <input type="password" name="cpassword" id="cpassword" required placeholder='CONFIRM PASSWORD' value={user.cpassword} onChange={onChangeEvent} autoComplete="on"/>
        <div className="row">
          <button type='submit'>REGISTER</button>
          <Link to={'/login'}>Login</Link>
        </div>
        <ToastContainer/>
      </form>
    </div>
  )
}

export default Register;