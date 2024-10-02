/*const getUsersLogin = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { email: "string", password: "string" }
})
console.log(getUsersLogin)*/

//Je ne comprends pas pourquoi je ne peux pas faire de GET sur l'API suivante :
//const getLogin = await fetch("http://localhost:5678/api/users/login")
//const resultatLogin = await getLogin.json()
//console.log(resultatLogin)


//Récupération des éléments du formulaire
const formulaireLogin = document.querySelector("#login form")
const saisieEmail = document.getElementById("email")
const saisiePassword = document.getElementById("password")

// Lancement fontion sur soummission formulaire
formulaireLogin.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log(saisieEmail.value)
    console.log(saisiePassword.value)
    //On crée l'objet de saisie email et password
    const postLogin = {
        email: saisieEmail.value,
        password: saisiePassword.value
    }
    //On crée l'objet de la charge utile
    const chargeUtile = JSON.stringify(postLogin)
    //On envoie à l'aide de fetch
    fetch("http://localhost:5678/api/users/login"), {
        method: "POST",
        headers : { "Content-Type": "application/json" },
        body: chargeUtile
    }
   });




