/*DECLARATIONS VARIABLES ET FONCTIONS ASSOCIEES*************************************************************/

let logout = document.querySelector(".logout")
//Vérification du token
function dataToken(){
    return window.localStorage.getItem("monToken")
}
//Récupération des données Projets via l'API
async function GetWorks(autres){
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()
    if (autres === "Tous") {
        return Listes
    } else {
        const ListesF = Listes.filter(function (projet) {
        return projet.category.name === autres
    })
        return ListesF
    }
}
// Récupération des données catégories via l'API
async function dataCategories () {
    try {
        let dataCategories = await fetch("http://localhost:5678/api/categories")
        let categories = await dataCategories.json()
        return categories
    } catch (error) {
        console.log(error)
        console.error(error)
    }
}

/**********************************************************************************************************/




/*FONCTIONS DE CREATION DU DOM A L'OUVERTURE DE LA PAGE*****************************************************/

//Fonction de création des balises principales dans la balise id portfolio
function creationDomPortfolio (){
    let monToken = dataToken()
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
        <div class="gallery"></div>
        `
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

    const Categories = await dataCategories()

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
//Cette partie de code me permet d'afficher dynamiquement tous les projets
async function ListeProjets(mesFiltres) {

    const Listes = await GetWorks(mesFiltres)

    //On récupère la balise classe gallery
    const ElemGallery = document.querySelector(".gallery")
    ElemGallery.innerHTML = ""

    //On crée une boucle pour créer les élements du DOM
    for (let i = 0; i < Listes.length; i++){   
        const elemFigure = document.createElement("figure")
        elemFigure.setAttribute("data-id", Listes[i].id)
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

//Bascule vers l'overlay suppr projets
function ouvreOverlaySuppr() {
    let overlayForm = document.querySelector(".overlayForm")
    overlayForm.classList.add("invisible")
    overlayForm.innerHTML = ""
    let overlay = document.querySelector(".overlay")
    overlay.classList.remove("invisible")
    overlay.innerHTML = `
        <div class="overlaycontenu">
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
    fermeOverlay()
    ouvreOverlayForm ()
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
        elemTrash.addEventListener("click", (e) => {
            e.preventDefault()
            let idProjet = Listes[i].id
            supprProjet(idProjet)
            supprFigureProjet (idProjet)
        })
        elemFigure.appendChild(elemImg)
        elemFigure.appendChild(a)
        a.appendChild(elemTrash)
        ElemGallery.appendChild(elemFigure)
    }
}
//Fonctions de suppression d'un projet
async function supprProjet (idProjet) {
    let monToken = dataToken()
    if (monToken !== undefined || monToken !== null){
        const deleteProjet = await fetch(`http://localhost:5678/api/works/${idProjet}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${monToken}`,
            },
        })
    }
}
function supprFigureProjet (idProjet) {
    let figureProjet = document.querySelectorAll("figure")
    for (let i = 0; i < figureProjet.length; i++) {
        if (figureProjet[i].dataset.id == idProjet) {
            figureProjet[i].remove()
        }
    }
}
//Fonction ouvre l'overlayForm pour ajout de projets sur la balise permettant d'ajouter une photo
function ouvreOverlayForm () {
    let ouvreOverlayForm = document.querySelector(".btnSupprProjet").addEventListener ("click", (e) => {
    e.preventDefault()
    let overlay = document.querySelector(".overlay")
    overlay.classList.add("invisible")
    overlay.innerHTML = ""
    let overlayForm = document.querySelector(".overlayForm")
    overlayForm.classList.remove("invisible")
    overlayForm.innerHTML = `
        <div class="overlaycontenu">
            <div class="iconesajout">
                <a href="" alt="Retour" title="Retour"><i class="fa-solid fa-arrow-left retour"></i></a>
                <a href="" alt="Fermer fenêtre" title="Fermer fenêtre"><i class="fa-solid fa-xmark fermeture"></i></a>
            </div>
            <section class="over galerie">
                <h3>Ajout photo</h3>
                <div class="overlay-formAjout">
                    <form action="" method="post">
                        <div class="bordure-bas">
                            <div class="cadreAjout">
                                <div class="imgProjetAjout invisible"><img src="" alt="" title=""></div>
                                <i class="fa-regular fa-image i-image"></i>
                                <div class="file-hidden">
                                    <label for="monfichier" class="picture">+ Ajouter photo</label>
                                    <input type="file" name="file" id="monfichier" accept="image/jpeg, image/png" required hidden>
                                </div>
                                <p class="taille-image">jpg. png. : 4mo max</p>
                            </div>
                            <div class="form-saisie">
                                <label for="titre">Titre</label>
                                <input type="text" name="Titre" id="titre" class="zoneAjout" required/>
                            </div>
                            <div class="form-saisie">
                                <label for="categorie">Catégorie</label>
                                <select type="select" name="Catégorie" id="categorie" class="zoneAjout" required></select>
                            </div>
                        </div>
                        <input type="submit" value="Valider" class="ajoutPhoto" disabled>
                    </form>
                </div>
            </section>
        </div>
    `
    fermeOverlayForm()
    retourOverlay()
    listeDerCategories ()
    postNewProject()
    ajouterPhoto()
    ajoutTitre()
    ajoutCategorie()
    })
    return ouvreOverlayForm
}
//Fonction liste déroulante catégories
async function listeDerCategories () {
    
    const Categories = await dataCategories()
    //Récupération de la balise dans laquelle créer les boutons option
    const idCategories = document.getElementById("categorie")
    const vide = document.createElement("option")
    vide.setAttribute("value", "")
    vide.innerText = ""
    idCategories.appendChild(vide)

    //On crée une boucle pour créer les élements du DOM
    for (let i = 0; i < Categories.length; i++){   
        const optionCategories = document.createElement("option")
        optionCategories.setAttribute("value", Categories[i].id)
        optionCategories.innerText = Categories[i].name
        idCategories.appendChild(optionCategories)
    }
}
//Fonction + Ajouter photo
function ajouterPhoto() {
    let btnAjouterPhoto = document.getElementById("monfichier").addEventListener("input", (e) => {
        let maphotofile = document.getElementById("monfichier").files[0]
        //Vrai et vrai, vrai ou faux --> Le && permet de verifier que toutes les conditions sont vraies
        if ((maphotofile.type === "image/jpeg" || maphotofile.type === "image/png") && maphotofile.size <= 4 * 1024 * 1024) {
            let maPhoto = document.querySelector(".imgProjetAjout")
            maPhoto.classList.remove("invisible")
            if (e.target.files[0]) {
                maPhoto.querySelector("img").src = window.URL.createObjectURL(e.target.files[0])
                document.querySelector(".cadreAjout i").remove()
                document.querySelector(".file-hidden").classList.add("invisible")
                document.querySelector(".taille-image").remove()
                document.querySelector(".cadreAjout").classList.add("paspadding")
                document.getElementById("titre").focus()
                checkFormOkay ()
            }
        } else {
            document.querySelector(".taille-image").classList.add("taille-image-not-ok")
            document.querySelector(".taille-image").innerText = "Veuillez respecter le format et la taille du fichier : jpg. png. : 4mo max"
        }
    })
    return btnAjouterPhoto
}
//Fonction ajouter Titre
function ajoutTitre() {
    let monAjoutTitre = document.getElementById("titre").addEventListener("change", () => {
        if (document.getElementById("titre").value !== "") {
            checkFormOkay ()
        }
    })
    return monAjoutTitre
}
//Fonction ajouter Catégorie
function ajoutCategorie() {
    let monAjoutCategorie = document.getElementById("categorie").addEventListener("change", () => {
        if (document.getElementById("categorie").value !== "") {
            checkFormOkay ()
        }
    })
    return monAjoutCategorie
}
//Fonction de vérification que le formulaire est bien rempli
function checkFormOkay () {
    let btnAjouterPhoto = document.getElementById("monfichier")
    let monAjoutTitre = document.getElementById("titre")
    let monAjoutCategorie = document.getElementById("categorie")

    if (btnAjouterPhoto.files.length > 0 && monAjoutTitre.value !== "" && monAjoutCategorie.value !== "") {
        document.querySelector(".ajoutPhoto").disabled = false
        document.querySelector(".ajoutPhoto").classList.add("valideForm")
    }
}
//function post nouveau projet
function postNewProject() {
    //Récupération du formulaire    
    let formulaireAjout = document.querySelector(".overlay-formAjout form").addEventListener("submit", async (event) => {
        event.preventDefault()

        let monToken = dataToken()
        let maPhoto = document.getElementById("monfichier")
        let titre = document.getElementById("titre")
        let categorie = document.getElementById("categorie")

        const formData = new FormData()
        formData.append("image", maPhoto.files[0])
        formData.append("title", titre.value)
        formData.append("category", categorie.value)

        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${monToken}`,
            },
            body: formData,
        })
        ListeProjets("Tous")
        document.querySelector(".overlayForm").innerHTML = ""
        document.querySelector(".overlayForm").classList.add("invisible")
        document.querySelector(".overlay").innerHTML = ""
        document.querySelector(".overlay").classList.add("invisible")
    })
    return formulaireAjout
}
//Fermeture des overlay en cliquant sur la partie grisée ou  sur la croix
function fermeOverlay () {
    let monRetour = document.querySelector(".overlay").addEventListener("click", (e) => {
        if (e.target.classList.contains("overlay") || e.target.classList.contains("fermeture")) {
            e.preventDefault()
            document.querySelector(".overlay").innerHTML = ""
            document.querySelector(".overlay").classList.add("invisible")
            document.querySelector(".overlayForm").innerHTML = ""
            document.querySelector(".overlayForm").classList.add("invisible")
        }
    })
    return monRetour
}
function fermeOverlayForm () {
    let monRetour = document.querySelector(".overlayForm").addEventListener("click", (e) => {
        if (e.target.classList.contains("overlayForm") || e.target.classList.contains("fermeture")) {
            e.preventDefault()
            document.querySelector(".overlayForm").innerHTML = ""
            document.querySelector(".overlayForm").classList.add("invisible")
            document.querySelector(".overlay").innerHTML = ""
            document.querySelector(".overlay").classList.add("invisible")
        }
    })
    return monRetour
}
//Retour overlay ajout projet vers overlay suppr projet
function retourOverlay () {
    let retourform = document.querySelector(".retour").addEventListener("click", (e) => {
        e.preventDefault()
        fermeOverlayForm()
        ouvreOverlaySuppr()
    })
    return retourform
}
