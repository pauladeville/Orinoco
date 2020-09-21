//Création de la fonction de personnalisation de la page produit
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
        //Ajout des infos sur la page, en fonction de l'URL contenant l'ID du produit
        for (let i = 0; i < products.length; i += 1) {
            if (window.location.href.includes(products[i]._id)) {
                document.getElementById("titre-produit").textContent = products[i].name;
                document.getElementById("prix-produit").textContent = `${products[i].price / 100} €`;
                document.getElementById("img-produit").setAttribute("src", products[i].imageUrl);
                document.getElementById("description-produit").textContent = products[i].description;
                for (let opt = 0; opt < products[i].lenses.length; opt += 1) {
                    document.querySelector(".data-option" + opt).classList.replace("d-none", "d-block");
                    document.querySelector(".data-option" + opt).textContent = products[i].lenses[opt];
                }
                
            };
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de personnalisation
viewProduct ();



