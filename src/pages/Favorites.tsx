import Helmet from '../components/Helmet'
import MovieList from '../components/MovieList'
import { Movies } from './Home'
import React, {Fragment, useState, useEffect} from 'react'

const Favorites = () => {
  // Dichiaro la variabile di stato favoriteFilm e la sua function
  const [favoriteFilm, updateFavoriteFilm] = useState<Movies[]>([])

  useEffect(() => {
    // Prendo gli items dal localStorage
    const getItems = Object.values(localStorage)
    // salvo il parsing in una variabile (movies per non confondere)
    const movies: Movies[] = getItems.map(item => JSON.parse(item))
    // update della variabile di favoriteFilm
    updateFavoriteFilm(movies)
  }, [])

  return (
    <Fragment>
      <Helmet page="Favorites" />
      <MovieList movieList={favoriteFilm} />
    </Fragment>
  )
}

export default Favorites