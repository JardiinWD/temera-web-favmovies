import { FunctionComponent } from 'react'
import MovieList from '../components/MovieList'
import Helmet from '../components/Helmet'
import Button from '../components/UI/Button'
import './styles/Home.scss'
import {getOnlyMovieFullYear, roundToDecimal, imgInitialPath, API_KEY_TOP_RATED} from '../utils/Format'
import React, {Fragment, useState, useMemo, useEffect} from 'react'


// Di seguito il type di un singolo oggetto Fetchato in fetchMovies
// Allo stato attuale ho bisogno di queste caratteristiche
export type Movies = {
  backdrop_path: string; // Immagine di sfondo
  id: number; // ID del film
  overview: string; // Trama del film
  poster_path: string; // Immagine cards
  release_date: string; // Data rilascio
  title: string; // Titolo del film
  vote_average: number; // Media dei voti
}


const Home: FunctionComponent = () => {
  // Array di oggetti dichiarato inizialmente vuoto
  const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
   // Memorizzo la mia key nell'hook useMemo
  const apiMemoKey = useMemo(() => API_KEY_TOP_RATED, [])

    // Richiesta all'API di tutti i film 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Salvo in una variabile il responso dalla mia API key
        const response = await fetch(apiMemoKey);
        // nella variabile data salvo il JSON del response
        const data = await response.json();
        // faccio update della mia funzione di variabile di stato
        setMoviesList(
          data.results.map((result: Movies) => ({
            backdrop_path: imgInitialPath + result.backdrop_path, 
            id: result.id, 
            overview: result.overview, 
            poster_path: imgInitialPath + result.poster_path, 
            release_date: typeof result.release_date === 'string' ? getOnlyMovieFullYear(result.release_date) : result.release_date, 
            title: result.title, 
            vote_average: roundToDecimal(result.vote_average), 
          }))
        );
      } catch (error) {
        // Verifico l'errore in console
        console.error(error);
      }
    };
    // Invoco la function 
    fetchMovies();
  }, [apiMemoKey]);


  return (
    <Fragment>
      <Helmet page="Homepage" />
      <MovieList movieList={moviesList} />
      {/* LoadMore ancora da implementare */}
      <div className='btn-load_wrapper'>
        <Button onClick={() => {}} type='load' text='Load More' />
      </div>
    </Fragment>
  )
}

export default Home