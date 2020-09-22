//*****STOCKAGE DES DONNEES D'ACHAT *****/

//Ajout d'un objet local pour remplir le panier pendant la visite du site
let panier = JSON.parse(localStorage.getItem("panier"));
// console.log(localStorage);


//*****PERSONNALISATION DE LA PAGE PRODUIT******

//Création de la fonction de personnalisation
function viewProduct () {
    let url = "http://localhost:3000/api/cameras";
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }
    fetch(url, options)
    .then(response => response.json())
    .then(products => {
        for (let product of products) {
            //Récupération de l'URL contenant l'ID du produit
            console.log(product);
            if (window.location.href.includes(product._id)) {
                //Affichage des données pour chaque produit
                document.getElementById("titre-produit").textContent = product.name;
                document.getElementById("prix-produit").textContent = `${product.price / 100} €`;
                document.getElementById("img-produit").setAttribute("src", product.imageUrl);
                document.getElementById("description-produit").textContent = product.description;
                //Apparition des options dans le bon nombre de cases
                for (let opt = 0; opt < product.lenses.length; opt += 1) {
                    document.querySelector(".data-option" + opt).classList.replace("d-none", "d-block");
                    document.querySelector(".data-option" + opt).textContent = product.lenses[opt];
                }
                //Préparation du bouton "panier" en prévision de l'achat
                document.getElementById("ajout-panier").addEventListener("click", function() {
                    localStorage.setItem("ajoutPanier", products._id);
                });
            };
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de personnalisation
viewProduct ();