import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
<form>
    <label>
    Username:
    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    </label>
    <label>
    Password:
    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <button type="submit" onClick={handleSubmit}>Submit</button>
    <label>
    Email: 
    <input type="email" valur={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
    Birthday:
    <input type="birthday" valur={birthday} onChange={e => setBirthday(e.target.value)} />
    </label>
</form>
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