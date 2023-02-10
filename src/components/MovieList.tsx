import type { FunctionComponent } from 'react'
import { Movies } from '../pages/Home'
import {Container, Row, Col} from 'reactstrap'
import './styles/MovieList.scss'
import { Link } from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {getOnlyMovieFullYear} from '../utils/Format'

type MovieListProps = {
    movieList : Movies[]
}


const MovieList: FunctionComponent<MovieListProps> = ({movieList}) => {
    return (
    <Container className='movie_list-container'>
        <Row className='movie_list-row' >
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
                            <span className='card-item_info-vote'>{getOnlyMovieFullYear(item.release_date)}</span>
                        </div>
                    </Link>
                </Col>
                )
            })
            }      
        </Row>
    </Container>
    )
}

export default MovieList