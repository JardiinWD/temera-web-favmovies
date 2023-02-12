import type { FunctionComponent } from 'react'
import MovieList from '../components/MovieList'
import Helmet from '../components/Helmet'
import Button from '../components/UI/Button'
import './styles/Home.scss'
import React, {Fragment, useState, useEffect} from 'react'
import { getOnlyMovieFullYear, roundToDecimal } from '../utils/Format'


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
  // Variabile di stato per la movieList (top rated)
  const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
  // Variabile di stato per il loadMore (top rated)
  const [ratedPage, setRatedPage] = useState<number>(1)
  // API KEY
  // const ApiKey = process.env.MOVIE_DB_API_KEY
  // API URL
  const API_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${ratedPage}`
  // path corretto per le immagini del poster e del backdrop
  const imgInitialPath = 'https://image.tmdb.org/t/p/w500'


  // Richieste endpoint API
  useEffect(() => {
    // Fetch per la movieList
    const fetchMovieList = async () => {
        try {
            // Salvo in una variabile il responso dalla mia API key
            const response = await fetch(API_TOP_RATED);
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
        }
        catch (error) {
            // Verifico l'errore in console
            console.error(error);
        }
    };
    fetchMovieList();
}, [API_TOP_RATED]);
  
  // Function per il requisito di paginazione
  // N.B : Presente una nota nella documentazione riguardo a questo requisito
  const loadMoreResult = () => {
    // Incremento il numero di pagina (che a sua volta cambia il valore all'API)
    setRatedPage(ratedPage + 1)
    // Aggiungo uno scroll che mi riporta in cima alla pagina
    window.scrollTo({
        top: 0, // Dove
        behavior: 'smooth' // E in maniera fluida
    })
}

  return (
    <Fragment >
      <Helmet page="Homepage" />
      <MovieList movieList={moviesList} />
      <div className='btn-load_wrapper'>
        <Button onClick={loadMoreResult} type='load' text='Load More' />
      </div>
    </Fragment>
  )
}

export default Home