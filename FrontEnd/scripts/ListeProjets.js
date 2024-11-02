//Déclaration variable
let logout = document.querySelector(".logout")
/*On regarde si le localstorage contient le token*/
let monToken = dataToken()
//Vérification du token
function dataToken(){
    return window.localStorage.getItem("monToken")
}
// Récupération des données catégories via l'API
async function dataCategories () {
    let dataCategories = await fetch("http://localhost:5678/api/categories")
    let categories = await dataCategories.json()
    return categories
}
//Fonction de création des balises principales dans la balise id portfolio
function creationDomPortfolio (){
    let login = document.querySelector(".login")
    const elemPortfolio = document.getElementById("portfolio")
    elemPortfolio.innerHTML=""
    if (monToken === undefined || monToken === null){
        login.classList.remove("invisible")
        logout.classList.add("invisible")
        elemPortfolio.innerHTML=`
        <div class="projets">   
            <h2>Mes projets</h2>
        </div>
        <div class="filtres"></div>
        <div class="gallery"></div>`
    } else {
        logout.classList.remove("invisible")
        login.classList.add("invisible")
        elemPortfolio.innerHTML=`
        <div class="projets">   
            <h2>Mes projets</h2>
            <a href="" title="Modification" class="modifs">
                <i class="fa-regular fa-pen-to-square"></i>
                <p>modifier</p>
            </a>
        </div>
        <div class="filtres invisible"></div>
        <div class="gallery"></div>`
    }
}
//****Cette partie de code me permet de créer la liste des catégories pour création des boutons filtre************
async function ListeCategories() {

    let Categories = await dataCategories()

    //Récupération de la balise dans laquelle créer les boutons de filtres
    const elemFiltres = document.querySelector(".filtres")

    //Création du bouton Tous
    const btnTous = document.createElement("button")
    btnTous.classList.add("btnFiltres", "selection")
    btnTous.innerText = "Tous"
    elemFiltres.appendChild(btnTous)

    //On crée une boucle pour créer les élements du DOM
    for (let i = 0; i < Categories.length; i++){   
        const btnCategories = document.createElement("button")
        btnCategories.classList.add("btnFiltres")
        btnCategories.innerText = Categories[i].name
        elemFiltres.appendChild(btnCategories)
    }
}
// //Récupération des données Projets via l'API
async function GetWorks(autres){
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()
    if (autres === "Tous") {
        return Listes
    } else {
        const ListesFiltrees = Listes.filter(function (projet){
            return projet.category.name === autres
        })
        return ListesFiltrees
    }
}
//************************Cette partie de code me permet d'afficher dynamiquement tous les projets*****************
async function ListeProjets(mesFiltres) {

    const Listes = await GetWorks(mesFiltres)

    //On récupère la balise classe gallery
    const ElemGallery = document.querySelector(".gallery")
    ElemGallery.innerHTML = ""

    //On crée une boucle pour créer les élements du DOM
    for (let i = 0; i < Listes.length; i++){   
        const elemFigure = document.createElement("figure")
        const elemImg = document.createElement("img")
        elemImg.src = Listes[i].imageUrl
        const elemFigcaption = document.createElement("figcaption")
        elemFigcaption.innerText = Listes[i].title
        elemFigure.appendChild(elemImg)
        elemFigure.appendChild(elemFigcaption)
        ElemGallery.appendChild(elemFigure)
    }
}

//*********************Ouverture de la page**********************************************/
creationDomPortfolio()
ListeCategories()
ListeProjets("Tous")

