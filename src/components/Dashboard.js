import React from 'react';
import './Dashboard.css'; // Fichier CSS pour les styles spécifiques à cette page
import { FaUsers, FaFlag, FaUserShield,FaTrophy,FaSignOutAlt } from 'react-icons/fa'; // Importation des icônes

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Barre latérale */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Tableau de bord</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/utilisateurs">
              <FaUsers className="sidebar-icon" />
              Utilisateurs
            </a>
          </li>
          <li>
            <a href="/equipes">
              <FaUserShield className="sidebar-icon" />
              Équipes
            </a>
          </li>
          <li>
            <a href="/defis">
              <FaFlag className="sidebar-icon" />
              Défis
            </a>
          </li>
          <li>
            <a href="/defis">
              <FaTrophy className="sidebar-icon" />
              classement
            </a>
          </li>
          <li>
            <a href="/defis">
              <FaSignOutAlt className="sidebar-icon" />
              Deconnexion
            </a>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        <h2>Bienvenue sur votre tableau de bord, Administrateur</h2>
        {/* Autres éléments du contenu principal */}
        {/* ... */}
      </div>
    </div>
  );
}

export default Dashboard;
