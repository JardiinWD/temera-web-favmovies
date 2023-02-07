import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import FilmDetails from '../pages/FilmDetails';
import Favorites from '../pages/Favorites';



const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/home/:id' element={<FilmDetails />} />
        </Routes>
    )
}

export default Routers