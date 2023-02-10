import Heading from './UI/Heading'
import { Container, Row } from 'reactstrap'
import './styles/Navbar.scss'
import { Link } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import React, {Fragment, useState, useEffect} from 'react'
import type { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'

const Navbar: FunctionComponent = () => {
  
    // Variabile di stato per la pagina corrente
  const [isCurrentPage, setIsCurrentPage] = useState<string>('')
  // Variabile di stato per la nav responsive
  const [navToggle, setNavToggle] = useState<boolean>(false)
  // utilizzo la location e la salvo in una variabile
  const pageLocation = useLocation()
  
  // Update della variabile di stato isCurrentPage in base al pathname
  useEffect(() => {
    setIsCurrentPage(pageLocation.pathname === '/favorites' ? 'Favorites' : 'Top Rated')
  }, [pageLocation.pathname])

  // useEffect che mi aiuta a sistemare il comportamento dell resize sulla Navbar
  useEffect(() => {
    // Handler per aggiornare variabile di stato navToggle al resize
    const handleViewportResize = () => {
      if (window.innerWidth >= 768 && navToggle) setNavToggle(false)
    }
    // Aggiungo evento listener alla window al resize
    window.addEventListener("resize", handleViewportResize)

    // Restituisco comunque una function che rimuove addEventListener
    return () => {
      window.removeEventListener("resize", handleViewportResize)
    }
  }, [navToggle])

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