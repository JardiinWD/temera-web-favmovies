import type { FunctionComponent } from 'react'
import '../styles/Button.scss'

type ButtonProps = {
    text: String,
    type: 'load' | 'add' | 'remove'
    onClick: () => void  
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    
    /* Se passo il button type 'load' */
    if (props.type === 'load') {
        return (
            <button onClick={props.onClick} className='btn-load_more'>
                {props.text}
            </button>
        )
    }

    /* Se passo il button type 'add' */
    if (props.type === 'add') {
        return (
            <button onClick={props.onClick} className='btn-add_to_pref'>
                {props.text}
            </button>
        )
    }

    /* Se passo il button type 'remove' */
    if (props.type === 'remove') {
        return (
            <button onClick={props.onClick} className='btn-remove_to_pref'>
                {props.text}
            </button>
        )
    }

    /* Altrimenti eseguo un return di un fragment vuoto */
    return <></>
}

export default Button