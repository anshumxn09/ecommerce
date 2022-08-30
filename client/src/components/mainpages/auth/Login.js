import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import axios from 'axios';


const Login = () => {
  const [user, setUser] = useState({
    email:'', 
    password:'',
  })

  const onChangeEvent = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name] : value,
    })
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post('/users/login', {
        ...user
      });

      localStorage.setItem('firstLogin', true);
      window.location.href = "/";

    } catch (error) {
      toast(error.response.data.message, {
        className:'toastify'
      });
    }
  }
  
  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
      <h2>◇─◇LOGIN◇─◇</h2>
        <input type="email" name="email" id="email" required placeholder='E-MAIL' value={user.email} onChange={onChangeEvent}/>
        <input type="password" name="password" id="password" required placeholder='PASSWORD' value={user.password} onChange={onChangeEvent} autoComplete="on"/>

        <div className="row">
          <button type='submit'>LOGIN</button>
          <Link to={'/register'}>Register</Link>
        </div>
        <ToastContainer/>
      </form>
    </div>
  )
}

export default Login;