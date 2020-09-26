//*****AFFICHAGE DU PANIER*****

//Création du prix total
let totalPrice = 0;

//Création du panier
createBasket = () => {
    //Récupérer les données du webstorage
    let basket = localStorage.getItem("basketList");
    basket = JSON.parse(basket);
    console.log(basket);
    //Si le panier est vide, l'afficher comme tel
    if (basket == null) {
        document.getElementById("panier-vide").textContent = "Votre panier est vide";
        document.getElementById("panier-liste").remove();
    //Sinon afficher son contenu
    } else {
        for (let addedProduct of basket) {
            //Match des ID dans le panier avec les cellules "quantité" du tableau produit à afficher. Si la ligne correspondante existe déjà (le produit a déjà été affiché), ajouter 1 dans la quantité
            if (document.querySelector(`td.data-${addedProduct._id}`)) {
                document.querySelector(`td.data-${addedProduct._id}`).textContent ++;
                //Augmentation du prix total
                totalPrice = totalPrice += addedProduct.price;
            //Si le produit n'est pas encore affiché dans le panier (pas encore de cellule "quantité" avec son ID), créer la ligne produit dans le tableau
            } else {
                const productLine = document.createElement("tr");
                const productName = document.createElement("td");
                const productPrice = document.createElement("td");
                const productQuantity = document.createElement("td");
                const productRemove = document.createElement("td");
                //Hiérarchisation des informations à afficher
                document.querySelector("table").appendChild(productLine);
                productLine.appendChild(productName);
                productLine.appendChild(productPrice);
                productLine.appendChild(productQuantity);
                productLine.appendChild(productRemove);
                //Ajout du contenu pour chaque produit
                productName.textContent = addedProduct.name;
                productPrice.textContent = `${addedProduct.price / 100} €`;
                productQuantity.textContent = 1;
                productQuantity.classList.add(`data-${addedProduct._id}`);
                //Augmentation du prix total
                totalPrice = totalPrice += addedProduct.price;
                //Création des X pour supprimer un produit
                productRemove.innerHTML = `<strong>X</strong>`;
                productRemove.classList.add("cursor-pointer");
                //A chaque clic sur X, supprimer 1x le produit dans le panier et dans le prix total
                productRemove.addEventListener("click", function() {
                    productQuantity.textContent --;
                    basket.splice(basket.indexOf(addedProduct), 1);
                    totalPrice = totalPrice -= addedProduct.price;
                    document.getElementById("prix-total").textContent = `${totalPrice / 100} € TTC`;
                    //S'il n'y a plus d'exemplaire d'un produit, supprimer sa ligne
                    if(productQuantity.textContent == 0) {
                        productLine.remove();
                    }
                    //Si le panier est vidé, vider le localStorage
                    if(basket.length == 0) {
                        document.getElementById("panier-vide").textContent = "Votre panier est vide";
                        document.getElementById("panier-liste").remove();
                    }
                    //Sauvegarde du panier dans le localStorage avec la nouvelle quantité
                    basket = JSON.stringify(basket);
                    localStorage.setItem("basketList", basket);
                    basket = JSON.parse(basket);
                })
            }
            //Augmentation du prix total du panier à chaque ajout de produit
            document.getElementById("prix-total").textContent = `${totalPrice / 100} € TTC`;   
        }
    };  
};
createBasket();

//Bouton "vider le panier"
document.getElementById("vider-panier").addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});



//***** VALIDATION DU FORMULAIRE*****

