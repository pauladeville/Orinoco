//*****AFFICHAGE DU PANIER*****

//Préparation du prix total du panier
let sum = 0;


//Affichage du panier
viewBasketContent = () => {
    let url = `http://localhost:3000/api/cameras/`;
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
                const produitPanier = document.createElement("div");
                document.querySelector("#panier-liste").appendChild(produitPanier);
                produitPanier.classList.add(`data-${product._id}`, "d-none");
                produitPanier.innerHTML = `<p><strong>${product.name}</strong> - ${product.price / 100} €</p>`;
            };
        }  
)}
viewBasketContent ();

document.getElementById("vider-panier").addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//Récupération de l'ID produit stocké via le bouton "Ajoutez au panier"
// let panier = JSON.parse(localStorage.getItem("basketList"));
// console.log(panier);
//     if (panier == null) {
//         document.getElementById("panier-vide").textContent = "Votre panier est vide";
//         document.getElementById("panier-liste").remove();
//     } else {
//         for (let addedProduct of panier) {
//             console.log(addedProduct);
//             document.getElementsByClassName("data-" + addedProduct).classList.replace("d-none", "d-block");
//         }
//     };        
//         ajouter 1 dans la quantité
//         mettre à jour le prix
//         mettre à jour le total
// 
//         //Augmentation du prix total du panier
//         sum = sum += product.price;
// 
//     //Affichage du prix total
//     document.getElementById("prix-total").textContent = `${sum / 100} € TTC`;


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