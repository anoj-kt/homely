import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import BeatLoader from 'react-spinners/BeatLoader'
//eslint-disable-next-line
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

    if(listings.length === 0) {
        return <></>
    }
    
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
                                <p className="swiper__slide-text">{data.name}</p>
                                <p className="swiper__slide-price">
                                    {data.offer 
                                        ? Number(data.discountedPrice).toLocaleString("de-DE")
                                        : Number(data.regularPrice).toLocaleString("de-DE")
                                    }
                                    {' '}€
                                    {/* {data.discountedPrice.toLocaleString("de-DE") ?? data.regularPrice.toLocaleString("de-DE")}€ */}
                                    {' '}
                                    {data.type === 'rent' && 'per month'}
                                </p>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        )
    )
}

export default Slider