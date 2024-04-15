import React, { useState } from 'react';
import './ModificationUtilisateur.css'; // Importer le fichier CSS pour les styles spécifiques à cette page

function ModificationUtilisateur({ utilisateur, onModification }) {
  
  // États pour stocker les valeurs des champs de l'utilisateur en cours de modification
  const [nomUtilisateur, setNomUtilisateur] = useState(utilisateur.Nom_d_utilisateur);
  const [motDePasse, setMotDePasse] = useState(utilisateur.Mot_de_passe);
  const [adresseEmail, setAdresseEmail] = useState(utilisateur.Adresse_e_mail);
  const [role, setRole] = useState(utilisateur.Role);
  if (!utilisateur) {
    // Afficher un message d'erreur ou rediriger l'utilisateur vers une autre page
    return <div>L'utilisateur n'est pas défini.</div>;
  }


  // Fonction pour gérer la soumission du formulaire de modification
  const handleSubmit = (e) => {
    e.preventDefault();
    // Créer un objet avec les nouvelles valeurs des champs
    const utilisateurModifie = {
      Nom_d_utilisateur: nomUtilisateur,
      Mot_de_passe: motDePasse,
      Adresse_e_mail: adresseEmail,
      Role: role
    };
    // Appeler la fonction de modification avec l'utilisateur modifié
    onModification(utilisateur._id, utilisateurModifie);
  };

  return (
    <div className="modification-utilisateur-container">
      <h2>Modifier Utilisateur</h2>
      <form className="modification-utilisateur-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomUtilisateur">Nom d'utilisateur</label>
          <input
            type="text"
            id="nomUtilisateur"
            value={nomUtilisateur}
            onChange={(e) => setNomUtilisateur(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresseEmail">Adresse e-mail</label>
          <input
            type="email"
            id="adresseEmail"
            value={adresseEmail}
            onChange={(e) => setAdresseEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Rôle</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Jury">Jury</option>
            <option value="Participant">Participant</option>
          </select>
        </div>
        <button type="submit" className="modifier-button">Modifier</button>
      </form>
    </div>
  );
}

export default ModificationUtilisateur;
