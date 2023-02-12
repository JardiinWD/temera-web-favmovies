import type { FunctionComponent } from 'react'
import '../styles/Heading.scss'
import React from 'react'

type HeadingProps = {
    title: string,
    type: 'single-movie' | 'logo-title' | 'favorites-page'
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
    
    /* Se passo il type 'single-movie' */
    if (props.type === 'single-movie') {
        return (
            <h2 className='single-movie'>
                {props.title}
            </h2>
        )
    }

    /* Se passo il type 'logo-title' */
    if (props.type === 'logo-title') {
        return (
            <h2 className='logo-title'>
                <span className='logo-thin'>Fav</span>
                {props.title}
            </h2>
        )
    }

    /* Se passo il type 'logo-title' */
    if (props.type === 'favorites-page') {
        return (
            <h2 className='favorites-title'>
                {props.title}
            </h2>
        )
    }    

    /* Altrimenti eseguo un return di un fragment vuoto */
    return <></>

}

export default Heading