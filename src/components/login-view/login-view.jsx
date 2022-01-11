import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Link } from "react-router-dom";


//export 
function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});


  
  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
    axios.post('https://flexmyflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };
}

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let isValid = true;

    if (username.trim().length < 4) {
      usernameError.usernameShort = "Username must be at least 4 characters.";
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordError.passwordMissing = "Password must be at least 5 characters.";
      isValid = false;
    }
  
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
};

  return (

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {Object.keys(passwordError).map((key) => {
            return (
              <div key={key}>
                {passwordError[key]}
              </div>
            );
          })}
      </Form.Group>
     
    <span>
      <Button variant="dark" size="sm" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      {' '}
      <Link to="/register"><Button variant="dark" size="sm" type="button">Join</Button>
      </Link>
    </span>
      
    </Form>
  );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };
  
  export default LoginView;