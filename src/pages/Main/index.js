import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

import api from '../../services/api';

import './styles.css';

export default function Main({ match }) {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      }).then(res => {
        setDevs(res.data);
      });
    }
    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id,
      }
    }).then(res => {
      setDevs(devs.filter(dev => dev._id !== id));
    });
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id,
      }
    }).then(res => {
      setDevs(devs.filter(dev => dev._id !== id));
    });
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {devs.length > 0 ? (
        <ul>
          {devs.map(dev => (
            <li key={dev._id}>
              <img src={dev.avatar} alt="avatar-user" />
              <footer>
                <strong>{dev.name}</strong>
                <p>{dev.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleLike(dev._id)}><img src={like} alt="Like Button" /></button>
                <button type="button" onClick={() => handleDislike(dev._id)}><img src={dislike} alt="Dislike Button" /></button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">Acabou :(</div>
        )}
    </div>
  );
}
