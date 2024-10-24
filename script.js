// Fonction pour récupérer les produits via l'API Open Food Facts
async function getProduct() {
    const response = await fetch('https://fr.openfoodfacts.org/api/v0/product/random.json'); // Appel API produit aléatoire
    const data = await response.json();
    return data.product; // Retourne le produit sous forme d'objet
}

// Fonction pour récupérer deux produits aléatoires
async function getTwoProducts() {
    const product1 = await getProduct();
    const product2 = await getProduct();
    
    // S'assurer qu'on a deux produits différents et valides
    if (product1 && product2 && product1.code !== product2.code) {
        return [product1, product2];
    } else {
        return getTwoProducts(); // En cas d'erreur, on relance la fonction
    }
}

// Fonction pour afficher les produits et démarrer le jeu
async function startGame() {
    const [product1, product2] = await getTwoProducts();
    
    // Affichage des deux produits dans l'interface
    displayProduct('product1', product1);
    displayProduct('product2', product2);

    // Gérer les choix de l'utilisateur
    document.getElementById('choose-product1').addEventListener('click', function() {
        checkWinner(product1, product2, 'product1');
    });
    document.getElementById('choose-product2').addEventListener('click', function() {
        checkWinner(product1, product2, 'product2');
    });
}

// Fonction pour afficher un produit dans la page
function displayProduct(elementId, product) {
    const productElement = document.getElementById(elementId);
    productElement.querySelector('.product-name').textContent = product.product_name;
    productElement.querySelector('.product-image').src = product.image_url || 'placeholder.png'; // Image par défaut si absente
    productElement.querySelector('.product-nutriscore').textContent = 'Nutri-Score: ' + (product.nutrition_grades || 'N/A');
}

// Fonction pour vérifier si l'utilisateur a fait le bon choix
function checkWinner(product1, product2, chosenProduct) {
    const winner = product1.nutrition_grades < product2.nutrition_grades ? 'product1' : 'product2';

    const resultMessage = document.getElementById('result-message');
    if (chosenProduct === winner) {
        resultMessage.textContent = 'Bravo ! Vous avez choisi le produit le plus sain.';
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = 'Dommage, vous avez choisi le produit le moins sain.';
        resultMessage.style.color = 'red';
    }

    // Proposer de rejouer après un court délai
    setTimeout(startGame, 3000);
}

// Démarrer le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    startGame();
});
