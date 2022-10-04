import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';

function Contact() {
    const [message, setMessage] = useState('');
    const [owner, setOwner] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useParams();

    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, 'users', params.ownerId)
            const selectedDoc = await getDoc(docRef)

            if(selectedDoc.exists()) {
                setOwner(selectedDoc.data())
            } else {
                toast.error('Could not get owner details!')
            }
        }

        getOwner()

    }, [params.ownerId])

  return (
    <div>Contact</div>
  )
}

export default Contact