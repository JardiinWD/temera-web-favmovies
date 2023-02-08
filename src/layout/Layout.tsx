import React, {Fragment, useState, useEffect, useMemo} from 'react'
import Routers from '../routes/routers'
import Navbar from '../components/Navbar'
import {getOnlyMovieFullYear, roundToDecimal} from '../utils/Format'

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


const Layout = () => {

  /* API key per tutti i movie (a pagina 1) */
  const API_KEY_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1'
  // Array di oggetti dichiarato inizialmente vuoto
  const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
  // Memorizzo la mia key nell'hook useMemo
  const apiMemoKey = useMemo(() => API_KEY_TOP_RATED, [])


  // Richiesta API 
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
            backdrop_path: result.backdrop_path, 
            id: result.id, 
            overview: result.overview, 
            poster_path: result.poster_path, 
            release_date: getOnlyMovieFullYear(result.release_date), 
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
        <Navbar />
        <Routers />
    </Fragment>
  )
}

export default Layout