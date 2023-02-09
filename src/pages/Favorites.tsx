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
    // salvo il parsing in una variabile
    const movies: Movies[] = getItems.map(item => JSON.parse(item))
    // update della variabile di stato
    updateFavoriteFilm(movies)
  }, [])

  console.log(favoriteFilm)

  return (
    <Fragment>
      <Helmet page="Favorites" />
      <Container className='fav-container'>
        <Row className='fav-row' xl='4' lg="3" md="2" sm="1">
          {/* TODO: Questa deve essere componente (per ora senza Col, poi vedo di risolvere con semantica corretta) */}
          {
            favoriteFilm.map((item, index) => {
              return (
                <Link key={index} className='card-col' to={`/home/${item.id}`}>
                  <img className='card-img' src={item.poster_path} alt={item.title} />
                  <span className='card-title'>{item.title}</span>
                </Link>
              )
            })
          }      
        </Row>
      </Container>
    </Fragment>
  )
}

export default Favorites