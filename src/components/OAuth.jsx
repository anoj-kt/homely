import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function OAuth () {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const userRef = doc(db, 'users', user.uid)
            const selectedDoc = await getDoc(userRef)

            if(!selectedDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestampe: serverTimestamp()
                })
            }

            navigate('/')
        } catch (error) {
            toast.error('Google authorization failed!')
        }
    }

    return (
        <div className="socialLogin">
            <p>Sign {location.pathname === "/sign-up"? "up" : "in"} with</p>
            <button className="socialIcon__div" onClick={onGoogleClick}>
                <img src={googleIcon} alt="google" className="socialIcon__img" />
            </button>
        </div>
    )
}

export default OAuth