import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BeatLoader from 'react-spinners/BeatLoader'; 

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude} = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, user => {
                if(user) {
                    setFormData({...formData, useRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    const onSubmit = (e) => {
        e.preventdefault()
    }

    const onMutate = (e) => {
      
    }

    if(isLoading) {
        return <BeatLoader color="#00cc66"/>
    }

  return (
    <div className="profile">
        <header>
            <p className="page__header">Create a listing</p>
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <label className="form__label">Sell / Rent</label>
                <div className="form__buttons">
                    <button 
                        type="button" 
                        className={type === "sale" ? "form__buttonActive" : "form__button"}
                        id="type"
                        value="sale"
                        onClick={onMutate}
                    >
                        Sell
                    </button>
                    <button 
                        type="button" 
                        className={type === "rent" ? "form__buttonActive" : "form__button"}
                        id="type"
                        value="rent"
                        onClick={onMutate}
                    >
                        Rent
                    </button>
                </div>
                <label className="form__label">Name</label>
                <input 
                    className="form__inputName"
                    type="text" 
                    id="name"
                    value={name}
                    onChange={onMutate}
                    maxLength="32"
                    minLength="10"
                    required
                />
                <div className="form__rooms flex">
                    <div>
                        <label className="form__label">Bedrooms</label>
                        <input 
                            className="form__inputSmall"
                            type="number" 
                            id="bedrooms"
                            value={bedrooms}
                            onChange={onMutate}
                            max="50"
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label className="form__label">Bathrooms</label>
                        <input 
                            className="form__inputSmall"
                            type="number" 
                            id="bathrooms"
                            value={bathrooms}
                            onChange={onMutate}
                            max="50"
                            min="1"
                            required
                        />
                    </div>
                </div>
                <label className="form__label">Parking available</label>
                <div className="form__buttons">
                    <button 
                        type="button" 
                        className={parking ? "form__buttonActive" : "form__button"}
                        id="parking"
                        value={true}
                        onClick={onMutate}

                    >
                        Yes
                    </button>
                    <button 
                        type="button" 
                        className={!parking && parking !== null? "form__buttonActive" : "form__button"}
                        id="parking"
                        value={false}
                        onClick={onMutate}
                    >
                        No
                    </button>
                </div>
                <label className="form__label">Furnished</label>
                <div className="form__buttons">
                    <button 
                        type="button" 
                        className={furnished ? "form__buttonActive" : "form__button"}
                        id="furnished"
                        value={true}
                        onClick={onMutate}

                    >
                        Yes
                    </button>
                    <button 
                        type="button" 
                        className={!furnished && furnished !== null? "form__buttonActive" : "form__button"}
                        id="furnished"
                        value={false}
                        onClick={onMutate}
                    >
                        No
                    </button>
                </div>
                <label className="form__label">Address</label>
                <textarea
                    className="form__inputAddress"
                    type="text"
                    id="address"
                    value={address}
                    onChange={onMutate}
                    required
                />
            </form>
            
            {!geolocationEnabled && (
                <div className="form__geoLocation flex">
                    <div>
                        <label className="form__label">Latitude</label>
                        <input 
                            className="form__inputSmall"
                            type="number"
                            id="latitude"
                            value={latitude}
                            onChange={onMutate}
                            required
                        />
                    </div>
                    <div>
                        <label className="form__label">Longitude</label>
                        <input 
                            className="form__inputSmall"
                            type="number"
                            id="longitude"
                            value={longitude}
                            onChange={onMutate}
                            required
                        />
                    </div>
                </div>
            )}

            <label className="form__label">Offer</label>
            <div className="form__buttons">
                <button
                    type="button" 
                    className={offer ? "form__buttonActive" : "form__button"}
                    id="offer"
                    value={true}
                    onClick={onMutate}
                >
                    Yes
                </button>
                <button
                    type="button" 
                    className={!offer && offer !== null ? "form__buttonActive" : "form__button"}
                    id="offer"
                    value={false}
                    onClick={onMutate}
                >
                    No
                </button>
            </div>
            <label className="form__label">Regular Price</label>
            <div className="form__priceDiv">
                <input 
                    className="form__inputSmall"
                    type="text" 
                    id="regularPrice"
                    value={regularPrice}
                    onChange={onMutate}
                    min="50"
                    max="750000000"
                    required
                />
                {type === "rent" && (
                    <p className="form__priceText">€ per month</p>
                )}
            </div>

        </main>
    </div>
  )
}

export default CreateListing