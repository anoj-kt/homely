import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

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

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
      toast.success('Name has been updated!')
      }
    } catch (error) {
      toast.error('Update failed!')
    }
  };

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.id]:e.target.value
    }))
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
        <div className="profile__card">
          <form>
            <input 
              type="text"
              id="name"
              className={changeDetails ? "profile__nameActive" : "profile__name"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input 
              type="email"
              id="email"
              className={changeDetails ? "profile__emailActive" : "profile__email"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to="create-listing" className="create__listing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  );
  }
  
  export default Profile;
  