import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth () {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = () => {

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