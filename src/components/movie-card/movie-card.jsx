import React from 'react';
import propTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const{ movie, onMovieClick } = this.props;  
    return (
      //<div className="movie-card" onClick={() => { onMovieClick(movie);}}>{movie.Title}</div>;
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
      );
    }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
    Director: PropTypes.shape({  //?
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

