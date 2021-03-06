import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';

//export 
class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  //getting user method
  getUser(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://flexmyflix.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavoriteMovie(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios
    .delete(`https://flexmyflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios.put(`https://flexmyflix.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open('/users/${username}', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios.delete(`https://flexmyflix.herokuapp.com/users/${Username}`, {
      headers: {Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return ( <Row className="profile-view">
        <Card className="profile-card">
          <h2>Favorites</h2>
          <Card.Body>
           {FavoriteMovies.length === 0 && <h6 className="text-center">Add favourite </h6>}

            <div className="favorites-movies ">
              {FavoriteMovies.length > 0 && movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return ( 
                      <CardDeck className="movie-card-deck" key={movie._id}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }} >
                          <Card.Img style={{ width: '15rem' }} className="movieCard" variant="top" src={movie.ImageUrl} />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger'  value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>
         
    
        
          <h2 className="section">Edit profile</h2>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>
              
              <Button variant='danger' size="sm" type="submit">
                Update
              </Button>
            
              <h6>Delete account</h6>     
                <div>
                <Button variant='warning' size="sm" onClick={(e) => 
                  this.handleDeleteUser(e)}>
                  Delete account
                 </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Row >
    );
  } 
} 

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
}; 


export default ProfileView; 