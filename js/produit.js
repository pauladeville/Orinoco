//*****STOCKAGE DES DONNEES D'ACHAT *****/



//*****PERSONNALISATION DE LA PAGE PRODUIT******

//Création de la fonction de personnalisation
viewProduct = () => {
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
                document.getElementById("ajout-panier").addEventListener("click", function(event) {
                    //Vérifier s'il y a déjà un tableau dans le local storage de l'utilisateur (si oui, le décoder, sinon le créer)
                    let ajoutPanier = localStorage.getItem("basketList");
                    if(ajoutPanier === null) {
                        ajoutPanier = [];
                    } else {
                        ajoutPanier = JSON.parse(ajoutPanier);
                    };
                    //Ajour au panier
                    ajoutPanier.push(product._id);
                    ajoutPanier = JSON.stringify(ajoutPanier);
                    localStorage.setItem("basketList", ajoutPanier);
                    console.log(localStorage);
                });
            };
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de personnalisation
viewProduct ();