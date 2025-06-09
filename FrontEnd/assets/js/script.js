async function getWorks() { //!partie 1, importation des données
    const url = "http://localhost:5678/api/works";// URL de l'API pour récupérer les œuvres
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        for (let i = 0; i < json.length; i++) {// Boucle pour parcourir les œuvres récupérées
          setFigure(json[i]); // Appel de la fonction pour créer la figure avec les données récupérées  
        }
    } catch (error) {
        console.error(error.message);
    }
}

getWorks();// Appel de la fonction pour récupérer les œuvres

//!partie 2, création de la figure

function setFigure(data) { // Fonction pour créer une figure avec les données d'une œuvre
const figure = document.createElement("figure");// Création d'un élément figure pour chaque œuvre
figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}">
<figcaption>${data.title}</figcaption>`;

document.querySelector(".gallery").append(figure); // Ajout de la figure au corps du document
}