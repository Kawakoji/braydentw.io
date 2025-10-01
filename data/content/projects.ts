import { kebabCase, kebabArray } from "@/utils/utils";
import { Project } from "types";

const projects: Project[] = [
  {
    id: 0,
    title: "Pizza Delicious",
    desc: "Site web moderne pour restaurant de pizza avec menu interactif et design responsive.",
    img: "/static/projects/pizzasite.png",
    link: "https://pizzeriasite.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Responsive"],
  },
  {
    id: 1,
    title: "Skarbowsky Gym",
    desc: "Site web pour salle de sport spécialisée en Muay Thaï avec planning, tarifs et informations sur les deux salles.",
    img: "/static/projects/skarbowsky.png",
    link: "https://skarbowsky-gym.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Responsive"],
  },
  {
    id: 2,
    title: "Coffee Blend",
    desc: "Site web élégant pour café avec menu interactif, réservation de table et boutique en ligne.",
    img: "/static/projects/coffesite.png",
    link: "https://coffeesiteadam.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "E-commerce"],
  },
  {
    id: 3,
    title: "Résilience Café",
    desc: "Site web artisanal pour café parisien avec menu interactif, galerie et événements.",
    img: "/static/projects/resilience.png",
    link: "https://resilience-cafe-paris.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Café"],
  },
  {
    id: 4,
    title: "Hair Salon",
    desc: "Site web moderne pour salon de coiffure avec services, témoignages et réservation en ligne.",
    img: "/static/projects/coiffure.png",
    link: "https://adamhairsalon.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Salon"],
  },
  {
    id: 5,
    title: "Lazy Fox Agency",
    desc: "Site web moderne pour agence de services avec design responsive et animations fluides.",
    img: "/static/projects/fox.png",
    link: "https://adamfoxsite.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Agency"],
  },
  {
    id: 6,
    title: "FlameOnePage",
    desc: "Site web one-page professionnel avec portfolio, services et tarifs pour solutions high-end.",
    img: "/static/projects/flm.png",
    link: "https://adamonepage.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "OnePage"],
  },
  {
    id: 7,
    title: "BizPage",
    desc: "Site web professionnel pour entreprise avec portfolio, équipe, services et tarifs.",
    img: "/static/projects/bizness.png",
    link: "https://adambiznesssite.netlify.app/",
    tags: ["HTML", "CSS", "Javascript", "Business"],
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
