import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const logOut = () => {

  }
  
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
  