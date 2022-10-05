import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//eslint-disable-next-line
import { async } from '@firebase/util';
//eslint-disable-next-line
import { connectStorageEmulator } from 'firebase/storage';
import BeatLoader from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';
import shareIcon from '../assets/svg/shareIcon.svg'

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y ])

function Listing() {
    const [listing, setListing] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const selectedDoc = await getDoc(docRef)

            if(selectedDoc.exists()) {
                setListing(selectedDoc.data())
                setIsLoading(false)
            }

        }

        fetchListing()
    }, [navigate, params.listingId])

    if(isLoading) {
        return <BeatLoader color="#00cc66"/>
    }

    return (
       <main>
        <Swiper slidesPerView={1} pagination={{clickable:true}}>
            {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div 
                        style={{
                            background: `url(${listing.imageUrls[index]}) center no-repeat`, 
                            backgroundSize: "cover"}} 
                        className="swiper__slide">
                        
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        <div className="icon__share" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000);
        }}>
            <img src={shareIcon} alt="share" />
        </div>

        {shareLinkCopied && <p className="link--copied">Link copied!</p>}

        <div className="listing__details">
            <p className="listing__name">{listing.name}</p>
            <p className="listing__location">{listing.location}</p>
            <p className="listing__type">For {listing.type === "rent" ? "rent" : "sale"}</p>

            {listing.offer && (
                <p className="price__discount">{(listing.regularPrice - listing.discountedPrice).toLocaleString("de-DE")}€ discount</p>
            )}

            <ul className="listing__details-list">
                <li>
                    {listing.bedrooms > 1
                        ? `${listing.bedrooms} Bedrooms`
                        : "1 Bedroom"
                    }
                </li>
                <li>
                    {listing.bathrooms > 1
                        ? `${listing.bathrooms} Bathrooms`
                        : "1 Bathroom"
                    }
                </li>
                <li>{listing.parking && 'Parking available'}</li>
                <li>{listing.furnished && 'Furnished property'}</li>
            </ul>

            <p className="listing__location-title">Location</p>

            <div className="leaflet__container">
                    <MapContainer 
                        style={{height: "100%", width: "100%"}} 
                        center={[listing.geoLocation.lat, listing.geoLocation.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </ MapContainer>
            </div>

            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">Contact Owner</Link>
            )}
            
        </div>
       </main>
    )
}

export default Listing