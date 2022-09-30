import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { BeatLoader } from 'react-spinners/BeatLoader';

import { db } from '../firebase.config';
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
  return (
    <div>Listing</div>
  )
}

export default Listing