import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
function Login() {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      setErr(true)
    }
  
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <div className="logo">Nano chat</div>
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Your e-mail'/>
          <input type="password" placeholder='Your password'/>
          <button>Sign in</button>
          {err && <span>Something went wrong</span> }
        </form>
        <p>You don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login