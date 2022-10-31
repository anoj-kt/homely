import { useState, useEffect } from 'react'

const UseScrollPosition = () => {
    const [shadow, setShadow] = useState(false)

    useEffect(() => {
        const showShadow = () => {
            if (window.scrollY > 0) {
                setShadow(true);
                } else {
                setShadow(false);
                }
        }

        window.addEventListener('scroll', showShadow)

        return () => window.removeEventListener('scroll', showShadow)
    }, [])

    return shadow
}

export default UseScrollPosition