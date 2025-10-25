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
  recurringCosts?: {
    amount: string;
    frequency: string;
    reason: string;
    alternative?: string;
  };
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
    icon: "📅",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Système entièrement custom - pas d'abonnement externe",
      alternative: "Utilise votre propre base de données"
    }
  },
  {
    id: "planning",
    title: "Planning / Agenda",
    description: "Gestion des disponibilités et rendez-vous",
    price: 300,
    icon: "📆",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Développement sur mesure - pas de service externe",
      alternative: "Fonctionne avec votre hébergement"
    }
  },
  {
    id: "mailing",
    title: "Mailing / Newsletter",
    description: "Envoi automatique d'e-mails via API",
    price: 250,
    icon: "📧",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Utilise votre email professionnel (Gmail, Outlook, etc.)",
      alternative: "Alternative : Service premium (20-50€/mois) pour gros volumes"
    }
  },
  {
    id: "form",
    title: "Formulaire Avancé",
    description: "Logique conditionnelle et envoi dynamique",
    price: 150,
    icon: "📝",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Développement custom - pas d'abonnement",
      alternative: "Fonctionne avec votre hébergement"
    }
  },
  {
    id: "client",
    title: "Espace Client",
    description: "Authentification, profils et gestion de données",
    price: 500,
    icon: "👤",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Système d'authentification custom - pas de service externe",
      alternative: "Alternative : Auth0 (20-50€/mois) pour plus de fonctionnalités"
    }
  },
  {
    id: "payment",
    title: "Paiement en Ligne",
    description: "Intégration Stripe / PayPal / Lydia Pro",
    price: 400,
    icon: "💳",
    recurringCosts: {
      amount: "1,4% + 0,25€",
      frequency: "par transaction",
      reason: "Frais de transaction uniquement - pas d'abonnement mensuel",
      alternative: "Alternative : Lydia Pro (0,5% par transaction)"
    }
  },
  {
    id: "dashboard",
    title: "Tableau de Bord Admin",
    description: "Statistiques et visualisation des données",
    price: 600,
    icon: "📊",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Développement custom - utilise vos données existantes",
      alternative: "Alternative : Google Analytics (gratuit) ou services premium"
    }
  },
  {
    id: "multilang",
    title: "Multilingue",
    description: "Gestion des langues et SEO multilingue",
    price: 300,
    icon: "🌍",
    recurringCosts: {
      amount: "0€",
      frequency: "par mois",
      reason: "Développement custom - pas de service externe",
      alternative: "Fonctionne avec votre hébergement"
    }
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

