import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import { Link } from 'react-router-dom'
import React, {Fragment} from 'react'
import type { FunctionComponent } from 'react'


type NavProps = {
  isCurrentPage: string;
}

const Navbar: FunctionComponent<NavProps> = (props) => {
  
  // Destructuring della mia props
  const {isCurrentPage} = props
  
  return (
    <Fragment>
      <Container className='nav-container'>
        <Row className='nav-row'>
          <Link to='/'>
            <Heading type="logo-title" title="Movies" />
          </Link>
          {/* TODO: Da wrappare in una sidebar laterale a scomparsa in "sm" */}
          <div className='nav-links'>
            <Link to='/'>
              <span className={`${isCurrentPage === 'Top Rated' ? 'active-page' : ''}`}>Top Rated</span>
            </Link>
            <Link to='/favorites'>
              <span className={`${isCurrentPage === 'Favorites' ? 'active-page' : ''}`}>Favorites</span>
            </Link>
          </div>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Navbar