import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, getDoc } from 'firebase/firestore';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { BeatLoader } from 'react-spinners/BeatLoader'
import { async } from '@firebase/util';

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y ])

function Slider() {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const filter = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            const queriedItems = await getDocs()
    
            let listings = []
    
            queriedItems.map((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
    
            setListings(listings)
            setIsLoading(false)
        }

        fetchListings()
        
    }, [])
    
    return (
        <div>Slider</div>
    )
}

export default Slider