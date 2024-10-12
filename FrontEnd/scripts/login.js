//Récupération des éléments du formulaire
const formulaireLogin = document.querySelector("#login form")
const saisieEmail = document.getElementById("email")
const saisiePassword = document.getElementById("password")

// Lancement fonction sur soummission formulaire
formulaireLogin.addEventListener("submit", async function (event) {
    event.preventDefault()
    //On crée l'objet de saisie email et password
    const postLogin = {
        email: saisieEmail.value,       // sophie.bluel@test.tld
        password: saisiePassword.value  // S0phie
    }
    //On crée l'objet de la charge utile
    const chargeUtile = JSON.stringify(postLogin)

    //On envoie à l'aide de fetch
    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "accept": "application/json",
            "Content-Type": "application/json" },
        body: chargeUtile
    })
    
    //On convertir la réponse en json
    .then((reponseServeur) => {
        console.log("toto")
        return reponseServeur.json()
    })
    //On récupère les données dans le localStorage
    .then ((donneesFichier) => {
        console.log("t7to")
        const monId = donneesFichier.userId
        const monToken = donneesFichier.token
        localStorage.setItem("monId:", monId)
        localStorage.setItem("monToken:", monToken)
    })
    .catch((error) => {
        // Affiche l'erreur dans une boîte de dialogue système
        console.log("to")
        const messerror = error.message
        alert("Erreur : " + messerror);
    })
})







