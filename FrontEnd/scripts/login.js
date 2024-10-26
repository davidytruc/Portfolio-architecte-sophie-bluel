//Récupération des éléments du formulaire
const formulaireLogin = document.querySelector("#login form")
const saisieEmail = document.getElementById("email")
const saisiePassword = document.getElementById("password")
const supToken = document.getElementById("supToken")

// Lancement fonction sur soummission formulaire
formulaireLogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    //On crée l'objet de saisie email et password
    const postLogin = {
        email: saisieEmail.value,       // sophie.bluel@test.tld
        password: saisiePassword.value  // S0phie
    }
    //On crée l'objet de la charge utile
    const chargeUtile = JSON.stringify(postLogin)
    //On envoie à l'aide de fetch
    let datas = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { 
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: chargeUtile
    })
    let dataStorage = await datas.json()
    let erreurConnexion = document.querySelector(".erreurConnexion")
    if (dataStorage.token === undefined || dataStorage.token === null){
        saisiePassword.value = ""
        saisieEmail.value = ""
        saisieEmail.focus()
        erreurConnexion.classList.remove("invisible")
    } else {
        window.localStorage.setItem("monToken", dataStorage.token)
        window.location.href = "index.html"
    }
})









