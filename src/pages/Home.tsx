import Helmet from '../components/Helmet'
import Button from '../components/UI/Button'
import {Container, Row, Col} from 'reactstrap'
import './styles/Home.scss'
import React, {Fragment} from 'react'


const Home = () => {
  return (
    <Fragment>
      <Helmet page="Homepage" />
      <Container className='home-container'>
        <Row className='home-row' xl='4' lg="3" md="2" sm="1">
          {/* TODO: Questa deve essere generata dinamicamente (e deve essere componente) */}
          {/* TODO: Deve anche essere Wrappata all'interno del link per spedire utente alla pagina del contenuto del film */}
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>  
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col> 
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>  
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>  
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col> 
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>  
          <Col className='card-col'>
            <img className='card-img' src="https://via.placeholder.com/295x320.png?" alt="Immagine Placeholder" />
            <span className='card-title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, suscipit.</span>
          </Col>                            
        </Row>
        <Button type='load' text='Load More' />
      </Container>
    </Fragment>
  )
}

export default Home