import type { FunctionComponent } from 'react'
import './styles/Heading.scss'
import React from 'react'

type PropsList = {
    title: string,
    type: 'single-movie' | 'logo-title'
}

const Heading: FunctionComponent<PropsList> = (props) => {
    
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

    /* Altrimenti eseguo un return vuoto */
    return <></>

}

export default Heading