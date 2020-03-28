import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whats, setWhats] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whats,
      city,
      uf,
    };

    try {
      const response = await api.post('ngos', data);
      alert('Your ID: ' + response.data.id);
      history.push('/');
    } catch (error) {
      alert('Sorry, something went wrong: ' + error.message);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register</h1>
          <p>
            Create your account, get inside and help people to find their NGO
            incidents.
          </p>
          <Link to="/" className="go-back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Go back
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO's Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp number"
            value={whats}
            onChange={e => setWhats(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
