import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.id]:e.target.value
    }))
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Email and/or Password is incorrect')
    }
  }

  return (
    <>
    <div className="login__page">
      <header>
        <p className="page__header">Welcome back!</p>
      </header>

      <form onSubmit={onSubmit}>
        <input 
          type="email" 
          className="email__input"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <div className="password__inputDiv">
          <input 
            type={showPassword ? "text" : "password"}
            className="password__input"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img 
            src={visibilityIcon} 
            alt="Show password" 
            className="showPassword"
            onClick={() => setShowPassword(prev => !prev)}
          />
        </div>
        <Link 
          to="/forgot-password"
          className="forgotPasswordLink"
        >
          Forgot Password ?
        </Link>
          <button className="primaryButton">
            Login
          </button>
      </form>

      <OAuth/>

      <Link to="/sign-up" className="signUpLink">
        Don't have an account? Sign up here!
      </Link>
    </div>
    </>
  );
}
  
  export default SignIn;
  
