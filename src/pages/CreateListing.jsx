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
            </form>
        </main>
    </div>
  )
}

export default CreateListing