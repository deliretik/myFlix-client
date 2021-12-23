import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

      constructor(){
        super();
        this.state = {
        movies: [],
        selectedMovie: null,
        user:null,
        register: null
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

    onRegistration(register) {
      this.setState({
        register
      });
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    render() {
        const { movies, selectedMovie, user } = this.state;
        
        if (!user) 
          return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        if (!user)
          return <RegistrationView onRegistration={user => this.onRegistration(user)} />;  
        
        if (movies.length === 0) return <div className="main-view" />;
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