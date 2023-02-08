import Helmet from '../components/Helmet'
import {Container, Row, Col} from 'reactstrap'
import './styles/Favorites.scss'
import React, {Fragment} from 'react'

const Favorites = () => {
  return (
    <Fragment>
      <Helmet page="Favorites" />
      <Container className='fav-container'>
        <Row className='fav-row' xl='4' lg="3" md="2" sm="1">
          {/* TODO: Questa deve essere generata dinamicamente (e deve essere componente) */}
          {/* TODO: Deve anche essere Wrappata all'interno del link per spedire utente alla pagina del contenuto del film */}
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>  
        </Row>
      </Container>
    </Fragment>
  )
}

export default Favorites