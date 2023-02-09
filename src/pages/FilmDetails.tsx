import {Container, Row, Col} from 'reactstrap'
import Button from '../components/UI/Button'
import './styles/FilmDetails.scss'
import Heading from '../components/UI/Heading'
import Helmet from '../components/Helmet'
import {AiFillStar} from 'react-icons/ai'
import {MdMovie} from 'react-icons/md'
import React, {Fragment, useState, useEffect, useMemo} from 'react'
import type { FunctionComponent } from 'react'
import { Movies } from './Home'
import { useParams } from 'react-router-dom'
import {singleMovieFormatDate, roundToDecimal, imgInitialPath} from '../utils/Format'

const FilmDetails: FunctionComponent = () => {
    // Prendo l'ID direttamente dalla query 
    const { id } = useParams();
    /* APIs Key = dove 278 è l'ID del film singolo  */
    const API_KEY_SINGLE_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`
    // Array dichiarato inizialmente vuoto
    const [singleMovie, setSingleMovie] = useState<Movies>();
    // Variabile per verificare se c'è già il film nel localStorage (inizialmente false)
    const [movieFromLocal, setMovieFromLocal] = useState<boolean>(false)
    // Memorizzo la mia key nell'hook useMemo
    const apiMemoKey = useMemo(() => API_KEY_SINGLE_MOVIE, [API_KEY_SINGLE_MOVIE])

    //#region Call API
    useEffect(() => {
      const fetchSingleMovie = async () => {
        try {
          // Salvo in una variabile il responso dalla mia API key
          const response = await fetch(apiMemoKey);
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
        } catch (error) {
          // Verifico l'errore in console
          console.error(error);
        }
      };
      // Invoco la function 
      fetchSingleMovie();
    }, [apiMemoKey]);
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
      <Container className='container-details'>
        {
          singleMovie && <Row className='row-details'>
          {/* Immagine del film */}
          <Col lg='3' className='details-picture-col'>
            <img className='details-img' src={singleMovie.poster_path} alt={singleMovie.title} />
          </Col>
          {/* Dettagli del Film */}
          <Col lg='8' className='details-content-col'>
            <Heading type='single-movie' title={singleMovie.title} />
            {/* Info */}
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
            {/* Text */}
            <p className='details-content_trama'>
              {singleMovie.overview}
            </p>
            {/* Buttons */}
            {
              movieFromLocal ? 
              (
                <Button onClick={removeToFavHandler} text="Remove from Favorites" type='remove' />  
              ) : (
                <Button onClick={addToFavHandler} text="Add To Favorite" type='add' />
              )
            }
          </Col>          
        </Row>
        }
      </Container>
    </Fragment>
  )
}

export default FilmDetails