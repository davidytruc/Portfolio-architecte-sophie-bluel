/*DECLARATIONS VARIABLES ET FONCTIONS ASSOCIEES*************************************************************/

let logout = document.querySelector(".logout")
/*On regarde si le localstorage contient le token*/
let monToken = dataToken()
//Vérification du token
function dataToken(){
    return window.localStorage.getItem("monToken")
}
//Variable contenant les données API Catégories
let Categories = await dataCategories()
// Récupération des données catégories via l'API
async function dataCategories () {
    let dataCategories = await fetch("http://localhost:5678/api/categories")
    let categories = await dataCategories.json()
    return categories
}

/**********************************************************************************************************/




/*FONCTIONS DE CREATION DU DOM A L'OUVERTURE DE LA PAGE*****************************************************/

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
        eventModifs()
    }
}
//Ouverture de l'overlay
function eventModifs () {
    let eventModifsResult = document.querySelector(".modifs").addEventListener ("click", (e) => {
    e.preventDefault()
    ouvreOverlaySuppr()
    })
    return eventModifsResult
}
//Cette partie de code me permet de créer la liste des catégories pour création des boutons filtre
async function ListeCategories() {

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
//Cette partie de code me permet d'afficher dynamiquement tous les projets
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

/**********************************************************************************************************/




//OUVERTURE DE LA PAGE*************************************************************************************/

creationDomPortfolio()
ListeCategories()
ListeProjets("Tous")

/**********************************************************************************************************/




//DECONNEXION**********************************************************************************************/

logout.addEventListener("click", (e) => {
    e.preventDefault()
    window.localStorage.removeItem("monToken")
    window.location.href = "index.html"
})

/**********************************************************************************************************/




//CREATION DES FONCTIONS DE FILTRE*************************************************************************/

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

/**********************************************************************************************************/




//GESTION DES FENETRES MODALES*****************************************************************************/

//Fermeture de l'overlay en cliquant sur la partie grisée ou  sur la croix
document.querySelector(".overlay").addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.classList.contains("overlay") || e.target.classList.contains("fermeture")) {
        document.querySelector(".overlay").classList.add("invisible")
    }
})
//Bascule vers l'overlay ajout photo
function ouvreOverlaySuppr() {
    let overlay = document.querySelector(".overlay")
    overlay.classList.remove("invisible")
    overlay.innerHTML = `
        <div class="overlaycontenu suppr">
			<div class="icones">
				<a href="" alt="Retour" title="Retour" class="invisible"><i class="fa-solid fa-arrow-left retour"></i></a>
				<a href="" alt="Fermer fenêtre" title="Fermer fenêtre"><i class="fa-solid fa-xmark fermeture"></i></a>
			</div>
            <section class="over galerie">
				<h3>Galerie photo</h3>
				<div class="overlay-figure">
				</div>
				<a href="" alt="Ajouter une photo" title="Ajouter une photo" class="btnSupprProjet">Ajouter une photo</a>
			</section>
		</div>
    `
    overlayProjets("Tous")
    eventbtnSupprProjet ()
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
//Fonction event btnSupprProjet
function eventbtnSupprProjet () {
    let btnSupprProjet = document.querySelector(".btnSupprProjet").addEventListener ("click", (e) => {
    e.preventDefault()
    let overlay = document.querySelector(".overlay")
    overlay.classList.remove("invisible")
    overlay.innerHTML = `
        <div class="overlaycontenu">
			<div class="iconesajout">
				<a href="" alt="Retour" title="Retour"><i class="fa-solid fa-arrow-left retour"></i></a>
				<a href="" alt="Fermer fenêtre" title="Fermer fenêtre"><i class="fa-solid fa-xmark fermeture"></i></a>
			</div>
			<section class="over galerie">
				<h3>Ajout photo</h3>
				<div class="overlay-formAjout">
					<form action="" method="">
						<div class="bordure-bas">
							<div class="cadreAjout">
								<i class="fa-regular fa-image i-image"></i>
								<label class="file-hidden" for="fichier">
									<span>+ Ajouter photo</span>
									<input type="file" name="file" id="fichier">
								</label>
								<p class="taille-image">jpg. png. : 4mo max</p>
							</div>
							<div class="form-saisie">
								<label for="titre">Titre</label>
								<input type="text" name="Titre" id="titre" required />
							</div>
							<div class="form-saisie">
								<label for="categorie">Catégorie</label>
								<select type="select" name="Catégorie" id="categorie" required />
				                </select>
							</div>
						</div>
						<input type="submit" value="Valider" class="ajoutPhoto" disabled>
					</form>
				</div>
			</section>
		</div>
    `
    })
    return btnSupprProjet
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