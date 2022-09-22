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

  const navigate = useNavigate();

  return (
    <>
    <div className="page__container">
      <header>
        <p className="page__header">Welcome back!</p>
      </header>
    </div>
    </>
  );
}
  
  export default SignIn;
  