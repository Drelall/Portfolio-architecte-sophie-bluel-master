//?Etape 1.2 les projets qui s'affichent, gallerie en provenance du backend

//!partie 1, importation des données

async function getWorks(filter) {
  document.querySelector(".gallery").innerHTML= ""; // Réinitialisation de la galerie avant de charger les œuvres
  const url = "http://localhost:5678/api/works"; // URL de l'API pour récupérer les œuvres
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (filter) {
      const filtered = json.filter((data) => data.categoryId === filter); // Filtrage des œuvres par catégorie si un filtre est spécifié
      for (let i = 0; i < filtered.length; i++) {
        setFigure(filtered[i]); // Appel de la fonction pour créer une figure avec les données récupérées
    }
  } else{
    for (let i = 0; i < json.length; i++) {
        setFigure(json[i]); // Appel de la fonction pour créer une figure avec les données récupérées
    }
  }
    
  } catch (error) {
    console.error(error.message);
  }
}
getWorks(); // Appel de la fonction pour récupérer les œuvres et les afficher dans la galerie


//!partie 2, création de la figure


function setFigure(data) {
  // Fonction pour créer une figure avec les données d'une œuvre
  const figure = document.createElement("figure"); // Création d'un élément figure pour chaque œuvre
  figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}">
<figcaption>${data.title}</figcaption>`;

  document.querySelector(".gallery").append(figure); // Ajout de la figure au corps du document
}

//?la possibilité de filtrer la galerie par catégorie de projet, qui aura été généré dynamiquement.

async function getCategories() {
  const url = "http://localhost:5678/api/categories"; // URL de l'API pour récupérer les catégories
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      // Boucle pour parcourir les catégories récupérées
      setFilter(json[i]); // Appel de la fonction pour créer le filtre avec les données récupérées
    }
  } catch (error) {
    console.error(error.message);
  }
}
getCategories(); // Appel de la fonction pour récupérer les catégories

function setFilter(data) {// Fonction pour créer un filtre avec les données d'une catégorie
  console.log(data);
  const div = document.createElement("div");
  div.className = data.id; // Ajout de la classe correspondant à l'id de la catégorie
  div.addEventListener("click", () => getWorks(data.id)); 
  div.innerHTML = `${data.name}`;
  document.querySelector(".div-container").append(div);
}
document.querySelector(".tous").addEventListener('click', () =>getWorks()); // Ajout d'un écouteur d'événement pour afficher une alerte lors du clic sur le bouton "Tous"


//?fin : Etape 1.2 les projets qui s'affichent, gallerie en provenance du backend
