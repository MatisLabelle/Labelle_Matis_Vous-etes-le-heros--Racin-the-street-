let chapters = {
  debut: {
    titre: "Le concessionnaire",
    description:
      "Vous arrivez au concessionnaire de votre oncle, un endroit rempli de voitures brillantes et étincelantes. Votre oncle vous a offert une occasion unique de choisir entre trois voitures : la VW Golf GTI, l'Acura RSX et la Ford Focus RS. Chacune d'entre elles a ses propres caractéristiques et son charme particulier.",
    image: "assets/images/choix-voiture.png",
    boutons: (options = [
      {
        titre: "Acura Rsx",
        destination: "course",
      },
      {
        titre: "Golf Gti",
        destination: "course",
      },
      {
        titre: "Ford Focus Rs",
        destination: "course",
      },
    ]),
  },
  course: {
    titre: "La course",
    description:
      "Vous quittez le concessionnaire au volant de votre nouvelle voiture, le moteur ronronnant avec puissance. Alors que vous vous arrêtez à un feu rouge, une Ford Mustang se glisse à côté de vous. Le conducteur vous regarde avec un sourire espiègle et vous fait signe de la tête, suggérant une course.",
    image: "assets/images/mustang-red-light.png",
    boutons: (options = [
      {
        titre: "Oui",
        destination: "defaite",
      },
      {
        titre: "Non",
        destination: "garage",
      },
    ]),
  },
  garage: {
    titre: "La modification",
    description:
      "Après votre premier tour dans votre nouvelle bagnole, vous décidez de personnaliser davantage votre nouvelle voiture. Vous rentrez chez vous et ouvrez votre garage rempli d'outils et d'options de personnalisation. Vous avez le choix entre trois options de modification :",
    image: "assets/images/garage.png",
    boutons: (options = [
      {
        titre: "Pneus et roues",
        destination: "meet",
        clicked: false,
      },
      {
        titre: "Suspension et échappement",
        destination: "meet",
        clicked: false,
      },
      {
        titre: "Turbo et tune",
        destination: "meet",
        clicked: false,
      },
    ]),
  },
  meet: {
    titre: "La revanche",
    description:
      "Après avoir personnalisé votre voiture selon vos préférences, vous décidez de vous rendre à un rassemblement de passionnés automobiles pour montrer votre nouveau bolide. Alors que vous vous promenez parmi les voitures exposées, vous repérez la Ford Mustang et son propriétaire que vous avez rencontré plus tôt.",
    image: "assets/images/car-meet.png",
    boutons: (options = [
      {
        titre: "Oui",
        destination: "defaite",
      },
      {
        titre: "Non",
        destination: "defaite",
      },
    ]),
  },
  victoire: {
    titre: "Victoire",
    description:
      "Bravo ! Vous avez gagnez la course contre la mustang. Vous êtes maintenant un membre respecté de la communauté.",
  },
  defaite: {
    titre: "Défaite",
    description: "Vous avez perdu la course.",
    boutons: (options = [
      {
        titre: "Réessayer",
        destination: "debut",
      },
    ]),
  },
};

let titreChapitre = document.getElementById("chapitre");
let textChapitre = document.getElementById("text");
let imageChapitre = document.getElementById("image-album");
let btns = document.querySelector(".btn-pg1");

let twist = false;

function goToChapter(chapitreKey) {
  if (chapters[chapitreKey]) {
    const chapitre = chapters[chapitreKey];
    titreChapitre.textContent = chapitre.titre;
    textChapitre.textContent = chapitre.description;
    imageChapitre.src = chapitre.image;
    while (btns.firstChild) {
      btns.removeChild(btns.firstChild);
    }
    for (let i = 0; i < chapitre.boutons.length; i++) {
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = chapitre.boutons[i].titre;
      btns.appendChild(btn);
      btn.addEventListener("click", function () {
        if (
          chapitreKey === "meet" &&
          chapitre.boutons[i].titre === "Oui" &&
          twist
        ) {
          goToChapter("victoire");
        } else {
          goToChapter(chapitre.boutons[i].destination);
        }
      });
    }
  } else {
    console.log("Chapitre introuvable");
  }
}

goToChapter("debut");

let suspBtn = chapters.garage.boutons[1];
suspBtn.addEventListener("click", changeTwist());
function changeTwist() {
  twist = true;
}
