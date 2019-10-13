import React, { useState } from 'react';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post('/devs', {
      username,
    }).then(res => {
      const { _id } = res.data;
      history.push(`/dev/${_id}`);
    });
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          type="text"
          placeholder="Digite seu usuário do GitHub"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
