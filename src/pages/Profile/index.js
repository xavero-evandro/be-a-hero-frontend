import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          Authorization: ngoId,
        },
      })
      .then(res => {
        setIncidents(res.data);
      });
  }, [ngoId, setIncidents]);

  async function deleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Sorry, something went wrong: ' + error.message);
    }
  }

  function logOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"></img>
        <span>Welcome {ngoName}</span>

        <Link className="button" to="/incidents/new">
          Register a new incident
        </Link>
        <button onClick={logOut} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Incidents Registered</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Incident</strong>
            <p>{incident.title}</p>

            <strong>Description</strong>
            <p>{incident.description}</p>

            <strong>Vaue</strong>
            <p>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(incident.value)}
            </p>

            <button onClick={() => deleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
