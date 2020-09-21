const productSoldType = "cameras"; //au choix furniture, cameras, teddies

//Récupérer la liste des produits
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
        for (let p = 0; p < products.length; p += 1) {
            document.querySelector(".data-img" + p).setAttribute("src", products[p].imageUrl);
            document.querySelector(".data-name" + p).textContent = products[p].name;
            document.querySelector(".data-description" + p).textContent = products[p].description;
            document.querySelector(".data-price" + p).textContent = `${products[p].price / 100} €`;
        }
    })
    .catch(error => console.log(error));
};
getProducts ();
