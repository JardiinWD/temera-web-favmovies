import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import React, {Fragment} from 'react'

const Navbar = () => {
  return (
    <Fragment>
      <Container className='nav-container'>
        <Row className='nav-row'>
          <Heading type="logo-title" title="Movies" />
          {/* TODO: Da wrappare in una sidebar laterale a scomparsa in "sm" */}
          <div className='nav-links'>
            <span className='active-page'>Top Rated</span>
            <span>Favorites</span>
          </div>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Navbar