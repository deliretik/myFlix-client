import React, { useState } from 'react';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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