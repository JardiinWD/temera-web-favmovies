import { useState, useEffect, useMemo } from 'react'
import { Movies } from '../pages/Home'
import { getOnlyMovieFullYear, roundToDecimal, singleMovieFormatDate } from '../utils/Format'

const useFetchApi = (id?: string) => {
    /* APIs Key = dove 278 è l'ID del film singolo  */
    const API_KEY_SINGLE_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`
    /* API key per tutti i movie (a pagina 1) */
    const API_KEY_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1'
    // path corretto per le immagini del poster e del backdrop
    const imgInitialPath = 'https://image.tmdb.org/t/p/w500'

    // Variabile di stato per il singolo film
    const [singleMovie, setSingleMovie] = useState<Movies>();
    // Variabile di stato per la movieList (top rated)
    const [moviesList, setMoviesList] = useState<Array<Movies>>([]);
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
                    release_date: singleMovieFormatDate(data.release_date), // Data rilascio
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

        // Invoco le functions
        fetchSingleMovie();
        fetchMovieList();

    }, [apiMovieListKey, apiSingleMovieKey]);

    return { singleMovie, moviesList }

}

export default useFetchApi
