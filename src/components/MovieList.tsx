/* React */
import type { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {Fragment} from 'react'
/* Type */
import { Movies } from '../pages/Home'
/* Reactstrap & Style */
import {Container, Row, Col} from 'reactstrap'
import './styles/MovieList.scss'
/* React icons */
import {AiFillStar} from 'react-icons/ai'
import {BiMoviePlay} from 'react-icons/bi'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
/* Format */
import {getOnlyMovieFullYear} from '../utils/Format'

type MovieListProps = {
    movieList : Movies[]
}

const MovieList: FunctionComponent<MovieListProps> = ({movieList}) => {


    return (
        <Container className='movie_list-container'>
            <Row className='movie_list-row'>
                {
                    movieList ? (
                        movieList.map((item, index) => {
                            return (
                                <Fragment key={`${index}-${item.id}`}>
                                    {/* Col > 992px */}
                                    <Col key={`desktop-${index}-${item.id}`}  className='movie_list-col' md='6' lg='4' xl='3' xxl='3' sm='8' xs='8'>
                                        <Link className='card-link-wrapper' to={`/home/${item.id}`}>
                                            <img className='card-img' src={item.poster_path} alt={item.title} />
                                            <span className='card-title'>{item.title}</span>
                                            <div className='card-item_info'>
                                                <span className='card-item_info-vote'>
                                                    <AiFillStar />
                                                    {item.vote_average}
                                                </span>
                                                <span className='card-item_info-vote'>
                                                    {/* Fixato per differenza API (singleMovie / Top_Rated) */}
                                                    {typeof item.release_date === 'string' ? getOnlyMovieFullYear(item.release_date) : item.release_date}
                                                </span>
                                            </div>
                                        </Link>
                                    </Col>
                                    {/* Col < 768px */}
                                    <Col key={`mobile-${index}-${item.id}`} sm='12' xs='12' md='12'  className='movie_list-col-resp'>
                                        <Link className='card-link-responsive-wrapper' to={`/home/${item.id}`}>
                                            {/* Image */}
                                            <img src={item.poster_path} alt={item.title} />
                                            {/* content */}
                                            <div className='movie_list-content-resp'>
                                                <span className="card-title">{item.title}</span>
                                                <span className='card-item_info-data-resp'>
                                                    <BiMoviePlay />
                                                    {typeof item.release_date === 'string' ? getOnlyMovieFullYear(item.release_date) : item.release_date}
                                                </span>
                                                <span className='card-item_info-vote-resp'>
                                                    <AiFillStar />
                                                    {item.vote_average}
                                                </span>  
                                            </div>  
                                            <div className='card-item_info-redirect'>
                                                <MdOutlineArrowForwardIos />
                                            </div>
                                        </Link>
                                    </Col>
                                </Fragment>
                            )
                        })
                    ) : null
                }    
            </Row>
        </Container>
    )
}

export default MovieList