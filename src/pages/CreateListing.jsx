import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BeatLoader from 'react-spinners/BeatLoader'; 
// color="#00cc66"

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offerr: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

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

  return (
    <div>CreateListing</div>
  )
}

export default CreateListing