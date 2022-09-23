import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setLoggedIn(true)
                }
                setIsLoading(false)
            })
        }
        
        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    return { loggedIn, isLoading }
}

export default useAuthStatus;