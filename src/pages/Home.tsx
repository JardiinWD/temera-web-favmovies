import type { FunctionComponent } from 'react'
import MovieList from '../components/MovieList'
import Helmet from '../components/Helmet'
import Button from '../components/UI/Button'
import './styles/Home.scss'
import React, {Fragment} from 'react'
import useFetchApi from '../hooks/useFetchApi'

// Di seguito il type di un singolo oggetto Fetchato in fetchMovies
// Allo stato attuale ho bisogno di queste caratteristiche
export type Movies = {
  backdrop_path: string; // Immagine di sfondo
  id: number; // ID del film
  overview: string; // Trama del film
  poster_path: string; // Immagine cards
  release_date: string | number; // Data rilascio
  title: string; // Titolo del film
  vote_average: number; // Media dei voti
}

const Home: FunctionComponent = () => {
  // Destructuring del mio useFetchApi per la moviesList con tutti i film
  const {moviesList, loadMoreResult} = useFetchApi()
  
  return (
    <Fragment >
      <Helmet page="Homepage" />
      <MovieList movieList={moviesList} />
      {/* LoadMore ancora da implementare */}
      <div className='btn-load_wrapper'>
        <Button onClick={loadMoreResult} type='load' text='Load More' />
      </div>
    </Fragment>
  )
}

export default Home