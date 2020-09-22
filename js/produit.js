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
        for (let i = 0; i < products.length; i += 1) {
            //Récupération de l'URL contenant l'ID du produit
            if (window.location.href.includes(products[i]._id)) {
                //Affichage des données pour chaque produit
                document.getElementById("titre-produit").textContent = products[i].name;
                document.getElementById("prix-produit").textContent = `${products[i].price / 100} €`;
                document.getElementById("img-produit").setAttribute("src", products[i].imageUrl);
                document.getElementById("description-produit").textContent = products[i].description;
                //Apparition des options dans le bon nombre de cases
                for (let opt = 0; opt < products[i].lenses.length; opt += 1) {
                    document.querySelector(".data-option" + opt).classList.replace("d-none", "d-block");
                    document.querySelector(".data-option" + opt).textContent = products[i].lenses[opt];
                }
                //Préparation du bouton "panier" en prévision de l'achat
                document.getElementById("ajout-panier").addEventListener("click", function() {
                    localStorage.setItem("ajoutPanier", products[i]._id);
                });
            };
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de personnalisation
viewProduct ();



