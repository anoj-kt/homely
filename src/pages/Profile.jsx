import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import db from '../firebase.config'

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState({});
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
      <main>
        <div className="profile__detailsDiv">
          <p className="profile__text">Personal Details</p>
          <p className="changeDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(prev => !prev)
          }}>
            {changeDetails ? 'save' : 'edit'}
          </p>
        </div>
      </main>
    </div>
  );
  }
  
  export default Profile;
  