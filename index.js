const productSoldType = "cameras"; //au choix furniture, cameras, teddies

//Création de la fonction de récupération de la liste des produits
function getProducts () {
    let url = "http://localhost:3000/api/" + productSoldType;
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }
    fetch(url, options)
    .then(response => response.json())
    .then(products => {
        console.log(products);
        //Personnalisation des cards de la home pour chaque produit du tableau
        for (let p = 0; p < products.length; p += 1) {
            document.querySelector(".data-img" + p).setAttribute("src", products[p].imageUrl);
            document.querySelector(".data-name" + p).textContent = products[p].name;
            document.querySelector(".data-description" + p).textContent = products[p].description;
            document.querySelector(".data-price" + p).textContent = `${products[p].price / 100} €`;
            //Créer une URL personnalisée vers la page produit
            document.querySelector(".data-img" + p).setAttribute("href", `produit/${products[p]._id}`);
        }
    })
    .catch(error => console.log(error));
};
//Appel de la fonction de récupération des produits
getProducts ();
