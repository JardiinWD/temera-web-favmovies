import { useState, useEffect } from 'react'

// Custom hook che mi permette di gestire i componenti a delle width pre-impostate
const useResponsiveResize = () => {
    // Variabile di stato per gestire la width
    const [responsiveWidth, setResponsiveWidth] = useState<boolean>(false)
    // Variabile di stato per la Background img
    const [responsiveBackgroundImg, setResponsiveBackgroundImg] = useState<boolean>(false)
    // Variabile di stato per la nav responsive
    const [navToggle, setNavToggle] = useState<boolean>(false)

    // useEffect che mi aiuta a sistemare il comportamento del resize sui componenti
    useEffect(() => {
        // Handler per aggiornare variabile di stato navToggle al resize
        const handleViewportResize = () => {
            // Condizioni della nav
            if (window.innerWidth >= 768 && navToggle) setNavToggle(false)
            // Condizioni della movieList
            if (window.innerWidth >= 768 && responsiveWidth) setResponsiveWidth(true)
            // Condizione per immagine di Background
            if (window.innerWidth < 991.98) setResponsiveBackgroundImg(true)
        }
        // Aggiungo evento listener alla window al resize
        window.addEventListener("resize", handleViewportResize)

        // Restituisco una function che rimuove addEventListener
        return () => {
            window.removeEventListener("resize", handleViewportResize)
        }
    }, [navToggle, responsiveBackgroundImg, responsiveWidth])

    /* Eseguo return per esportarli nei componenti */
    return {
        responsiveWidth,
        setResponsiveWidth,
        responsiveBackgroundImg,
        setResponsiveBackgroundImg,
        navToggle,
        setNavToggle
    }
}

export default useResponsiveResize