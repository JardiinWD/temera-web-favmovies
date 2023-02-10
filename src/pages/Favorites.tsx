import Helmet from '../components/Helmet'
import { Link } from 'react-router-dom'
import {Container, Row, Col} from 'reactstrap'
import './styles/Favorites.scss'
import { Movies } from './Home'
import React, {Fragment, useState, useEffect} from 'react'

const Favorites = () => {
  // Dichiaro la variabile di stato favoriteFilm e la sua function
  const [favoriteFilm, updateFavoriteFilm] = useState<Movies[]>([])

  useEffect(() => {
    // Prendo gli items dal localStorage
    const getItems = Object.values(localStorage)
    // salvo il parsing in una variabile (movies per non confondere)
    const movies: Movies[] = getItems.map(item => JSON.parse(item))
    // update della variabile di favoriteFilm
    updateFavoriteFilm(movies)
  }, [])

  return (
    <Fragment>
      <Helmet page="Favorites" />
      <Container className='fav-container'>
        <Row className='fav-row' style={{width : "100%"}}>
          {/* TODO: Questa potrebbe essere componente (per ora senza Col, poi vedo di risolvere con semantica corretta) */}
          {
            favoriteFilm.map((item, index) => {
              return (
                <Col style={{height : "450px"}} md='6' lg='4' xl='3' xxl='3' sm='8' xs='8'>
                  <Link key={index} className='card-link-wrapper' to={`/home/${item.id}`}>
                    <img className='card-img' src={item.poster_path} alt={item.title} />
                    <span className='card-title'>{item.title}</span>
                  </Link>
                </Col>
              )
            })
          }      
        </Row>
      </Container>
    </Fragment>
  )
}

export default Favorites