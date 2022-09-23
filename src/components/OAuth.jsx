import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth () {
    return (
        <div>
            OAUTH
        </div>
    )
}

export default OAuth