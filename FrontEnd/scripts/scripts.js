/*Fonction créée à la base pour vider la balise portfolio
function viderMesProjets (){
    document.getElementById("portfolio").innerHTML=""
}*/

/*Code récupéré par ChatGPT
const projetsListes = fetch("http://localhost:5678/api/works")
.then(response => response.json())  // Convertir la réponse en JSON
.then(data => {
    // Parcourir le tableau JSON et afficher certaines données
    data.forEach(item => {
        console.log("Titre:", item.title);        // Affiche le titre de chaque élément
        console.log("URL de l'image:", item.imageUrl);  // Affiche l'URL de l'image
        console.log("Catégorie:", item.category.name);  // Affiche le nom de la catégorie
    });
})
.catch(error => {
    console.error('Erreur de récupération :', error);
});*/


//************************Cette partie de code me permet d'afficher dynamiquement les projets*****************
//Mon code, question : est-ce que je peux sortir ma partie GET et la mettre dans une fonction qui retourne Listes ?
async function recupWorks() {

    //Récupération GET du local host fichier JSON
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()

    //On récupère la balise classe gallery
    const ElemGallery = document.querySelector(".gallery")

    //On crée une boucle pour créer les élements du DOM
    //J'aimerais bien ici faire avec l'id
    for (let i = 0; i < Listes.length; i++){   
        console.log(Listes[i].title)
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


// Pourquoi dans la console le bonjour apparaît avant mon console.log de ma liste de titre du fichier json ?
console.log("Bonjour")



//****Cette partie de code me permet de créer la liste des catégories pour filtre et trier les projets************
async function recupCategories() {

    //Récupération GET du local host fichier JSON
    const projetsCategories = await fetch("http://localhost:5678/api/categories")
    const Categories = await projetsCategories.json()

    //Récupération de la balise dans laquelle créer les boutons de filtres
    const elemFiltres = document.querySelector(".filtres")

    //Création du bouton Tous
    const btnTous = document.createElement("span")
    btnTous.classList.add("btnFiltres")
    btnTous.innerText = "Tous"
    elemFiltres.appendChild(btnTous)

    //On crée une boucle pour créer les élements du DOM
    //J'aimerais bien ici faire avec l'id
    for (let i = 0; i < Categories.length; i++){   
        console.log(Categories[i].name)
        const btnCategories = document.createElement("span")
        btnCategories.classList.add("btnFiltres")
        btnCategories.innerText = Categories[i].name
        elemFiltres.appendChild(btnCategories)
    }
}

//Fonction de création des balises principales dans la balise id portfolio
function domPortfolio (){
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



//Lancement des fonctions dans l'ordre du DOM
domPortfolio()
recupCategories()
recupWorks()