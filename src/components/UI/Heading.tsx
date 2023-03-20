import type { FunctionComponent } from 'react'
import '../styles/Heading.scss'
import React from 'react'

type HeadingProps = {
    title: string,
    type: 'single-movie' | 'logo-title' | 'favorites-page'
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
    /* Switch in base ai type */
    switch (props.type) {
        case "single-movie":
            return (
                <h2 className='single-movie'>
                    {props.title}
                </h2>
            )
        case 'logo-title':
            return (
                <h2 className='logo-title'>
                    <span className='logo-thin'>Fav</span>
                    {props.title}
                </h2>
            )
        case 'favorites-page':
            return (
                <h2 className='favorites-title'>
                    {props.title}
                </h2>
        )
    }
}

export default Heading