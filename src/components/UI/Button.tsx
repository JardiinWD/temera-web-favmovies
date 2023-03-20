import type { FunctionComponent } from 'react'
import '../styles/Button.scss'

type ButtonProps = {
    text: String,
    type: 'load' | 'add' | 'remove'
    onClick: () => void  
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    /* Switch Case per i vari type */
    switch (props.type) {
        case 'load':
            return (
                <button onClick={props.onClick} className='btn-load_more'>
                    {props.text}
                </button>
            )
        case 'add': 
            return (
                <button onClick={props.onClick} className='btn-add_to_pref'>
                    {props.text}
                </button>
            )            
        case 'remove':
            return (
                <button onClick={props.onClick} className='btn-remove_to_pref'>
                    {props.text}
                </button>
            )
    }
}

export default Button