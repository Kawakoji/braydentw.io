import React, { useState } from "react";

function MultilangDemo() {
  const [currentLang, setCurrentLang] = useState("fr");
  const [selectedPage, setSelectedPage] = useState("home");

  const languages = [
    { id: "fr", name: "Français", flag: "🇫🇷" },
    { id: "en", name: "English", flag: "🇬🇧" },
    { id: "es", name: "Español", flag: "🇪🇸" },
    { id: "de", name: "Deutsch", flag: "🇩🇪" }
  ];

  const pages = [
    { id: "home", name: "Accueil" },
    { id: "services", name: "Services" },
    { id: "about", name: "À propos" },
    { id: "contact", name: "Contact" }
  ];

  const content = {
    fr: {
      home: {
        title: "Bienvenue sur notre site",
        subtitle: "Nous créons des sites web modernes et performants",
        cta: "Découvrir nos services"
      },
      services: {
        title: "Nos Services",
        subtitle: "Développement web sur mesure",
        cta: "Demander un devis"
      },
      about: {
        title: "À propos de nous",
        subtitle: "Une équipe passionnée à votre service",
        cta: "En savoir plus"
      },
      contact: {
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour vous aider",
        cta: "Envoyer un message"
      }
    },
    en: {
      home: {
        title: "Welcome to our website",
        subtitle: "We create modern and high-performance websites",
        cta: "Discover our services"
      },
      services: {
        title: "Our Services",
        subtitle: "Custom web development",
        cta: "Request a quote"
      },
      about: {
        title: "About us",
        subtitle: "A passionate team at your service",
        cta: "Learn more"
      },
      contact: {
        title: "Contact us",
        subtitle: "We are here to help you",
        cta: "Send a message"
      }
    },
    es: {
      home: {
        title: "Bienvenido a nuestro sitio web",
        subtitle: "Creamos sitios web modernos y de alto rendimiento",
        cta: "Descubre nuestros servicios"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Desarrollo web personalizado",
        cta: "Solicitar cotización"
      },
      about: {
        title: "Acerca de nosotros",
        subtitle: "Un equipo apasionado a tu servicio",
        cta: "Saber más"
      },
      contact: {
        title: "Contáctanos",
        subtitle: "Estamos aquí para ayudarte",
        cta: "Enviar mensaje"
      }
    },
    de: {
      home: {
        title: "Willkommen auf unserer Website",
        subtitle: "Wir erstellen moderne und leistungsstarke Websites",
        cta: "Entdecken Sie unsere Dienstleistungen"
      },
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Maßgeschneiderte Webentwicklung",
        cta: "Angebot anfordern"
      },
      about: {
        title: "Über uns",
        subtitle: "Ein leidenschaftliches Team zu Ihren Diensten",
        cta: "Mehr erfahren"
      },
      contact: {
        title: "Kontaktieren Sie uns",
        subtitle: "Wir sind hier, um Ihnen zu helfen",
        cta: "Nachricht senden"
      }
    }
  };

  const currentContent = content[currentLang as keyof typeof content][selectedPage as keyof typeof content.fr];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">🌍 Site Multilingue</h2>
        <p className="text-fun-gray">
          Exemple de site avec gestion des langues et SEO multilingue
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sélecteur de langue et navigation */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Sélection de Langue</h3>
          
          {/* Sélecteur de langue */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Choisissez votre langue :</label>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setCurrentLang(lang.id)}
                  className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                    currentLang === lang.id
                      ? 'border-fun-pink bg-fun-pink-darkerer'
                      : 'border-fun-gray hover:border-fun-pink-dark'
                  }`}
                >
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Navigation :</label>
            <div className="grid grid-cols-2 gap-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedPage === page.id
                      ? 'border-fun-pink bg-fun-pink-darkerer'
                      : 'border-fun-gray hover:border-fun-pink-dark'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>

          {/* URL et SEO */}
          <div className="bg-bg p-4 rounded-lg">
            <h4 className="font-semibold mb-2">URL actuelle :</h4>
            <div className="text-sm text-fun-gray font-mono">
              https://monsite.com/{currentLang}/{selectedPage}
            </div>
            <div className="text-xs text-fun-gray mt-2">
              Optimisé pour le SEO multilingue
            </div>
          </div>
        </div>

        {/* Aperçu du contenu */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Aperçu du Contenu</h3>
          
          {/* Simulation de page web */}
          <div className="bg-bg rounded-lg p-6 min-h-[300px]">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">{currentContent.title}</h1>
              <p className="text-fun-gray mb-6">{currentContent.subtitle}</p>
              <button className="px-6 py-3 bg-fun-pink text-white rounded-lg font-semibold hover:opacity-75 transition-opacity">
                {currentContent.cta}
              </button>
            </div>
          </div>

          {/* Informations SEO */}
          <div className="mt-6 bg-bg p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Informations SEO :</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Langue détectée :</span>
                <span className="font-semibold">{languages.find(l => l.id === currentLang)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Meta title :</span>
                <span className="text-fun-gray">{currentContent.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Hreflang :</span>
                <span className="text-fun-gray">{currentLang}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fonctionnalités avancées */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {/* Détection automatique */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">🎯 Détection Automatique</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🌐</span>
              <div>
                <div className="font-semibold">Détection par géolocalisation</div>
                <div className="text-sm text-fun-gray">Redirection automatique selon le pays</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🌍</span>
              <div>
                <div className="font-semibold">Détection par navigateur</div>
                <div className="text-sm text-fun-gray">Langue préférée du navigateur</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔍</span>
              <div>
                <div className="font-semibold">SEO multilingue</div>
                <div className="text-sm text-fun-gray">Optimisation pour chaque langue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion du contenu */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">📝 Gestion du Contenu</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✏️</span>
              <div>
                <div className="font-semibold">Interface d'administration</div>
                <div className="text-sm text-fun-gray">Modification facile du contenu</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔄</span>
              <div>
                <div className="font-semibold">Synchronisation</div>
                <div className="text-sm text-fun-gray">Mise à jour en temps réel</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <div className="font-semibold">Statistiques par langue</div>
                <div className="text-sm text-fun-gray">Analytics détaillées</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coûts */}
      <div className="mt-8 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">💰 Coûts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span>Développement :</span>
              <span className="font-bold">300 €</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Coût récurrent :</span>
              <span className="font-bold text-fun-pink">0 €/mois</span>
            </div>
            <div className="text-sm text-fun-gray">
              Développement custom - pas de service externe
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Fonctionnalités incluses :</h4>
            <ul className="text-sm space-y-1">
              <li>• Détection automatique de langue</li>
              <li>• SEO optimisé par langue</li>
              <li>• Interface d'administration</li>
              <li>• Analytics multilingues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultilangDemo;
