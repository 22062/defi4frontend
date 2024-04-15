const handleModifier = async (equipeId, newData) => {
  try {
    const response = await fetch(`http://localhost:8080/equipes/${equipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la modification de l\'équipe');
    }
    // Mettre à jour l'état des équipes dans votre composant React
    // Par exemple, recharger la liste des équipes
  } catch (error) {
    console.error(error);
  }
};
