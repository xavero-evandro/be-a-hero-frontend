import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', res.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Sorry, something went wrong: ' + error.message);
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero Logo" />
        <form onSubmit={handleLogin}>
          <h1>Please Login</h1>
          <input
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Enter
          </button>
          <Link to="/register" className="go-back-link">
            <FiLogIn size={16} color="#E02041" />I don't have an account
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
