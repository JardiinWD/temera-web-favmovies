/* React */
import React, {Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import type { FunctionComponent } from 'react'
/* Icons */
import {AiFillStar, AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {MdMovie} from 'react-icons/md'
/* Reactstrap */
import {Container, Row, Col} from 'reactstrap'
/* Components */
import Button from '../components/UI/Button'
import Heading from '../components/UI/Heading'
import Helmet from '../components/Helmet'
import { Movies } from './Home'
/* Style */
import './styles/FilmDetails.scss'
import { roundToDecimal, singleMovieFormatDate } from '../utils/Format'

const FilmDetails: FunctionComponent = () => {
    // Prendo l'ID direttamente dalla query 
    const { id } = useParams();
    // Variabile di stato per il singolo film
    const [singleMovie, setSingleMovie] = useState<Movies>();
    // APIs Key = dove id è l'ID del film singolo preso dal params
    const API_SINGLE_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`
    // path corretto per le immagini del poster e del backdrop
    const imgInitialPath = 'https://image.tmdb.org/t/p/w500'
    // Variabile di stato per verificare se il film è tra i preferiti
    const [movieFromLocal, setMovieFromLocal] = useState<boolean>(false)

    //#region Fetching API 
    useEffect(() => {
    // Fetch per il singleMovie
    const fetchSingleMovie = async () => {
        try {
            // Salvo in una variabile il responso dalla mia API key
            const response = await fetch(API_SINGLE_MOVIE);
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
    }, [API_SINGLE_MOVIE]);

    //#endregion

    //#region requisito localStorage 

    // Verifica nel localStorage se presente il film o meno
    useEffect(() => {
      // Salvo in una variabile l'item preso dal local storage
      const movieFromLocalStorage = localStorage.getItem(`${singleMovie?.id}`)
      // Se esiste al suo interno allora movieFromLocal diventa true
      if (movieFromLocalStorage) setMovieFromLocal(true)
    }, [singleMovie?.id])

    // Handler per aggiungere ai favorites
    const addToFavHandler = () => {
      // l'utente aggiunge al localStorage il film
      localStorage.setItem(`${singleMovie?.id}`, JSON.stringify(singleMovie))
      // cambio stato in true movieFromLocal
      setMovieFromLocal(true) 
    }

    // Hanlder per rimuovere dai favorites
    const removeToFavHandler = () => {
      // l'utente rimuove dal localStorage il film
      localStorage.removeItem(`${singleMovie?.id}`)
      // cambio stato in false movieFromLocal
      setMovieFromLocal(false)
    }
    //#endregion

    // Array per content_info
    const contentInfo = [
      {
        icon: <AiFillStar />,
        text: singleMovie?.vote_average
      },
      {
        icon: <MdMovie />,
        text: singleMovie?.release_date
      }
    ]

  return (
    <Fragment>
      <Helmet page={`${singleMovie?.title}`} />
      {
        singleMovie ? (
          <Container className='container-details'>
            <Row className='row-details'>
              {/* Immagine del film */}
              <Col lg='3' className='details-picture-col'>
                <img 
                  className='details-img' 
                  srcSet={`${singleMovie.poster_path} 992w, ${singleMovie.backdrop_path} 991w`}
                  alt={singleMovie.title} 
                  src={window.innerWidth > 992 ? singleMovie.poster_path : singleMovie.backdrop_path}
                />
              </Col>
              {/* details-content-col */}
              <Col lg='8' className='details-content-col'>
                {/* Titolo */}
                <Heading type='single-movie' title={singleMovie.title} />
                {/* Rating e data d'uscita */}
                <div className='details-content_info'>
                  {
                    contentInfo.map(({icon, text}) => {
                      return (
                        <span key={text}>
                          {icon}
                          {text}
                        </span>
                      )
                    })
                  }
                </div>
                {/* Trama */}
                <p className='details-content_trama'>
                  {singleMovie.overview}
                </p>
                {
                  movieFromLocal ? 
                  (
                    <Button onClick={removeToFavHandler} text="Remove from Favorites" type='remove' />  
                  ) : (
                    <Button onClick={addToFavHandler} text="Add To Favorite" type='add' />
                  )
                }
              </Col> 
              {/* Immagine di background */}
              <Col className='details-picture-col-resp' xs='12' sm='12'>
                <img src={singleMovie.backdrop_path} alt={singleMovie.title} />
                <div className='details-content-col-resp'>
                  {/* Titolo */}
                  <Heading type='single-movie' title={singleMovie.title} />
                  {/* Preferiti */}
                  {
                    movieFromLocal ? (
                      <button onClick={removeToFavHandler} className='like-btn-resp like-btn-resp-fill'>
                        <AiFillHeart />
                      </button>
                    ) : (
                      <button onClick={addToFavHandler} className='like-btn-resp'>
                        <AiOutlineHeart />
                      </button>
                    )
                  }
                </div>
              </Col>
              {/* Trama */}
              <Col className='details-content_trama-resp' xs='12' sm='12'>
                <p>
                  {singleMovie.overview}
                </p>
              </Col>
            </Row>
          </Container>
        ) : null
      }
    </Fragment>
  )
}

export default FilmDetails