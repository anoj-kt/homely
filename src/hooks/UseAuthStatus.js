import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoggedIn(true)
            }
            setIsLoading(false)
        })
    })

    return { loggedIn, isLoading }
}

export default useAuthStatus;