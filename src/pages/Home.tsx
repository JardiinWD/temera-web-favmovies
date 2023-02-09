import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Movies } from '../layout/Layout'
import Helmet from '../components/Helmet'
import Button from '../components/UI/Button'
import {Container, Row, Col} from 'reactstrap'
import './styles/Home.scss'
import React, {Fragment, useState} from 'react'

type HomeProps = {
  moviesList: Movies[]
}

const Home: FunctionComponent<HomeProps> = (props) => {

  const {moviesList} = props
  
  return (
    <Fragment>
      <Helmet page="Homepage" />
      <Container className='home-container'>
        <Row className='home-row' xl='4' lg="3" md="2" sm="1">
          {/* TODO: Questa deve essere componente (per ora senza Col, poi vedo di risolvere con semantica corretta) */}
          {
           moviesList.map((item, index) => {
              return (
                <Link key={index} className='card-col' to={`/home/${item.id}`}>
                  <img className='card-img' src={item.poster_path} alt={item.title} />
                  <span className='card-title'>{item.title}</span>
                </Link>
              )
            })
          }                       
        </Row>
        <Button onClick={() => {}} type='load' text='Load More' />
      </Container>
    </Fragment>
  )
}

export default Home