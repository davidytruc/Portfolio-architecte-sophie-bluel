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


//Mon code qui ne marche pas
async function recupWorks() {

    //Récupération GET du local host fichier JSON
    const projetsListes = await fetch("http://localhost:5678/api/works")
    const Listes = await projetsListes.json()

    //On vide la balise classe portfolio et on ajoute dans la foulée le titre Mes Projets
    const ElemGallery = document.getElementById("gallery")
    ElemGallery.innerHTML = ""

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

recupWorks()
