import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import { Link } from 'react-router-dom'
import React, {Fragment, useState, useEffect} from 'react'
import type { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'

const Navbar: FunctionComponent = () => {
  
    // Variabile di stato per la pagina corrente
  const [isCurrentPage, setIsCurrentPage] = useState<string>('')
  // utilizzo la location e la salvo in una variabile
  const pageLocation = useLocation()
  
  // Update della variabile di stato isCurrentPage in base al pathname
  useEffect(() => {
    setIsCurrentPage(pageLocation.pathname === '/favorites' ? 'Favorites' : 'Top Rated')
  }, [pageLocation.pathname])

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