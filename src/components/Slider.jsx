import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { BeatLoader } from 'react-spinners/BeatLoader'

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y ])

function Slider() {
    return (
        <div>Slider</div>
    )
}

export default Slider