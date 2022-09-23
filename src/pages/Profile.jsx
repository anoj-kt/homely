import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name, email} = formData;

  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut()
    navigate('/')
  };
  
  return (
    <div className="profile">
      <header className="profile__header">
        <p className="page__header">My Profile</p>
        <button type="button" className="logOut" onClick={logOut}>Log out</button>
      </header>
    </div>
  );
  }
  
  export default Profile;
  