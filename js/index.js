//***** AFFICHAGE DES PRODUITS SUR LA HOME *****/

//Récupération de la liste des produits
getProducts = () => {
    let url = "http://localhost:3000/api/cameras/";
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }
    fetch(url, options)
    .then(response => response.json())
    .then(products => {
        //Personnalisation des cards de la home pour chaque produit du tableau
        for (let i = 0; i < products.length; i += 1) {
            document.querySelector(".data-img" + i).setAttribute("src", products[i].imageUrl);
            document.querySelector(".data-name" + i).textContent = products[i].name;
            document.querySelector(".data-description" + i).textContent = products[i].description;
            document.querySelector(".data-price" + i).textContent = `${products[i].price / 100} €`;
            //Transmission de l'ID produit avec l'URL cliquée
            document.querySelector(".data-link" + i).setAttribute("href", `produit.html?id=${products[i]._id}`);
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de récupération
getProducts();