// Récupération des données catégories via l'API
async function dataCategories () {
    let dataCategories = await fetch("http://localhost:5678/api/categories")
    let categories = await dataCategories.json()
    return categories
}
//Fonction de création des balises principales dans la balise id portfolio
function creationDomPortfolio (){
    const elemPortfolio = document.getElementById("portfolio")
    elemPortfolio.innerHTML=""
    const elemH2 = document.createElement("h2")
    elemH2.innerText = "Mes Projets"
    const elemFiltres = document.createElement("div")
    elemFiltres.classList.add("filtres")
    const elemGallery = document.createElement("div")
    elemGallery.classList.add("gallery")
    elemPortfolio.appendChild(elemH2)
    elemPortfolio.appendChild(elemFiltres)
    elemPortfolio.appendChild(elemGallery)
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
async function GetWorks(mesFiltres){
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()
    if (mesFiltres === "Tous") {
        return Listes
    } else {
        const ListesFiltrees = Listes.filter(function (projet){
            return projet.category.name === mesFiltres
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
        if (retourfiltre === "Tous") {
            supClassSelection()
            event.target.classList.add("selection")
            ListeProjets(retourfiltre)
        } else {
            supClassSelection()
            event.target.classList.add("selection")
            ListeProjets(retourfiltre)
        }
    }
})
//Fonction permettant de supprimer la class "selection" des boutons filtres
function supClassSelection() {
    const mesFiltres = document.querySelectorAll(".btnFiltres")
    for (let i = 0; i < mesFiltres.length; i++) {
        mesFiltres[i].classList.remove("selection")
    }
}
