function viderMesProjets (){
    document.getElementById("portfolio").innerHTML=""
}

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
    const projetsListes = await fetch("http://localhost:5678/api/works");
    const Listes = await projetsListes.json();
    for (let i = 0; i < Listes.length; i++){
        console.log(Listes[i].title)
    }
}

recupWorks()
