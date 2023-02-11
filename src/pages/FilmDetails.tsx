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
/* Style */
import './styles/FilmDetails.scss'
/* Custom Hooks */
import useResponsiveResize from '../hooks/useResponsiveResize'
import useFetchApi from '../hooks/useFetchApi'

const FilmDetails: FunctionComponent = () => {
    // Prendo l'ID direttamente dalla query 
    const { id } = useParams();
    // Invoco la mia variabile di stato singleMovie e passo l'id del params
    const {singleMovie} = useFetchApi(id)
    // Variabile di stato per verificare se il film è tra i preferiti
    const [movieFromLocal, setMovieFromLocal] = useState<boolean>(false)
    // Destructuring del mio custom hooks
    const {responsiveWidth, responsiveBackgroundImg} = useResponsiveResize()

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
        singleMovie && (
          <Container className={`${!responsiveWidth ? 'container-details' : 'container-details-resp' }`}>
            <Row className={`${!responsiveWidth ? 'row-details' : 'row-details-resp' }`}>
              {/* Immagine del film */}
              <Col lg='3' className='details-picture-col'>
                {
                  responsiveBackgroundImg ? (
                    <img className='details-img' src={singleMovie.backdrop_path} alt={singleMovie.title} />
                  ) : (
                    <img className='details-img' src={singleMovie.poster_path} alt={singleMovie.title} />
                  )
                }
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
              {
                !responsiveWidth && (
                  <>
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
                  </>
                )
              }
            </Row>
          </Container>
        )
      }
    </Fragment>
  )
}

export default FilmDetails