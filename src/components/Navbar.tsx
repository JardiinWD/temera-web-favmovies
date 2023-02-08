import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import React, {Fragment} from 'react'

const Navbar = () => {
  return (
    <Fragment>
      <Container>
        <Row className='nav-row'>
          <Heading type="logo-title" title="Movies" />
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