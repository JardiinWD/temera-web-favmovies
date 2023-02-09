import Routers from '../routes/routers'
import Navbar from '../components/Navbar'
import {getOnlyMovieFullYear, roundToDecimal, imgInitialPath} from '../utils/Format'
import React, {Fragment, useState, useEffect, useMemo} from 'react'
import { useLocation } from 'react-router-dom'

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
  // Variabile di stato per la pagina corrente
  const [isCurrentPage, setIsCurrentPage] = useState<string>('')
  // Memorizzo la mia key nell'hook useMemo
  const apiMemoKey = useMemo(() => API_KEY_TOP_RATED, [])
  // utilizzo la location e la salvo in una variabile
  const pageLocation = useLocation()


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

  // Update della variabile di stato isCurrentPage in base al pathname
  useEffect(() => {
    setIsCurrentPage(pageLocation.pathname === '/favorites' ? 'Favorites' : 'Top Rated')
  }, [pageLocation.pathname])

  return (
    <Fragment>
        <Navbar isCurrentPage={isCurrentPage} />
        <Routers moviesList={moviesList} />
    </Fragment>
  )
}

export default Layout