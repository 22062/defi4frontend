import React, { useState, useEffect } from 'react';
import './Utilisateurs.css'; // Fichier CSS pour les styles spécifiques à cette page
import { FaEllipsisV } from 'react-icons/fa'; // Importation de l'icône des trois points

function Utilisateurs() {
  // État pour stocker la liste des utilisateurs
  const [utilisateurs, setUtilisateurs] = useState([]);

  // État local pour le suivi de l'état du menu contextuel pour chaque utilisateur
  const [menuOpen, setMenuOpen] = useState({});

  // Effet pour récupérer la liste des utilisateurs depuis l'API
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch('http://localhost:8080/utilisateurs');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setUtilisateurs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUtilisateurs();
  }, []);

  // Fonction pour gérer la modification d'un utilisateur
  const handleModifier = (utilisateurId) => {
    // Mettre à jour l'état pour basculer le menu contextuel
    setMenuOpen((prevState) => ({
      ...prevState,
      [utilisateurId]: !prevState[utilisateurId]
    }));

    // Mettre en œuvre la logique pour la modification de l'utilisateur
    
  };
  const handleModifiers = (utilisateurId) => {
    // Rediriger vers la page de modification de l'utilisateur avec l'ID spécifié
    window.location.href = `/modifier-utilisateur/${utilisateurId}`;
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleSupprimer = (utilisateurId) => {
    // Mettre à jour l'état pour basculer le menu contextuel
    setMenuOpen((prevState) => ({
      ...prevState,
      [utilisateurId]: !prevState[utilisateurId]
    }));

    // Mettre en œuvre la logique pour la suppression de l'utilisateur
    console.log(`Suppression de l'utilisateur avec l'ID ${utilisateurId}`);
  };

  return (
    <div className="utilisateurs-container">
      <h2>Liste des Utilisateurs</h2>
      {/* Affichage de chaque utilisateur */}
      <div className="utilisateurs-list">
        {utilisateurs.map((utilisateur) => (
          <div key={utilisateur._id} className="utilisateur-item">
            <div className="utilisateur-header">
              <h3>{utilisateur.Nom_d_utilisateur}</h3>
              <div className="menu-icon">
                <FaEllipsisV onClick={() => handleModifier(utilisateur._id)} />
                {menuOpen[utilisateur._id] && ( // Afficher le menu contextuel si l'état est vrai
                  <div className="menu-content">
                    <button onClick={() => handleModifiers(utilisateur._id)}>Modifier</button>
                    <button onClick={() => handleSupprimer(utilisateur._id)}>Supprimer</button>
                  </div>
                )}
              </div>
            </div>
            <p>Email : {utilisateur.Adresse_e_mail}</p>
            <p>Rôle : {utilisateur.Role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Utilisateurs;
