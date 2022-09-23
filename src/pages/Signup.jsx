import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.id]:e.target.value
    }))
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(process.env)
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name
      });
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <>
    <div className="page__container">
      <header>
        <p className="page__header">Welcome back!</p>
      </header>

      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          className="name__input"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />
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
          Forgot Password
        </Link>
        <div className="signUp__div">
          <p className="signUp__text">Sign Up</p>
          <button className="signUp__button">
            <ArrowRightIcon 
              fill="#ffffff"
              width="34px"
              height="34px"
            />
          </button>
        </div>
      </form>

      <OAuth/>

      <Link to="/sign-in" className="signUpLink">
        Sign In instead
      </Link>
    </div>
    </>
  );
}
  
  export default SignUp;
  