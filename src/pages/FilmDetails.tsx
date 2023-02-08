import {Container, Row, Col} from 'reactstrap'
import Button from '../components/UI/Button'
import './styles/FilmDetails.scss'
import Heading from '../components/UI/Heading'
import Helmet from '../components/Helmet'
import {AiFillStar} from 'react-icons/ai'
import {MdMovie} from 'react-icons/md'
import React, {Fragment} from 'react'



const FilmDetails = () => {
  return (
    <Fragment>
      <Helmet page='Details' />
      <Container className='container-details'>
        <Row className='row-details'>
          {/* Immagine del film */}
          <Col lg='3' className='details-picture-col'>
            <img className='details-img' src="https://via.placeholder.com/330x400.png?" alt="Immagine Placeholder" />
          </Col>
          {/* Dettagli del Film */}
          <Col lg='8' className='details-content-col'>
            <Heading type='single-movie' title='The Shawshank Redemption' />
            {/* Info */}
            <div className='details-content_info'>
              {/* TODO: Questi possono essere "mappati" con map */}
              <span>
                <AiFillStar />
                8.6
              </span>
              <span>
                <MdMovie />
                27 Sep 1994
              </span>
            </div>
            {/* Text */}
            <p className='details-content_trama'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium tenetur quos numquam illo 
              vel temporibus eligendi quod eius blanditiis inventore minus enim nostrum repudiandae nisi 
              ipsam sequi totam fugit in consequuntur repellendus voluptates, qui mollitia sunt? Eos, 
              sapiente impedit! Quae eveniet, voluptatum ut ad id eaque, nam, maiores explicabo iure 
              fugit rerum voluptatem necessitatibus nobis voluptates officiis cum saepe autem.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolore enim quisquam nostrum 
              unde deleniti sunt tempore ex nemo blanditiis.
            </p>
            {/* Button */}
            <Button text="Add To Favorite" type='add' />
          </Col>          
        </Row>
      </Container>
    </Fragment>
  )
}

export default FilmDetails