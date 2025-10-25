import { kebabCase, kebabArray } from "@/utils/utils";
import { Project } from "types";

const projects: Project[] = [
  {
    id: 0,
    title: "Tawakkul Académie",
    desc: "Plateforme dédiée à l'excellence spirituelle et académique islamique avec formations, communauté et valeurs fondamentales.",
    img: "/static/projects/sitetawakkulacademievideo.mp4",
    link: "https://tawakkulacademie.netlify.app/#accueil",
    tags: ["HTML", "CSS", "Javascript", "Spiritualité"],
  },
  {
    id: 1,
    title: "Tawakkul Voyage",
    desc: "Site web pour voyages spirituels et retraites avec réservation en ligne et informations sur les destinations.",
    img: "/static/projects/tawakkulvoyages.png",
    link: "https://tawakkulvoyage.netlify.app/#reservation",
    tags: ["HTML", "CSS", "Javascript", "Voyage"],
  },
  {
    id: 2,
    title: "Scouts Permaculteurs",
    desc: "Site web pour l'association des scouts permaculteurs avec informations sur les activités, formations et valeurs écologiques.",
    img: "/static/projects/videoscout (2).mp4",
    link: "https://scouts-permaculteurs.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Écologie", "Scoutisme"],
  },
];

export const allTags = []

projects.forEach((project) => {
  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))
});

export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export default projects
