import { useState, useEffect, useMemo } from 'react'
import { Movies } from '../pages/Home'
import { getOnlyMovieFullYear, roundToDecimal, singleMovieFormatDate } from '../utils/Format'

/** Custom Hook per il fetching dei dati dai miei endpoint
 * 
 * @param {string} id ID del film singolo preso da useParams (FilmDetails.tsx) 
 * @returns 
 */
const useFetchApi = (id?: string) => {
    // Variabile di stato per il singolo film
    const [singleMovie, setSingleMovie] = useState<Movies>();
    // Variabile di stato per la movieList (top rated)
    const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
    // Variabile di stato per il loadMore (top rated)
    const [ratedPage, setRatedPage] = useState<number>(1)
    // APIs Key = dove id è l'ID del film singolo preso dal params
    const API_KEY_SINGLE_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`
    // API key per tutti i movie (a pagina 1)
    const API_KEY_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${ratedPage}`
    // path corretto per le immagini del poster e del backdrop
    const imgInitialPath = 'https://image.tmdb.org/t/p/w500'
    // Memorizzo le mie Key
    const apiSingleMovieKey = useMemo(() => API_KEY_SINGLE_MOVIE, [API_KEY_SINGLE_MOVIE])
    const apiMovieListKey = useMemo(() => API_KEY_TOP_RATED, [API_KEY_TOP_RATED])

    // Richieste endpoint API
    useEffect(() => {
        // Fetch per la movieList
        const fetchMovieList = async () => {
            try {
                // Salvo in una variabile il responso dalla mia API key
                const response = await fetch(apiMovieListKey);
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

        // Fetch per il singleMovie
        const fetchSingleMovie = async () => {
            try {
                // Salvo in una variabile il responso dalla mia API key
                const response = await fetch(apiSingleMovieKey);
                // nella variabile data salvo il JSON del response
                const data = await response.json();
                // faccio update della mia funzione di variabile di stato
                setSingleMovie({
                    backdrop_path: imgInitialPath + data.backdrop_path, // Immagine di sfondo
                    id: data.id, // ID
                    overview: data.overview, // Trama
                    poster_path: imgInitialPath + data.poster_path, // Immagine cards
                    release_date: typeof data.release_date === 'string' ? singleMovieFormatDate(data.release_date) : data.release_date, // Data rilascio
                    title: data.title, // Titolo del film
                    vote_average: roundToDecimal(data.vote_average), // Media dei voti
                }
                );
            }
            catch (error) {
                // Verifico l'errore in console
                console.error(error);
            }
        };

        // Invoco le functions per il fetching
        fetchSingleMovie();
        fetchMovieList();
    }, [apiMovieListKey, apiSingleMovieKey]);

    // Function per incrementare i risultati nella paginazione
    const loadMoreResult = () => {
        // Incremento il numero di pagina (che a sua volta cambia il valore all'API KEY)
        setRatedPage(ratedPage + 1)
        // Aggiungo uno scroll che mi riporta in cima alla pagina
        window.scrollTo({
            top: 0, // Dove
            behavior: 'smooth' // E in che modo
        })
    }

    return { singleMovie, moviesList, loadMoreResult }
}

export default useFetchApi
