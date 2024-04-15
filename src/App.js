import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './components/Accueil';
import Connexion from './components/Connexion';
import Classement from './components/Classement';
import APropos from './components/APropos';
import Dashboard from './components/Dashboard';
import GestionUtilisateurs from './components/GestionUtilisateurs';
import GestionEquipes from './components/GestionEquipes';
import GestionChallenges from './components/GestionChallenges';
import ParticipantDashboard from './components/ParticipantDashboard';
import ModificationUtilisateur from './components/ModificationUtilisateur';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Front Office Routes */}
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/classement" element={<Classement />} />
          <Route path="/a-propos" element={<APropos />} />

          {/* Back Office Routes */}
          <Route path="/participant" element={<ParticipantDashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/utilisateurs" element={<GestionUtilisateurs />} />
          <Route path="/gestion-equipes" element={<GestionEquipes />} />
          <Route path="/gestion-challenges" element={<GestionChallenges />} />
          <Route path="/modifier-utilisateur/:id" element={<ModificationUtilisateur />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
