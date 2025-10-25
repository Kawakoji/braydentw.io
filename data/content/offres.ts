export type SiteType = {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  icon: string;
  features: string[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
};

export const siteTypes: SiteType[] = [
  {
    id: "landing",
    title: "Landing Page",
    description: "Une page unique avec call-to-action",
    price: 500,
    priceLabel: "à partir de 500 €",
    icon: "📄",
    features: [
      "Design moderne et responsive",
      "Formulaire de contact",
      "Optimisé pour la conversion",
      "SEO de base"
    ]
  },
  {
    id: "vitrine",
    title: "Site Vitrine",
    description: "3 à 6 pages, formulaire, SEO, responsive",
    price: 900,
    priceLabel: "à partir de 900 €",
    icon: "🌐",
    features: [
      "3 à 6 pages personnalisées",
      "Design responsive",
      "Formulaire de contact avancé",
      "Optimisation SEO complète",
      "Animations modernes"
    ]
  },
  {
    id: "ecommerce",
    title: "Site E-commerce",
    description: "Panier, paiement, gestion produits",
    price: 1800,
    priceLabel: "à partir de 1 800 €",
    icon: "🛒",
    features: [
      "Gestion complète des produits",
      "Panier et checkout",
      "Paiement sécurisé",
      "Gestion des commandes",
      "Interface d'administration"
    ]
  },
  {
    id: "custom",
    title: "Application Web Sur Mesure",
    description: "Interface complexe, base de données, authentification",
    price: 0,
    priceLabel: "Sur devis",
    icon: "⚙️",
    features: [
      "Architecture personnalisée",
      "Base de données complexe",
      "Authentification sécurisée",
      "API custom",
      "Évolutivité garantie"
    ]
  }
];

export const modules: Module[] = [
  {
    id: "booking",
    title: "Réservation / Booking",
    description: "Système de réservation de date ou service en ligne",
    price: 350,
    icon: "📅"
  },
  {
    id: "planning",
    title: "Planning / Agenda",
    description: "Gestion des disponibilités et rendez-vous",
    price: 300,
    icon: "📆"
  },
  {
    id: "mailing",
    title: "Mailing / Newsletter",
    description: "Envoi automatique d'e-mails via API",
    price: 250,
    icon: "📧"
  },
  {
    id: "form",
    title: "Formulaire Avancé",
    description: "Logique conditionnelle et envoi dynamique",
    price: 150,
    icon: "📝"
  },
  {
    id: "client",
    title: "Espace Client",
    description: "Authentification, profils et gestion de données",
    price: 500,
    icon: "👤"
  },
  {
    id: "payment",
    title: "Paiement en Ligne",
    description: "Intégration Stripe / PayPal / Lydia Pro",
    price: 400,
    icon: "💳"
  },
  {
    id: "dashboard",
    title: "Tableau de Bord Admin",
    description: "Statistiques et visualisation des données",
    price: 600,
    icon: "📊"
  },
  {
    id: "multilang",
    title: "Multilingue",
    description: "Gestion des langues et SEO multilingue",
    price: 300,
    icon: "🌍"
  }
];

export const guarantees = [
  {
    icon: "🔧",
    title: "100% Sur Mesure",
    description: "Développement personnalisé sans CMS ni template"
  },
  {
    icon: "⚡",
    title: "Livraison Rapide",
    description: "1 à 2 semaines selon la complexité"
  },
  {
    icon: "📱",
    title: "Responsive & SEO",
    description: "Design adaptatif et optimisé pour les moteurs de recherche"
  },
  {
    icon: "🔒",
    title: "Code Sécurisé",
    description: "Bonnes pratiques et évolutivité garantie"
  },
  {
    icon: "🤝",
    title: "Suivi Post-Livraison",
    description: "Accompagnement et support après la mise en ligne"
  }
];

