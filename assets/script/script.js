// création des chapitres
const chapters = {
  debut: {
    titre: "Le concessionnaire",
    description:
      "Vous arrivez au concessionnaire de votre oncle, un endroit rempli de voitures brillantes et étincelantes. Votre oncle vous a offert une occasion unique de choisir entre trois voitures : la VW Golf GTI, l'Acura RSX et la Ford Focus RS. Chacune d'entre elles a ses propres caractéristiques et son charme particulier.",
    image: "assets/images/choix-voiture.png",
    boutons: [
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
    ],
  },
  course: {
    titre: "La course",
    description:
      "Vous quittez le concessionnaire au volant de votre nouvelle voiture, le moteur ronronnant avec puissance. Alors que vous vous arrêtez à un feu rouge, une Ford Mustang se glisse à côté de vous. Le conducteur vous regarde avec un sourire espiègle et vous fait signe de la tête, suggérant une course.",
    image: "assets/images/mustang-red-light.png",
    boutons: [
      {
        titre: "Oui",
        destination: "defaite",
      },
      {
        titre: "Non",
        destination: "garage",
      },
    ],
  },
  garage: {
    titre: "La modification",
    description:
      "Après votre premier tour dans votre nouvelle bagnole, vous décidez de personnaliser davantage votre nouvelle voiture. Vous rentrez chez vous et ouvrez votre garage rempli d'outils et d'options de personnalisation. Vous avez le choix entre trois options de modification :",
    image: "assets/images/garage.png",
    boutons: [
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
    ],
  },
  meet: {
    titre: "La revanche",
    description:
      "Après avoir personnalisé votre voiture selon vos préférences, vous décidez de vous rendre à un rassemblement de passionnés automobiles pour montrer votre nouveau bolide. Alors que vous vous promenez parmi les voitures exposées, vous repérez la Ford Mustang et son propriétaire que vous avez rencontré plus tôt.",
    image: "assets/images/car-meet.png",
    boutons: [
      {
        titre: "Oui",
        destination: "defaite",
      },
      {
        titre: "Non",
        destination: "defaite",
      },
    ],
    video: "assets/images/car-meet.mp4",
  },
  victoire: {
    titre: "Victoire",
    description:
      "Bravo ! Vous avez gagnez la course contre la mustang. Vous êtes maintenant un membre respecté de la communauté.",
    image: "assets/images/victoire.png",
    video: "assets/images/win.mp4",
  },
  defaite: {
    titre: "Défaite",
    description:
      "Vous avez perdu la course. Votre voiture n'était pas assez rapide.",
    image: "assets/images/defaite.png",
    boutons: [
      {
        titre: "Réessayer",
        destination: "debut",
      },
    ],
  },
};

//Récupère les éléments du HTML
let container = document.getElementById("jeu");
let titreChapitre = document.getElementById("chapitre");
let textChapitre = document.getElementById("text");
let imageChapitre = document.getElementById("image-album");
let btns = document.querySelector(".btn-pg1");

// met la twist a false
let twist = false;

// creation du son
const vroum = new Audio("assets/sons/mixkit-fast-car-drive-by-1538.wav");

// function de changement de chapitre
function goToChapter(chapitreKey) {
  if (vroum.paused) {
    vroum.play();
  } else {
    vroum.currentTime = 0;
    vroum.play();
  }

  if (chapters[chapitreKey]) {
    const chapitre = chapters[chapitreKey];

    let media = document.querySelector(".media");
    if (media) {
      container.removeChild(media);
    }

    // créer les nouveaux boutons
    function createBtn(chapitre) {
      while (btns.firstChild) {
        btns.removeChild(btns.firstChild);
      }

      for (let i = 0; i < chapitre.boutons.length; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = chapitre.boutons[i].titre;
        btns.appendChild(btn);

        // si la twist est true, et qu'on fait la course au chapitre meet, nous envoie à la victoire
        btn.addEventListener("click", function () {
          if (
            chapitreKey === "meet" &&
            chapitre.boutons[i].titre === "Oui" &&
            localStorage.getItem("twist") == "true"
          ) {
            goToChapter("victoire");
          } else {
            goToChapter(chapitre.boutons[i].destination);
          }

          // met la twist à true si on choisit suspension et échappement
          if (
            chapitreKey === "garage" &&
            chapitre.boutons[i].titre === "Suspension et échappement"
          ) {
            localStorage.setItem("twist", "true");
          }

          if (chapitreKey === "victoire") {
            localStorage.clear();
          } else if (chapitreKey === "defaite") {
            localStorage.clear();
          }
        });
      }
    }

    // change l'interface pour le nouveau chapitre
    if (chapitre.video) {
      let video = document.createElement("video");
      video.src = chapitre.video;
      video.classList.add("media");
      video.addEventListener("ended", function () {
        video.play();
      });
      container.appendChild(video);
      video.play();
      video.volume = 0;
      titreChapitre.textContent = chapitre.titre;
      textChapitre.textContent = chapitre.description;
      createBtn(chapitre);
    } else {
      container.appendChild(imageChapitre);
      imageChapitre.classList.add("media");
      titreChapitre.textContent = chapitre.titre;
      textChapitre.textContent = chapitre.description;
      imageChapitre.src = chapitre.image;
      createBtn(chapitre);
    }

    // message d'erreur dans la console
  } else {
    console.log("Chapitre introuvable");
  }

  // sauvgarde
  localStorage.setItem("chapitre", chapitreKey);
}

// reprend l'histoire ou elle a été laissé ou au début
if (localStorage.getItem("chapitre") !== null) {
  goToChapter(localStorage.getItem("chapitre"));
} else {
  goToChapter("debut");
}

// bouton reset
let reset = document.querySelector(".reset");
reset.addEventListener("click", function () {
  localStorage.clear();
  goToChapter("debut");
});

//Mute
let mute = document.querySelector("#mute");
mute.addEventListener("change", function () {
  if (mute.checked) {
    vroum.volume = 0;
    localStorage.setItem("mute", "true");
  } else {
    vroum.volume = 1;
    localStorage.setItem("mute", "false");
  }
});

if (localStorage.getItem("mute") == "true") {
  mute.checked = true;
}
