import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';

function Contact() {
  return (
    <div>Contact</div>
  )
}

export default Contact