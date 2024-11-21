// Variables pour suivre la progression
let questionActuelle = 1;
let score = 0;

// Chargement d'un produit aléatoire depuis le jeu de données
async function chargerProduit() {
    const url = 'https://raw.githubusercontent.com/DanYellow/cours/refs/heads/main/integration-web-s3/sae-303/datasets/developpement/openfoodfacts-bonbons.json';

    try {
        const response = await fetch(url);
        const produits = await response.json();
        // Math.random() génère un nombre entre 0 et 1
        // Math.random() * produits.length donne un nombre entre 0 et la taille du tableau
        // Math.floor arrondit ce nombre à l'entier inférieur
        return produits[Math.floor(Math.random() * produits.length)];
    } catch (erreur) {
        console.error("Erreur lors du chargement :", erreur);
        return null;
    }
}

// Afficher le produit sur la page
function afficherProduit(produit) {
    const blocProduit = document.getElementById('produit');
    blocProduit.querySelector('.nom-produit').textContent = produit.product_name_fr || "Produit inconnu";
    blocProduit.querySelector('.image-produit').src = produit.image_url || 'img/placeholder.png';
    blocProduit.setAttribute('data-nutriscore', produit.nutriscore_grade ? produit.nutriscore_grade.toLowerCase() : '');
}

// Gérer le choix de l'utilisateur
function gererChoix(choixUtilisateur) {
    const produit = document.getElementById('produit');
    const vraiNutriScore = produit.getAttribute('data-nutriscore');
    const message = document.getElementById('message-resultat');

    if (choixUtilisateur === vraiNutriScore) {
        score++;
        message.textContent = 'Bravo ! Bonne réponse.';
    } else {
        message.textContent = `Dommage ! Le bon Nutri-Score était ${vraiNutriScore ? vraiNutriScore.toUpperCase() : "inconnu"}.`;
    }

    // Afficher le bouton suivant
    document.getElementById('bouton-suivant').style.display = 'block';
}

// Passer à la question suivante
async function questionSuivante() {
    if (questionActuelle >= 10) {
        localStorage.setItem('scoreFinal', score);
        window.location.href = 'score.html';
        return;
    }

    questionActuelle++;
    document.getElementById('numero-question').textContent = `${questionActuelle} / 10`;
    document.getElementById('message-resultat').textContent = '';
    document.getElementById('bouton-suivant').style.display = 'none';

    const produit = await chargerProduit();
    if (produit) {
        afficherProduit(produit);
    } else {
        document.getElementById('message-resultat').textContent = "Erreur lors du chargement du produit.";
    }
}

// Démarrer le jeu
async function lancerJeu() {
    const produit = await chargerProduit();
    if (produit) {
        afficherProduit(produit);

        // Boutons Nutri-Score
        document.querySelectorAll('.btn-nutriscore').forEach((bouton) => {
            bouton.onclick = () => gererChoix(bouton.getAttribute('data-score'));
        });

        // Bouton "Continuer"
        document.getElementById('bouton-suivant').onclick = questionSuivante;
    } else {
        document.getElementById('message-resultat').textContent = "Erreur lors du chargement du produit.";
    }
}

// Démarrer le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', lancerJeu);
