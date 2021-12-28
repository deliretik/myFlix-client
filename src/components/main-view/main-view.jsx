import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });


    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
    //   axios.get('https://flexmyflix.herokuapp.com/movies')
    //     .then(response => {
    //       this.setState({
    //         movies: response.data
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    
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

    getMovies(token) {
      axios.get('https://flexmyflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
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
            
            <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }}/>
              </Col>
              ))
              }
              <button onClick={() => { this.onLoggedOut() }}>Logout</button>
            </Row>
          );
        }
}

export default MainView;