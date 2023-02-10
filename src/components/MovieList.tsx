import type { FunctionComponent } from 'react'
import { Movies } from '../pages/Home'
import {Container, Row, Col} from 'reactstrap'
import './styles/MovieList.scss'
import { Link, NavLink } from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BiMoviePlay} from 'react-icons/bi'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import {getOnlyMovieFullYear} from '../utils/Format'
import {useEffect, useState} from 'react'

type MovieListProps = {
    movieList : Movies[]
}


const MovieList: FunctionComponent<MovieListProps> = ({movieList}) => {
    // Creao una variabile di stato per gestire la width responsive
    const [responsiveWidth, setResponsiveWidth] = useState<boolean>(false)
    
    // useEffect che mi aiuta a sistemare il comportamento dell resize sulla Navbar
    useEffect(() => {
        // Handler per aggiornare variabile di stato navToggle al resize
        const handleResponsiveResize = () => {
            if (window.innerWidth >= 768 && responsiveWidth) setResponsiveWidth(true)
        }
        // Aggiungo evento listener alla window al resize
        window.addEventListener("resize", handleResponsiveResize)

        // Restituisco comunque una function che rimuove addEventListener
        return () => {
            window.removeEventListener("resize", handleResponsiveResize)
        }
    }, [responsiveWidth])
    
    return (
    <Container className={`${responsiveWidth ? 'movie_list-container' : 'movie_list-container-resp'}`}>
        <Row className={`${responsiveWidth ? 'movie_list-row' : 'movie_list-row-resp'}`} >
            {
                movieList.map((item, index) => {
                    return (
                    <Col key={index} className='movie_list-col' md='6' lg='4' xl='3' xxl='3' sm='8' xs='8'>
                        <Link className='card-link-wrapper' to={`/home/${item.id}`}>
                            <img className='card-img' src={item.poster_path} alt={item.title} />
                            <span className='card-title'>{item.title}</span>
                            <div className='card-item_info'>
                                <span className='card-item_info-vote'>
                                    <AiFillStar />
                                    {item.vote_average}
                                </span>
                                <span className='card-item_info-vote'>
                                    {/* Fixato per malfunzionamento API */}
                                    {typeof item.release_date === 'string' ? getOnlyMovieFullYear(item.release_date) : item.release_date}
                                </span>
                            </div>
                        </Link>
                    </Col>
                    )
                })
            }
            {
                !responsiveWidth && (
                    movieList.map((item, index) => {
                        return (
                            <Col key={index} sm='12' xs='12' md='12'  className='movie_list-col-resp'>
                                <NavLink className='card-link-responsive-wrapper' to={`/home/${item.id}`}>
                                    {/* Image */}
                                    <img src={item.poster_path} alt={item.title} />
                                    {/* content */}
                                    <div className='movie_list-content-resp'>
                                        {/* Titolo Film */}
                                        <span className="card-title">{item.title}</span>
                                        {/* Data del film */}
                                        <span className='card-item_info-data-resp'>
                                            <BiMoviePlay />
                                            {getOnlyMovieFullYear(item.release_date)}
                                        </span>
                                        {/* Voti del film */}
                                        <span className='card-item_info-vote-resp'>
                                            <AiFillStar />
                                            {item.vote_average}
                                        </span>  
                                    </div>
                                    {/* Go-to Scheda prodotto */}    
                                    <div className='card-item_info-redirect'>
                                        <MdOutlineArrowForwardIos />
                                    </div>
                                </NavLink>
                            </Col>
                        )
                    })
                )
            }      
        </Row>
    </Container>
    )
}

export default MovieList