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
let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
let checkSpecialCharacter = /[§!@#$%^&*();.?":{}|<>]/;

//Déclaration des fonctions de test
const validName = function(inputName) {
    //Récupération de la balise small pour afficher des indications sur le format attendu
    let indication = inputName.nextElementSibling;
    if (checkNumber.test(inputName.value) == true || checkSpecialCharacter.test(inputName.value) == true) {
        indication.classList.add("d-block");
        indication.textContent = "Ne peut pas contenir des chiffres ou des caractères spéciaux";
        indication.style.color = "#DC3545";
    } else {
        indication.classList.replace("d-block", "d-none");
        return true;
    }
}
//Test de l'email
const validEmail = function(inputEmail) {
    //Récupération de la balise small et personnalisation des messages
    let indication = inputEmail.nextElementSibling;
    if (checkMail.test(inputEmail.value) == false) {
        indication.classList.add("d-block");
        indication.textContent = "Merci d'indiquer une adresse email valide";
        indication.style.color = "#DC3545";
    } else {
        indication.classList.replace("d-block", "d-none");
        return true;
    }
}
//Test de l'adresse
const validAddress = function(inputAddress) {
    //Récupération de la balise small pour afficher des indications sur le format attendu
    let msg;
    let valid = false;
    if (inputAddress.value.length < 5) {
        msg = "L'adresse doit contenir au moins 5 caractères";
    } else if (checkNumber.test(inputAddress.value) == false) {
        msg = "Vous n'avez pas précisé le numéro de votre adresse";
    } else if (checkSpecialCharacter.test(inputAddress.value) == true) {
        msg = "L'adresse ne doit pas comporter de caractères spéciaux";
    } else {
        valid = true;
    }
    let indication = inputAddress.nextElementSibling;
    if (!valid) {
        indication.classList.add("d-block");
        indication.textContent = msg;
        indication.style.color = "#DC3545";
    } else {
        indication.classList.replace("d-block", "d-none");
        return true;
    }
}
//Test du code postal
const validCp = function(inputCp) {
    let indication = inputCp.nextElementSibling;
    if (inputCp.value.length !== 5 || checkNumber.test(inputCp.value) == false) {
        indication.classList.add("d-block");
        indication.textContent = "Votre code postal doit comporter 5 chiffres";
        indication.style.color = "#DC3545";
    } else {
        indication.classList.replace("d-block", "d-none");
    }
}
//Test de la ville (au moins une option sélectionnée)
const validCity = function(inputCity) {
    let indication = inputCity.nextElementSibling;
    if (inputCity.value.length = 0) {
        indication.classList.add("d-block");
        indication.textContent = "Vous devez sélectionner une ville";
        indication.style.color = "#DC3545";
    } else {
        indication.classList.replace("d-block", "d-none");
        return true;
    }
}

//Appel des fonctions de test
document.getElementById("firstName").addEventListener("change", function() {
    validName(this);
})
document.getElementById("lastName").addEventListener("change", function() {
    validName(this);
})
document.querySelector("#email").addEventListener("change", function() {
    validEmail(this);
})
document.getElementById("address").addEventListener("change", function() {
    validAddress(this);
})
const inputCode = document.getElementById("cp");
inputCode.addEventListener('change', function() {
    validCp(this) });
//Remplissage automatique du champ city à partir du code postal
inputCode.addEventListener('change', function() {
    //Requête auprès d'une API publique associant cp/communes
    let url = `https://geo.api.gouv.fr/communes?codePostal=${inputCode.value}&fields=nom&format=json&geometry=centre`;
    fetch(url)
        .then( response => response.json())
        .then( cities => {
            let indication = inputCode.nextElementSibling;
            //Apparition du bon nombre d'options dans le champ "sville" + placement du nom des villes récupérées 
            if (cities.length == 0) {
                indication.classList.add("d-block");
                indication.textContent = "Nous ne connaissons pas ce code postal.";
                indication.style.color = "#DC3545";
            } else {
                indication.classList.replace("d-block", "d-none");
                for (let x = 0; x < cities.length; x += 1) {
                    document.querySelector(".data-option" + x).classList.replace("d-none", "d-block");
                    document.querySelector(".data-option" + x).textContent = cities[x].nom;
                    document.querySelector(".data-option" + x).setAttribute("value", cities[x].nom);
                }
            }
        })
        .catch( err =>
            console.log("Erreur :" + err)
        )
});
document.getElementById("city").addEventListener("change", function() {
    validCity(this);
})

//Ecouter la soumission du formulaire
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let indications = document.querySelectorAll("small");
    if (
        validName(document.getElementById("firstName")) 
        && validName(document.getElementById("lastName"))
        // && validEmail(document.getElementById("email"))
        && validAddress(document.getElementById("address"))
        && validCity(document.getElementById("city"))
    ) {
        form.submit();
    } else {
        alert("Vous n'avez pas terminé de remplir le formulaire :)");
    }
}); 