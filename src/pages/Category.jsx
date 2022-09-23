import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDoc, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';

function Category() {
    const [listings, setListings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                
            } catch (error) {
                
            }
        }
    })

    return (
        <div>Category</div>
    )
}

export default Category