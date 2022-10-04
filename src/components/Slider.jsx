import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, getDoc } from 'firebase/firestore';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import BeatLoader from 'react-spinners/BeatLoader'
import { async } from '@firebase/util';

import { db } from '../firebase.config';

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y ])

function Slider() {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const filter = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
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

        fetchListings()
    }, [])

    if(isLoading) {
        return <BeatLoader color="#00cc66"/>
    }
    
    console.log(listings)
    return (
        listings && (
            <div>
                
                <p className="explore__heading">Recommended</p>
                <Swiper slidesPerView={1} pagination={{clickable:true}}>
                    {listings.map(({data, id}) => (
                        <SwiperSlide key={id} onClick={() => {navigate(`/category/${data.type}/${id}`)}}>
                            <div 
                                style={{
                                    background: `url(${data.imageUrls[0]}) center no-repeat`, 
                                    backgroundSize: "cover"}} 
                                className="swiper__slide"
                            >
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        )
    )
}

export default Slider