//Instruction des regExp
let checkString = /[a-zA-Z]/;
let checkNumber = /[0-9]/;
let checkMail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
let checkSpecialCharacter = /[§!@#$%^&*();.?":{}|<>]/;

let inputFirstName = document.getElementById("first-name");
let inputSurname = document.getElementById("surname");
let inputEmail = document.getElementById("email");
let inputAddress = document.getElementById("address");
let inputCp = document.getElementById("cp");
let inputCity = document.getElementById("city");

//Remplissage automatique du champ city à partir du code postal
inputCp.addEventListener("change", function() {    
    //Requête auprès d'une API publique associant cp/communes
    let url = `https://geo.api.gouv.fr/communes?codePostal=${inputCp.value}&fields=nom&format=json&geometry=centre`;
    fetch(url)
        .then( response => response.json())
        .then( cities => {
            //Apparition du bon nombre d'options dans le champ "sville" + placement du nom des villes récupérées 
            if (cities.length == 0) {
                document.getElementById("invalid-cp").textContent = "Nous ne connaissons pas ce code postal. Vérifiez qu'il est correctement renseigné.";
            } else {
                document.getElementById("invalid-cp").textContent = "";
                for (let i = 0; i < cities.length; i += 1) {
                    document.querySelector(".data-option" + i).classList.replace("d-none", "d-block");
                    document.querySelector(".data-option" + i).textContent = cities[i].nom;
                    document.querySelector(".data-option" + i).setAttribute("value", cities[i].nom);
                }
            }
        })
        .catch( err =>
            console.log("Erreur :" + err)
        )
});

//Validation du champs du formulaire
checkInput = () => {
    //Validation du prénom
    if (checkNumber.test(inputFirstName.value) == true || checkSpecialCharacter.test(inputFirstName.value) == true || inputFirstName.value == "") {
        document.getElementById("invalid-first-name").textContent = "Votre prénom ne doit pas comporter de chiffre ou de caractères spéciaux";
        return false;
    } else {
        document.getElementById("invalid-first-name").textContent = "";
    }
    //Validation du nom
    if (checkNumber.test(inputSurname.value) == true || checkSpecialCharacter.test(inputSurname.value) == true || inputSurname.value == "") {
        document.getElementById("invalid-surname").textContent = "Votre nom ne doit pas comporter de chiffre ou de caractères spéciaux";
        return false;
    } else {
        document.getElementById("invalid-surname").textContent = "";
    }
    //Validation de l'email
    if (checkMail.test(inputEmail.value) == false || inputEmail.value == "") {
        document.getElementById("invalid-email").textContent = "Merci de renseigner une adresse email valide";
        return false;
    } else {
        document.getElementById("invalid-email").textContent = "";
    }
    //Validation de l'adresse
    if (checkString.test(inputAddress.value) == false ||checkNumber.test(inputAddress.value) == false || checkSpecialCharacter.test(inputAddress.value) == true || inputAddress.value == "") {
        document.getElementById("invalid-address").textContent = "Veuillez vérifier votre adresse";
        return false;
    } else {
        document.getElementById("invalid-address").textContent = "";
    }
    //Validation de la ville
    if (inputCity.value == "") {
        document.getElementById("invalid-city").textContent = "Renseignez votre code postal et sélectionnez au moins une ville";
        return false;
    } else {
        document.getElementById("invalid-city").textContent = "";
    }
}

//Vérification du panier
checkBasket = () => {
    let checkBasket = localStorage.getItem("basketList");
    checkBasket = JSON.parse(checkBasket);
    if (checkBasket === null) {
        alert("Vous n'avez aucun article dans votre panier");
    } else if (checkBasket.length == 0) {
        alert("Vous n'avez aucun article dans votre panier");
    } else {
        return true;
    }    
}

let contactUser;
let productsOrdered = [];

//Création de l'objet à envoyer au clic sur le formulaire
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    //Si formulaire et panier OK, création de l'objet "coordonnées" du client
    if (checkInput() !== false && checkBasket() == true) {
        contactUser = {
            firstName: inputFirstName.value,
            lastName: inputSurname.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
        };
        //Récupération des ID des produits du panier
        let basketFinal = localStorage.getItem("basketList");
        basketFinal = JSON.parse(basketFinal);
        for (let product of basketFinal) {
            productsOrdered.push(product._id)
        }
        //Ajout des éléments dans l'objet destiné à l'API
        let dataToSend = {contactUser, productsOrdered};
        console.log(dataToSend);
        sendOrder(dataToSend);
    }
});

//Déclaration de la fonction d'envoi
sendOrder = (objectRequest) => {
    let url = "http://localhost:3000/api/cameras/order";
    let options = {
        method: "POST",
        body: JSON.stringify(objectRequest),
        headers: {
            "Content-type": "application/JSON"
        },
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error));
};