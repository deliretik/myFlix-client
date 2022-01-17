import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import { Link } from 'react-router-dom';

//export 
class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
  
  // render() {
  //   const{ movie, onMovieClick } = this.props;  
  //   return (
  //     <Row className="main-view justify-content-md-center">
  //     <CardColumns>
  //      <Card border="light" className="card-container movie-card mb-2 " >
  //      <Col xs={12} md={10} className="image-size justify-content-md-center">
  //        <Card.Img variant="top" src={movie.ImagePath} fluid />
  //        </Col>
  //        <Card.Body className="card p-0"  style={{ width: '11rem', }}>
  //          <Card.Title>{movie.Title}</Card.Title>
  //          <Card.Text>{movie.Description}</Card.Text>
  //          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
  //        </Card.Body>
  //      </Card>
  //      </CardColumns>
  //    </Row>


  //     //<div className="movie-card" onClick={() => { onMovieClick(movie);}}>{movie.Title}</div>;
  //     //<div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
  //     );
  //   }
}


// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImageURL: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }),
//     Director: PropTypes.shape({  //?
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired
//     })
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieCard;