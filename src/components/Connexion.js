import React, { useState } from 'react';
import './Connexion.css'; // Fichier CSS pour les styles spécifiques à cette page
 // Importation du hook useHistory pour la redirection

function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 // Initialisation du hook useHistory

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:8080/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Récupération des données de l'utilisateur depuis la réponse de l'API
    const userData = await response.json();
    console.log(userData); // Vérifiez la structure de la réponse dans la console

    // Vérification du rôle de l'utilisateur et redirection appropriée
    switch (userData.message) {
      case 'Connexion réussie en tant que participant':
        // Redirection vers la page participant
        window.location.href = '/participant';
        break;
      case 'Connexion réussie en tant qu\'administrateur':
        // Redirection vers la page d'administration
        window.location.href = '/admin';
        break;
      case 'Connexion réussie en tant que jury':
        // Redirection vers la page jury
        window.location.href = '/jury';
        break;
      default:
        // Cas où le rôle n'est pas reconnu
        throw new Error('Rôle d\'utilisateur non reconnu');
    }
  } catch (error) {
    setErrorMessage(error.message);
  }
};



  return (
    <div className="connexion-container">
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;
