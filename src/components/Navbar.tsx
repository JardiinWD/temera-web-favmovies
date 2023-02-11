import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import { Link } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import React, {Fragment, useState, useEffect} from 'react'
import type { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'
/* Custom Hooks */
import useResponsiveResize from '../hooks/useResponsiveResize'


const Navbar: FunctionComponent = () => {
  
  // Variabile di stato per la pagina corrente
  const [isCurrentPage, setIsCurrentPage] = useState<string>('')
  // Destructuring del mio custom Hook
  const {navToggle, setNavToggle} = useResponsiveResize()
  // utilizzo la location e la salvo in una variabile
  const pageLocation = useLocation()
  
  // Update della variabile di stato isCurrentPage in base al pathname
  useEffect(() => {
    setIsCurrentPage(pageLocation.pathname === '/favorites' ? 'Favorites' : 'Top Rated')
  }, [pageLocation.pathname])

  // Handler della nav dinamica
  const handlerNavToggle = () => {
    setNavToggle(!navToggle)
  }

  return (
    <Fragment>
      <Container className='nav-container'>
        <Row className='nav-row'>
          <Link to='/'>
            <Heading type="logo-title" title="Movies" />
          </Link>
          {/* Oltre 768px */}
          <div className='nav-links'>
            <Link to='/'>
              <span className={`${isCurrentPage === 'Top Rated' ? 'active-page' : ''}`}>Top Rated</span>
            </Link>
            <Link to='/favorites'>
              <span className={`${isCurrentPage === 'Favorites' ? 'active-page' : ''}`}>Favorites</span>
            </Link>
          </div>
          {/* Toggle per il responsive */}
          <div className='navbar-responsive_toggle'>
            {
              !navToggle ? (
                <FaBars onClick={handlerNavToggle} />
              ) : (
                <FaTimes onClick={handlerNavToggle} />
              )
            }
          </div>
          {
            navToggle && (
              <div className='navbar-responsive_wrapper'>
                  <Link onClick={handlerNavToggle} to='/'>
                    <span className={`${isCurrentPage === 'Top Rated' ? 'active-page' : ''}`}>Top Rated</span>
                  </Link>
                  <Link onClick={handlerNavToggle} to='/favorites'>
                    <span className={`${isCurrentPage === 'Favorites' ? 'active-page' : ''}`}>Favorites</span>
                  </Link>
              </div>
            )
          }
        </Row>
      </Container>
    </Fragment>
  )
}

export default Navbar