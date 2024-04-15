import React, { useState, useEffect } from 'react';
import './ParticipantDashboard.css'; // Fichier CSS pour les styles spécifiques à cette page
import Navbar from './common/Navbar';

function ParticipantDashboard() {
  const [defis, setDefis] = useState([]);

  // Exemple de chargement des défis depuis une API
  useEffect(() => {
    const fetchDefis = async () => {
      try {
        const response = await fetch('http://localhost:8080/defis');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des défis');
        }
        const data = await response.json();
        setDefis(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDefis();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="participant-dashboard">
      <h2>Liste des Défis</h2>
      <div className="defis-container">
        {defis.map((defi) => (
          <div key={defi.id} className="defi-card">
            <h3>{defi.Titre_du_defi}</h3>
            <p>{defi.Description_du_defi}</p>
            <button className="consulter-button">Consulter le Défi</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default ParticipantDashboard;
