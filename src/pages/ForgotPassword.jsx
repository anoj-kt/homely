import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Verification email  sent!')
    } catch (error) {
      toast.error('Could not send verification email!')
    }

  }

  return (
    <div className="login__page">
      <header>
        <p className="page__header">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            placeholder="email"
            className="email__input"
            id="email"
            value={email}       
            onChange={onChange}     
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>
            <button className="primaryButton">
              Send Reset Link
            </button>
        </form>
      </main>
    </div>
  );
  }
  
  export default ForgotPassword;
  