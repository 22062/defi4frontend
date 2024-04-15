import React, { useState, useEffect } from 'react';
import './Equipes.css'; // Fichier CSS pour les styles spécifiques à cette page
import { FaEllipsisV, FaPlus } from 'react-icons/fa'; // Importation de l'icône des trois points et de l'icône plus

function Equipes() {
  // État pour stocker la liste des équipes
  const [equipes, setEquipes] = useState([]);
  // État pour stocker les données du formulaire de création
  const [nouvelleEquipe, setNouvelleEquipe] = useState({
    Nom_de_l_equipe: '',
    Composition_de_l_equipe: [],
    Slogan_de_l_equipe: ''
  });
  // État pour gérer l'affichage du formulaire de création
  const [showForm, setShowForm] = useState(false);

  // État local pour le suivi de l'état du menu contextuel pour chaque équipe
  const [menuOpen, setMenuOpen] = useState({});

  // Effet pour récupérer la liste des équipes depuis l'API
  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/equipes');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        const data = await response.json();
        setEquipes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipes();
  }, []);

  // Fonction pour gérer la modification d'une équipe
  const handleModifier = (equipeId) => {
    // Mettre à jour l'état pour basculer le menu contextuel
    setMenuOpen((prevState) => ({
      ...prevState,
      [equipeId]: !prevState[equipeId]
    }));

    // Mettre en œuvre la logique pour la modification de l'équipe
    // Redirection vers une page de modification, ou affichage d'un formulaire de modification
  };

  // Fonction pour gérer la suppression d'une équipe
  const handleSupprimer = async (equipeId) => {
    try {
      const response = await fetch(`http://localhost:8080/equipes/${equipeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'équipe');
      }
      // Mettre à jour la liste des équipes après la suppression
      const updatedEquipes = equipes.filter(equipe => equipe._id !== equipeId);
      setEquipes(updatedEquipes);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour soumettre le formulaire de création d'une équipe
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/equipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouvelleEquipe)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'équipe');
      }
      // Réinitialiser le formulaire après la création de l'équipe
      setNouvelleEquipe({
        Nom_de_l_equipe: '',
        Composition_de_l_equipe: [],
        Slogan_de_l_equipe: ''
      });
      // Mettre à jour la liste des équipes après la création
      const newEquipe = await response.json();
      setEquipes([...equipes, newEquipe]);
      // Masquer le formulaire après la création
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="equipes-container">
      <h2>Liste des Équipes</h2>
      {/* Affichage du bouton ou de l'icône pour ajouter une équipe */}
      <div className="add-button" onClick={() => setShowForm(!showForm)}>
        <FaPlus />
      </div>
      {/* Affichage du formulaire de création si showForm est vrai */}
{showForm && (
  <form className="equipe-form" onSubmit={handleSubmit}>
    <input
      className="form-input"
      type="number"
      placeholder="ID de l'équipe"
      value={nouvelleEquipe.ID_de_l_equipe}
      onChange={(e) => setNouvelleEquipe({ ...nouvelleEquipe, ID_de_l_equipe: parseInt(e.target.value) })}
    />
    <input
      className="form-input"
      type="text"
      placeholder="Nom de l'équipe"
      value={nouvelleEquipe.Nom_de_l_equipe}
      onChange={(e) => setNouvelleEquipe({ ...nouvelleEquipe, Nom_de_l_equipe: e.target.value })}
    />
    <input
      className="form-input"
      type="text"
      placeholder="Composition de l'équipe (séparée par des virgules)"
      value={nouvelleEquipe.Composition_de_l_equipe.join(', ')}
      onChange={(e) => setNouvelleEquipe({ ...nouvelleEquipe, Composition_de_l_equipe: e.target.value.split(', ') })}
    />
    <input
      className="form-input"
      type="text"
      placeholder="Slogan de l'équipe"
      value={nouvelleEquipe.Slogan_de_l_equipe}
      onChange={(e) => setNouvelleEquipe({ ...nouvelleEquipe, Slogan_de_l_equipe: e.target.value })}
    />
  
    <button className="form-button" type="submit">Créer une équipe</button>
  </form>
)}

      {/* Affichage de chaque équipe */}
      <div className="equipes-list">
        {equipes.map((equipe) => (
          <div key={equipe._id} className="equipe-item">
            <div className="equipe-header">
              <h3>{equipe.Nom_de_l_equipe}</h3>
              <div className="menu-icon">
                <FaEllipsisV onClick={() => handleModifier(equipe._id)} />
                {menuOpen[equipe._id] && ( // Afficher le menu contextuel si l'état est vrai
                  <div className="menu-content">
                    <button onClick={() => handleModifier(equipe._id)}>Modifier</button>
                    <button onClick={() => handleSupprimer(equipe._id)}>Supprimer</button>
                  </div>
                )}
              </div>
            </div>
            <p>Composition : {equipe.Composition_de_l_equipe.join(', ')}</p>
            <p>Slogan : {equipe.Slogan_de_l_equipe}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Equipes;
