const inputCode = document.getElementById("cp");

inputCode.addEventListener('change', function() {
    let url = `https://geo.api.gouv.fr/communes?codePostal=${inputCode.value}&fields=nom&format=json&geometry=centre`;

    fetch(url)
        .then( response => response.json())
        .then( cities => {
            console.log(cities);
            for (let x = 0; x < cities.length; x += 1) {
                document.querySelector(".data-option" + x).classList.replace("d-none", "d-block");
                document.querySelector(".data-option" + x).textContent = cities[x].nom;
                document.querySelector(".data-option" + x).setAttribute("value", cities[x].nom);
            }
        })
        .catch( err =>
            console.log("Erreur :" + err)
        )
});