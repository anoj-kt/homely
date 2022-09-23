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
                const listingRef = collection(db, 'listings')

                const fullQuery = query(
                    listingRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)
                )

                const queriedItems = await getDoc(fullQuery)
                
                const listings = []

                queriedItems.forEach(doc => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data
                    })
                });

                setListings(listings)
                setIsLoading(false)
            } catch (error) {
                toast.error('Oops! Something went wrong!')
            }
        }
    })

    return (
        <div className="category">
            <header>
                <p className="page__header">
                    Properties for 
                    {params.categoryName === 'rent' ? ' rent' : ' sale'}
                </p>
            </header>

            {isLoading ? 
            <BeatLoader/> 
            : listings && listings.length > 0 ? 
                <></> 
                : <p>No listings found for {params.categoryName}</p>}
        </div>
    )
}

export default Category