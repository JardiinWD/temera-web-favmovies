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
  // Variabili di stato 
  const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
  const [ratedPage, setRatedPage] = useState<number>(1)
  // APIs
  const API_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=`
  const imgInitialPath = 'https://image.tmdb.org/t/p/w500'

  const fetchMovieList = async () => {
    try {
        // Salvo il response
        const response = await fetch(API_TOP_RATED + ratedPage);
        const data = await response.json();
        // faccio update moviesList + concat
        setMoviesList(moviesList.concat(
            data.results.map((result: Movies) => ({
                backdrop_path: imgInitialPath + result.backdrop_path,
                id: result.id,
                overview: result.overview,
                poster_path: imgInitialPath + result.poster_path,
                release_date: typeof result.release_date === 'string' ? getOnlyMovieFullYear(result.release_date) : result.release_date,
                title: result.title,
                vote_average: roundToDecimal(result.vote_average),
            })))
        );
    }
    catch (error) {
        // Verifico l'errore in console
        console.error(error);
    }
  };

  useEffect(() => {
    // Invoke del fetch
    fetchMovieList();
    // eslint-disable-next-line
  }, [ratedPage]);
  
  // Function per il requisito di paginazione
  // N.B : Presente una nota nella documentazione riguardo a questo requisito
  const loadMoreResult = () => {
    // Incremento il numero di pagina (che a sua volta cambia il valore all'API)
    setRatedPage(ratedPage + 1)
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