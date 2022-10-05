import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader'; 
import { v4 as uuidv4 } from 'uuid';

import { db } from '../firebase.config'

function CreateListing() {
    // ===========STATE===========
    //eslint-disable-next-line
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

    // ===========VARIABLES===========
    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, user => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted, auth, formData, navigate])

    // ===========EVENT HANDLERS===========
    const onSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if(discountedPrice >= regularPrice) {
            setIsLoading(false)
            toast.error('Discounted Price needs to be less than regular price')
            return
        }

        if(images.length > 6) {
            setIsLoading(false)
            toast.error('You can only upload upto 6 images')
        }

        // ===========Geo location===========
        let geoLocation = {}
        let location

        if(geolocationEnabled) {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEO_API}`)
            const data = await response.json()

            geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0
            geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0

            location = 
                data.status === 'ZERO RESULTS'
                    ? undefined
                    : data.results[0]?.formatted_address

            
            if(location === undefined || location.includes('undefined')) {
                setIsLoading(false)
                toast.error('Please enter a valid address')
                return
            }
        } else {
            geoLocation.lat = latitude
            geoLocation.lng = longitude
        }

        // ===========Store images===========
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)
                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default: 
                            break
                        }
                    }, 
                    (error) => {
                        reject(error)
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                        });
                    }
                    );
                })
        }

        const imageUrls = await Promise.all(
            [...images].map(img => storeImage(img))
        ).catch((error) => {
            console.log(error)
            setIsLoading(false)
            toast.error('Images could not be uploaded')
            return
        })

        // ===========Send all data to firestore===========
        const formDataCopy = {
            ...formData,
            imageUrls,
            geoLocation,
            timestamp: serverTimestamp()
        }

        formDataCopy.location = address
        delete formDataCopy.images
        delete formDataCopy.address
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)

        setIsLoading(false)
        toast.success('Listing has been uploaded!')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    const onMutate = (e) => {
      let boolean = null;

      if(e.target.value === 'true') {
        boolean = true
      }

      if(e.target.value === 'false') {
        boolean = false
      }

      if(e.target.files) {
        setFormData(prev => ({
            ...prev, 
            images: e.target.files
        }))
      }

      if(!e.target.files) {
        setFormData(prev => ({
            ...prev, 
            [e.target.id]: boolean ?? e.target.value
        }))
      }
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

            {/* ===========Sell / Rent=========== */}
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

                {/* ===========Name=========== */}
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

                {/* ===========Rooms=========== */}
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

                {/* ===========Parking=========== */}
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

                {/* ===========Furnished=========== */}
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

                {/* ===========Address=========== */}
                <label className="form__label">Address</label>
                <textarea
                    className="form__inputAddress"
                    type="text"
                    id="address"
                    value={address}
                    onChange={onMutate}
                    required
                />
            
                {/* ===========Furnished=========== */}

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

                {/* ===========Offer=========== */}
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

                {/* ===========Regular Price=========== */}
                <label className="form__label">Regular Price</label>
                <div className="form__priceDiv">
                    <input 
                        className="form__inputSmall"
                        type="number" 
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
                
                {/* ===========Discounted Price=========== */}
                {offer && (
                    <>
                        <label className="form__label">Discounted Price</label>
                        <input
                            className="form__inputSmall"
                            type="number" 
                            id="discountedPrice"
                            value={discountedPrice}
                            onChange={onMutate}
                            min="50"
                            max="750000000"
                            required
                        />
                    </>
                )}

                {/* ===========Images=========== */}
                <label className="form__label">Images</label> 
                <p className="imagesInfo">The first image will be the cover (max 6).</p>
                <input 
                    className="form__inputFile"
                    type="file" 
                    id="images"
                    onChange={onMutate}
                    max="6"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    required
                />

                {/* ===========Create listing button=========== */}
                <button className="primaryButton createListingButton" type="submit">
                    Create Listing
                </button>
            </form>
        </main>
    </div>
  )
}

export default CreateListing