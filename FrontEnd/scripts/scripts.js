//Récupération des fichiers JSON via API
async function GetWorks(){
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()
    return Listes
}
async function GetWorksFiltres(retourfiltre){
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()
    const ListesFiltrees = Listes.filter(function (projet){
        return projet.category.name === retourfiltre
    })
    console.log(ListesFiltrees)
    return ListesFiltrees
}
async function GetCategories(){
    const projetsCategories = await fetch("http://localhost:5678/api/categories")
    const Categories = await projetsCategories.json()
    return Categories
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
//************************Cette partie de code me permet d'afficher dynamiquement tous les projets*****************
async function ListeProjets() {

    //let filtreounon = await GetWorks()
    const Listes = await GetWorks()

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
//************************Cette partie de code me permet d'afficher dynamiquement les projets filtrés*****************
async function ListeProjetsFiltres(retourfiltre) {

    //let ListesFiltrees = await GetWorksFiltres()
    const Listes = await GetWorksFiltres(retourfiltre)

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
//****Cette partie de code me permet de créer la liste des catégories pour création des boutons filtre************
async function ListeCategories() {

    let Categories = await GetCategories()

    //Récupération de la balise dans laquelle créer les boutons de filtres
    const elemFiltres = document.querySelector(".filtres")

    //Création du bouton Tous
    const btnTous = document.createElement("button")
    btnTous.classList.add("btnFiltres")
    btnTous.innerText = "Tous"
    elemFiltres.appendChild(btnTous)

    //On crée une boucle pour créer les élements du DOM
    //J'aimerais bien ici faire avec l'id
    for (let i = 0; i < Categories.length; i++){   
        const btnCategories = document.createElement("button")
        btnCategories.classList.add("btnFiltres")
        btnCategories.innerText = Categories[i].name
        elemFiltres.appendChild(btnCategories)
    }
}

creationDomPortfolio()
ListeCategories()
ListeProjets()


//*********************Création des fonctions de filtres et tris */
    const choixFiltre = document.querySelector(".filtres")
    choixFiltre.addEventListener("click", async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const retourfiltre = event.target.innerText
        console.log(retourfiltre)
        console.log(retourfiltre)
        if (retourfiltre === "Tous") {
            ListeProjets()
        } else {
            ListeProjetsFiltres(retourfiltre)
        }
    })