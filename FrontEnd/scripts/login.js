//Récupération des éléments du formulaire
const formulaireLogin = document.querySelector("#login form")
const saisieEmail = document.getElementById("email")
const saisiePassword = document.getElementById("password")

// Lancement fonction sur soummission formulaire
formulaireLogin.addEventListener("submit", async (event) => {
    try {
        event.preventDefault()
        //On crée l'objet de saisie email et password
        const postLogin = {
            email: saisieEmail.value,       // sophie.bluel@test.tld
            password: saisiePassword.value  // S0phie
        }
        console.log(saisiePassword.value)
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
        return datas.json()
    } catch (error) {
        console.log("error : " + error.message)
    }

    //On convertit la réponse en json
    // .then ((reponseServeur) => {
    //     console.log("toto")
    //     return reponseServeur.json()
    // })
    // //On récupère les données dans le localStorage
    // .then ((donneesFichier) => {
    //     console.log("t7to")
    //     const monId = donneesFichier.userId
    //     const monToken = donneesFichier.token
    //     localStorage.setItem("monId:", monId)
    //     localStorage.setItem("monToken:", monToken)
    // })
})







