alert("connecté");

const productSoldType = furniture; //au choix furniture, cameras, teddies

//Récupérer la liste des meubles
function getProducts () {
    let url = "http://localhost:3000/api/" + productSoldType;
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    };
    let promisedList = fetch(url, options);

    promisedList
    .then(function(response) {
        console.log(response);
        if(!response.ok) {
            throw new Error("Erreur " + response.status);
        }
        let products = response.json();
        return products;
    })
    .catch(functio-n(error) {
        console.log(error);
    });
}

//Construction de la liste des produits en vente
async function allProductsList() {
    const products = getProducts();

//Création d'une card Bootstrap pour chaque produit destinée à les présenter sur la page HTML

        // for each "product" =>     

    let productSection = document.createElement("section");
        productSection.setAttribute("class", "product-section");
    let productColumn = document.createElement("div");
        productColumn.setAttribute("class", "col-12 col-md-4");
    let productCard = document.createElement("div");
        productCard.setAttribute("class", "card shadow-sm");
    let productCardImage = document.createElement("img");
        productCardImage.setAttribute("class", "card-img-top");
        productCardImage.setAttribute("src", productImg);
        productCardImage.setAttribute("alt", "Photo d'un " + productName);
    let productCardBody = document.createElement("div");
        productCardBody.setAttribute("class", "card-body");
    let productCardTitle = document.createElement("h2");
        productCardTitle.setAttribute("class", "card-title");
    let productCardDescription = document.createElement("p");
        productCardDescription.setAttribute("class", "card-text");
    let productCardPrice = document.createElement("p");
        productCardPrice.setAttribute("class", "card-text text-right");

//Hiérarchisation des éléments figurant dans les cards
    productSection.appendChild(productColumn);
    productColumn.appendChild(productCard);
    productCard.appendChild(productCardImage);
    productCard.appendChild(productCardBody);
    productCardBody.appendChild(productCardTitle);
    productCardBody.appendChild(productCardDescription);
    productCardBody.appendChild(productCardPrice);

//Déclaration des variables pour chaque attribut des produits
    let productName = product.name;
    let productID = product._id;
    let productPrice = product.productPrice;
    let productDescription = product.description;
    let productImg = product.imageURL;
