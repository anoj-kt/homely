import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';
import ListingItem from '../components/ListingItem';

function Category() {
    const [listings, setListings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingRef = collection(db, 'listings')

                const fullQuery = query(
                    listingRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    limit(5)
                )

                const queriedItems = await getDocs(fullQuery)
                const lastVisible = queriedItems.docs[queriedItems.docs.length - 1]
                setLastFetchedListing(lastVisible)
                
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
    }, [params.categoryName])

    const fetchMoreListings = async () => {
        try {
            const listingRef = collection(db, 'listings')

            const fullQuery = query(
                listingRef, 
                where('type', '==', params.categoryName), 
                orderBy('timestamp', 'desc'), 
                startAfter(lastFetchedListing),
                limit(5)
            )

            const queriedItems = await getDocs(fullQuery)
            const lastVisible = queriedItems.docs[queriedItems.docs.length - 1]
            setLastFetchedListing(lastVisible)
            
            const allListings = []
                
            queriedItems.forEach(doc => {
                return allListings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setListings((prev) => [...prev, ...allListings])
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Oops! Something went wrong!')
        }
    }

    return (
        <div className="category">
            <header>
                <p className="page__header">
                    Properties for 
                    {params.categoryName === 'rent' ? ' rent' : ' sale'}
                </p>
            </header>

            {isLoading ? 
            <BeatLoader color="#00cc66"/> 
            : listings && listings.length > 0 ? 
                <>
                <main>
                    <ul className="category__listings">
                        {listings.map(listing => (
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                        ))}
                    </ul>
                </main>
                {lastFetchedListing && (
                    <p className="loadMore" onClick={fetchMoreListings}>Load More</p>
                )}
                </> 
                : <p>No listings found for {params.categoryName}</p>}
        </div>
    )
}

export default Category