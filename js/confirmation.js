let confirmationInfo = localStorage.getItem("reference");
console.log(confirmationInfo);
document.getElementById("reference-commande").textContent = confirmationInfo;

let confirmationPrice = localStorage.getItem("confirmationPrice");
document.getElementById("montant-final").textContent = `${confirmationPrice / 100} € TTC`;

localStorage.removeItem("basketList");