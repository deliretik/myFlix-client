import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');
    
    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdayError, setBirthdayError] = useState({});

    axios.post('https://flexmyflix.herokuapp.com/movies/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

    const validate = () => {
      let isReq = true;
      if(name){
        setValues({...values, nameErr: 'Name is required'});
        isReq = false;
      }
      if(!username){
        setValues({...values, usernameErr: 'Username is required'});
        isReq = false;
      } else if {
        setValues({...values, usernameErr: 'Username must be 5 characters long'})
        isReq = false;
      }
      if(!password){
        setValues({...values, passwordErr: 'Password required'});
        isReq = false;
      } else if(password.length < 6){
        setValues({...values, passwordErr: 'Password must be 6 characters long'})
        isReq = false;
      }
      if(!email){
        setValues({...values, emailErr: 'Email required'});
        isReq = false;
      } else if(email.indexOf('@') === -1){
        setValues({...values, emailErr: 'Email is invalid'});
        isReq = false;
      }
      return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegistration(username);
      };

return (
<Form>
    <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control size="sm" placeholder="Name" type="text" value={username} onChange={e => setUsername(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control size="sm" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control size="sm" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formBirthdate">
      <Form.Label>Birthdate:</Form.Label>
      <Form.Control size="sm" placeholder="date" type="date" value={birthday} onChange={e => setBirthdate(e.target.value)} />
    </Form.Group>
      <Button variant="dark" size="sm" type="submit" onClick={handleSubmit}>
      Join
    </Button>
  </Form>

);
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};