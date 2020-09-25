const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

//Fonction de personnalisation de la page produit
viewProduct = () => {
    let url = `http://localhost:3000/api/cameras/${productId}`;
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }
    fetch(url, options)
    .then(response => response.json())
    .then(product => {
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
        //PREPARATION DU BOUTON PANIER
        document.getElementById("ajout-panier").addEventListener("click", function() {
            let addToBasket = localStorage.getItem("basketList");
            if(addToBasket === null) {
                addToBasket = [];
            } else {
                addToBasket = JSON.parse(addToBasket);
            };
            addToBasket.push(product);
            addToBasket = JSON.stringify(addToBasket);
            localStorage.setItem("basketList", addToBasket);
        })
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de personnalisation
viewProduct ();