//*********************Création des fonctions de filtres et tris*************************/
const choixFiltre = document.querySelector(".filtres")
choixFiltre.addEventListener("click", async (event) => {
    event.preventDefault()
    if (event.target.classList.contains("btnFiltres")) {
        const retourfiltre = event.target.innerText
        supClassSelection()
        ListeProjets(retourfiltre)
        event.target.classList.add("selection")
    }
})
//Fonction permettant de supprimer la class "selection" des boutons filtres
function supClassSelection() {
    const mesFiltres = document.querySelectorAll(".btnFiltres")
    for (let i = 0; i < mesFiltres.length; i++) {
        mesFiltres[i].classList.remove("selection")
    }
}
//Déconnexion
logout.addEventListener("click", (e) => {
    e.preventDefault()
    window.localStorage.removeItem("monToken")
    window.location.href = "index.html"
})
//Ouverture de l'overlay
document.querySelector(".modifs").addEventListener ("click", (e) => {
    e.preventDefault()
    let overlay = document.querySelector(".overlay")
    overlay.classList.remove("invisible")
    overlay.innerHTML = ""
    overlay.innerHTML = ouvreOverlaySuppr()
})
//Fermeture de l'overlay en cliquant sur la partie grisée ou  sur la croix
document.querySelector(".overlay").addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.classList.contains("overlay") || e.target.classList.contains("fermeture")) {
        document.querySelector(".overlay").classList.add("invisible")
    }
})
// //Bascule vers l'overlay ajout photo
// document.querySelector(".ajoutPhoto").addEventListener ("click", (e) => {
//     e.preventDefault()
//     document.querySelector(".suppr").classList.add("invisible")
//     document.querySelector(".ajout1").classList.remove("invisible")
// })
// //Fonction remplissage overlay suppr
function ouvreOverlaySuppr() {
    let monEntete = `
        <div class="overlaycontenu suppr">
			<div class="icones">
				<a href="" alt="Retour" title="Retour" class="invisible"><i class="fa-solid fa-arrow-left retour"></i></a>
				<a href="" alt="Fermer fenêtre" title="Fermer fenêtre"><i class="fa-solid fa-xmark fermeture"></i></a>
			</div>
            <section class="over galerie">
				<h3>Galerie photo</h3>
				<div class="overlay-figure">
    `
    let leReste = `
				</div>
				<a href="" alt="Ajouter une photo" title="Ajouter une photo" class="btnSupprProjet">Ajouter une photo</a>
			</section>
		</div>
    `
    return monEntete + overlayProjets("Tous") + leReste
}
//Fonction appel API pour génération DOM overlay suppr
async function overlayProjets(mesFiltres) {

    const Listes = await GetWorks(mesFiltres)

    //On récupère la balise classe overlay-figure
    let ElemGallery = document.querySelector(".overlay-figure")
    ElemGallery.innerHTML = ""

    //On crée une boucle pour créer les élements du DOM
    for (let i = 0; i < Listes.length; i++){ 
        const elemFigure = document.createElement("figure")
        elemFigure.setAttribute("data-id", Listes[i].id)
        const elemImg = document.createElement("img")
        elemImg.classList.add("smallfigure")
        elemImg.src = Listes[i].imageUrl
        const a = document.createElement("a")
        a.setAttribute("href", "")
        a.classList.add("trash")
        const elemTrash = document.createElement("i")
        elemTrash.classList.add("fa-solid", "fa-trash-can")
        elemTrash.addEventListener("click", () => {
            let idProjet = Listes[i].id
            supprProjet(idProjet)
        })
        elemFigure.appendChild(elemImg)
        elemFigure.appendChild(a)
        a.appendChild(elemTrash)
        ElemGallery.appendChild(elemFigure)
    }
}
//Fonction de suppression d'un projet
async function supprProjet (e, idProjet) {
    let figureId = e.target.dataset.id
    console.log(idProjet)
    console.log(figureId)
    for (let i = 0; i < figureId.length; i++) {
        if (figureId[i].dataset.id === idProjet){
            console.log("tt")
        }
    }
    // if (monToken !== undefined || monToken !== null){
    //     const deleteProjet = await fetch(`http://localhost:5678/api/works/${idProjet}`, {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${monToken}`,
    //         },
    //     })
    // }
}


