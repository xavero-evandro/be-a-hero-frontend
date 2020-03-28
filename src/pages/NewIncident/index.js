import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const ngoId = localStorage.getItem('ngoId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  async function newIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ngoId,
        },
      });

      history.push('/profile');
    } catch (error) {
      alert('Sorry, something went wrong: ' + error.message);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register new incident</h1>
          <p>Describe the incident in detail to find a hero to solve it.</p>
          <Link to="/profile" className="go-back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Back home
          </Link>
        </section>
        <form onSubmit={newIncident}>
          <input
            placeholder="Incident Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
