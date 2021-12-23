import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

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