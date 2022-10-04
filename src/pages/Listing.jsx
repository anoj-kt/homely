import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import BeatLoader from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';
import shareIcon from '../assets/svg/shareIcon.svg'
import { async } from '@firebase/util';

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
        </div>
       </main>
    )
}

export default Listing