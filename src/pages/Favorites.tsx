import Helmet from '../components/Helmet'
import MovieList from '../components/MovieList'
import '../components/styles/Button.scss'
import { Movies } from './Home'
import React, {Fragment, useState, useEffect} from 'react'
import Heading from '../components/UI/Heading'

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
      {
        favoriteFilm.length !== 0 ? (
          <MovieList movieList={favoriteFilm} />
        ) : (
          <Heading title='Non ci sono film tra i favoriti' type='favorites-page' />
        )
      }
    </Fragment>
  )
}

export default Favorites