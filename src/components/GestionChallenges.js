import React, { useState, useEffect } from 'react';
import './defi.css'; // Fichier CSS pour les styles spécifiques à cette page
import { FaEllipsisV, FaPlus } from 'react-icons/fa'; // Importation de l'icône des trois points et de l'icône plus

function Defi() {
  // État pour stocker la liste des défis
  const [defis, setDefis] = useState([]);
  // État pour stocker les données du formulaire de création
  const [nouveauDefi, setNouveauDefi] = useState({
    Titre_du_defi: '',
    Description_du_defi: '',
    Date_de_debut: '',
    Date_de_fin: '',
    Grille_d_evaluation_associee: ''
  });
  // État pour gérer l'affichage du formulaire de création
  const [showForm, setShowForm] = useState(false);

  // État local pour le suivi de l'état du menu contextuel pour chaque défi
  const [menuOpen, setMenuOpen] = useState({});

  // Effet pour récupérer la liste des défis depuis l'API
  useEffect(() => {
    const fetchDefis = async () => {
      try {
        const response = await fetch('http://localhost:8080/defis');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des défis');
        }
        const data = await response.json();
        setDefis(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDefis();
  }, []);

  // Fonction pour gérer la modification d'un défi
  const handleModifier = (defiId) => {
    // Mettre à jour l'état pour basculer le menu contextuel
    setMenuOpen((prevState) => ({
      ...prevState,
      [defiId]: !prevState[defiId]
    }));

    // Mettre en œuvre la logique pour la modification du défi
    // Redirection vers une page de modification, ou affichage d'un formulaire de modification
  };

  // Fonction pour gérer la suppression d'un défi
  const handleSupprimer = async (defiId) => {
    try {
      const response = await fetch(`http://localhost:8080/defis/${defiId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du défi');
      }
      // Mettre à jour la liste des défis après la suppression
      const updatedDefis = defis.filter(defi => defi._id !== defiId);
      setDefis(updatedDefis);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour soumettre le formulaire de création d'un défi
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/defis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouveauDefi)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création du défi');
      }
      // Réinitialiser le formulaire après la création du défi
      setNouveauDefi({
        Titre_du_defi: '',
        Description_du_defi: '',
        Date_de_debut: '',
        Date_de_fin: '',
        Grille_d_evaluation_associee: ''
      });
      // Mettre à jour la liste des défis après la création
      const newDefi = await response.json();
      setDefis([...defis, newDefi]);
      // Masquer le formulaire après la création
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="defis-container">
      <h2>Liste des Défis</h2>
      {/* Affichage du bouton ou de l'icône pour ajouter un défi */}
      <div className="add-button" onClick={() => setShowForm(!showForm)}>
        <FaPlus />
      </div>
      {/* Affichage du formulaire de création si showForm est vrai */}
      {showForm && (
        <form className="defi-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Titre du défi"
            value={nouveauDefi.Titre_du_defi}
            onChange={(e) => setNouveauDefi({ ...nouveauDefi, Titre_du_defi: e.target.value })}
          />
          <textarea
            className="form-input"
            placeholder="Description du défi"
            value={nouveauDefi.Description_du_defi}
            onChange={(e) => setNouveauDefi({ ...nouveauDefi, Description_du_defi: e.target.value })}
          />
          <input
            className="form-input"
            type="date"
            placeholder="Date de début"
            value={nouveauDefi.Date_de_debut}
            onChange={(e) => setNouveauDefi({ ...nouveauDefi, Date_de_debut: e.target.value })}
          />
          <input
            className="form-input"
            type="date"
            placeholder="Date de fin"
            value={nouveauDefi.Date_de_fin}
            onChange={(e) => setNouveauDefi({ ...nouveauDefi, Date_de_fin: e.target.value })}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Grille d'évaluation associée"
            value={nouveauDefi.Grille_d_evaluation_associee}
            onChange={(e) => setNouveauDefi({ ...nouveauDefi, Grille_d_evaluation_associee: e.target.value })}
          />
          <button className="form-button" type="submit">Créer un défi</button>
        </form>
      )}

      {/* Affichage de chaque défi */}
      <div className="defis-list">
        {defis.map((defi) => (
          <div key={defi._id} className="defi-item">
            <div className="defi-header">
              <h3>{defi.Titre_du_defi}</h3>
              <div className="menu-icon">
                <FaEllipsisV onClick={() => handleModifier(defi._id)} />
                {menuOpen[defi._id] && ( // Afficher le menu contextuel si l'état est vrai
                  <div className="menu-content">
                    <button onClick={() => handleModifier(defi._id)}>Modifier</button>
                    <button onClick={() => handleSupprimer(defi._id)}>Supprimer</button>
                  </div>
                )}
              </div>
            </div>
            <p>Description : {defi.Description_du_defi}</p>
            <p>Date de début : {defi.Date_de_debut}</p>
            <p>Date de fin : {defi.Date_de_fin}</p>
            <p>Grille d'évaluation associée : {defi.Grille_d_evaluation_associee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Defi;
