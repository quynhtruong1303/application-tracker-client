import { useState, useEffect } from 'react'

// Returns true when the window matches the given CSS media query string
export default function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    )

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query)

        function handleChange(e) {
            setMatches(e.matches)
        }

        mediaQueryList.addEventListener('change', handleChange)

        // Clean up the listener when the component unmounts
        return () => mediaQueryList.removeEventListener('change', handleChange)
    }, [query])

    return matches
}