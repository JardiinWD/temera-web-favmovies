import type { FunctionComponent } from 'react'
import { Movies } from '../layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import FilmDetails from '../pages/FilmDetails';
import Favorites from '../pages/Favorites';

/* Qua passa tutta la tipizzazione (function e dati) delle mie pages */

type RouterProps = {
    moviesList: Movies[]
}

const Routers: FunctionComponent<RouterProps> = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home moviesList={props.moviesList} />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/home/:id' element={<FilmDetails />} />
        </Routes>
    )
}

export default Routers