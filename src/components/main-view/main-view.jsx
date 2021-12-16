import React from 'react';
import axios from 'axios';
import {RegistrationView} from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {


    constructor(){
        super();
        this.state = {
        movies: [
            // { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
            // { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
            // { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
        ],
        selectedMovie: null,
        user:null
        }
    }
    componentDidMount(){
      axios.get('https://flexmyflix.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    setSelectedMovie(movie) {
        this.setState({
        selectedMovie: movie
        });
    }
    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    render() {
        const { movies, selectedMovie, user } = this.state;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (movies.length === 0) return <div className="main-view" />;//The list is empty!</div>;
        return (
            <div className="main-view">
              {selectedMovie
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                : movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                ))
              }
            </div>
          );
        }
}
export default MainView;