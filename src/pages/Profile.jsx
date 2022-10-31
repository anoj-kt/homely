import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../components/ListingItem';

function Profile() {
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name, email} = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings")
      const filter = query(
        listingsRef, 
        where("userRef", "==", auth.currentUser.uid), 
        orderBy("timestamp", "desc")
        )
      const queriedItems = await getDocs(filter)

      let listings = []

      queriedItems.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setIsLoading(false)
    }

    fetchUserListings()

  }, [auth.currentUser.uid])

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

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you want to delete this listing?')) {
      await deleteDoc(doc(db, "listings", listingId))
      const updatedListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updatedListings)
      toast.success("Successfully deleted listing")
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <div className="profile">
      <header className="profile__header">
        <p className="page__header">My Profile</p>
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
            <label className="form__label">Name</label>
            <input 
              type="text"
              id="name"
              className={changeDetails ? "profile__name--active" : "profile__name"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <label className="form__label">Email</label>
            <input 
              type="email"
              id="email"
              className="profile__email"
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <button type="button" className="logOut" onClick={logOut}>Log out</button>
        <Link to="/create-listing" className="create__listing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>

      {!isLoading && listings?.length > 0 && (
        <>
          <p className="listing-text">Your listings</p>
          <ul className="listing-list">
            {listings.map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing.data} 
                id={listing.id} 
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
  }
  
  export default Profile;
  