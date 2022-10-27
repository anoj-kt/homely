import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import BeatLoader from 'react-spinners/BeatLoader'
//eslint-disable-next-line
import { async } from '@firebase/util';

import { db } from '../firebase.config';
import locationIcon from '../assets/svg/location-icon.svg'

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
        return <BeatLoader style={{display: "flex", justifyContent: "center"}} color="hsl(42, 94%, 54%)"/>
    }

    if(listings.length === 0) {
        return <></>
    }
    
    return (
        listings && (
            <div>
                <Swiper 
                    navigation={true} 
                    modules={[Navigation, Autoplay, Pagination]} 
                    slidesPerView={1} 
                    pagination={{clickable:true}}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                    loop={true}
                >
                    {listings.map(({data, id}) => (
                        <SwiperSlide key={id} onClick={() => {navigate(`/category/${data.type}/${id}`)}}>
                            <div className="swiper__slide">
                                <div className="swiper__slide-img-container">
                                    <p className="swiper__slide-name">{data.name}</p>
                                    <p className="swiper__slide-type">{data.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                                    <img 
                                        className="swiper__slide-img" 
                                        src={data.imageUrls[0]} 
                                        alt="Property image" 
                                    />
                                </div>
                                <div className="swiper__slide-loc-container">
                                    <p className="swiper__slide-location">{data.location}</p>
                                    <p className="swiper__slide-price">
                                        {data.offer 
                                            ? Number(data.discountedPrice).toLocaleString("de-DE")
                                            : Number(data.regularPrice).toLocaleString("de-DE")
                                        }
                                        {' '}€
                                        {data.type === 'rent' && '/mo'}
                                    </p>
                                </div>
                                
                                
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        )
    )
}

export default Slider