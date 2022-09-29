import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';
import ListingItem from '../components/ListingItem';

function Offers() {
    const [listings, setListings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingRef = collection(db, 'listings')

                const fullQuery = query(
                    listingRef, 
                    where('offer', '==', 'true'), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)
                )

                const queriedItems = await getDocs(fullQuery)
                
                const allListings = []
                    
                queriedItems.forEach(doc => {
                    return allListings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });

                setListings(allListings)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                toast.error('Oops! Something went wrong!')
            }
        }

        fetchListings()
    }, [])

    return (
        <div className="category">
            <header>
                <p className="page__header">Offers</p>
            </header>

            {isLoading ? 
            <BeatLoader/> 
            : listings && listings.length > 0 ? 
                <>
                <main>
                    <ul className="category__listings">
                        {listings.map(listing => (
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                        ))}
                    </ul>
                </main>
                </> 
                : <p>Unfortunately we don't have any current offers!</p>}
        </div>
    )
}

export default Offers