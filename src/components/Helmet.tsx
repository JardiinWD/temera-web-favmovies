import type { FunctionComponent } from 'react'

type HelmetProps = {
    page: string
}

const Helmet: FunctionComponent<HelmetProps> = (props) => {

    const {page} = props
    document.title = 'FavMovies - ' + page
    
    // Eseguo un return di un fragment vuoto
    return <></>
}

export default Helmet