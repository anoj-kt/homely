import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, SetFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = () => {};

  return (
    <>
    <div className="page__container">
      <header>
        <p className="page__header">Welcome back!</p>
      </header>

      <form>
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
        </div>
      </form>
    </div>
    </>
  );
}
  
  export default SignIn;
  