import React from 'react';
import './Accueil.css'; // Fichier CSS pour les styles spécifiques à cette page
import Navbar from './common/Navbar';
import { Link } from 'react-router-dom';

function Accueil() {
  return (
    <>
    <Navbar />
    <div className="landing-page">
      
      <div className="content">
        <h1>Bienvenue à la compétition S3C</h1>
        <p>Préparez-vous pour relever le défi de codage ultime!</p>
        <Link to="/connexion" className="start-button">Commencer</Link>
      </div>
    </div>
    </>
  );
}

export default Accueil;
