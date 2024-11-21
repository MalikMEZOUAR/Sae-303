document.addEventListener('DOMContentLoaded', () => {
    // Récupération du score final depuis le localStorage
    const scoreFinal = localStorage.getItem('scoreFinal');

    // Vérifier si un score a été sauvegardé
    if (scoreFinal !== null) {
        // Afficher le score final
        document.getElementById('scoreFinal').textContent = `Vous avez obtenu un score de ${scoreFinal} sur 10 !`;
    } else {
        // Afficher un message si aucun score n'est trouvé
        document.getElementById('scoreFinal').textContent = `Aucun score trouvé. Jouez une autre partie pour découvrir votre score !`;
    }

    // Configurer le bouton "Rejouer"
    document.getElementById('restart-button').onclick = () => {
        localStorage.removeItem('scoreFinal'); // Réinitialiser le score dans le stockage
        window.location.href = 'jeu.html'; // Rediriger vers le début du jeu
    };
});
