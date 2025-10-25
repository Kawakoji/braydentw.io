import React, { useState } from "react";
import SectionTitle from "../global/SectionTitle";
import { siteTypes, modules, guarantees } from "@/data/content/offres";

function OffreClient() {
  const [selectedSite, setSelectedSite] = useState<string>("vitrine");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [showDevisForm, setShowDevisForm] = useState(false);

  // Calcul du prix total
  const calculateTotal = () => {
    const siteType = siteTypes.find(s => s.id === selectedSite);
    if (!siteType || siteType.price === 0) return "Sur devis";
    
    const modulesPrice = selectedModules.reduce((total, moduleId) => {
      const module = modules.find(m => m.id === moduleId);
      return total + (module?.price || 0);
    }, 0);

    return `${siteType.price + modulesPrice} €`;
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="flex flex-col text-left max-w-7xl w-full m-auto relative">
      {/* Introduction */}
      <div className="mb-16">
        <SectionTitle title="Offre Client" />
        <p className="text-lg text-fun-gray mt-6 max-w-3xl">
          Je crée des sites web <span className="text-fun-pink font-semibold">performants, modernes et sur mesure</span>, 
          sans CMS ni template. Choisissez le type de site et les modules dont vous avez besoin, 
          le prix s'adapte automatiquement.
        </p>
      </div>

      {/* Types de sites */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8">Types de Sites Proposés</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteTypes.map((site) => (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site.id)}
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all
                ${selectedSite === site.id
                  ? 'border-fun-pink bg-fun-pink-darkerer'
                  : 'border-fun-gray hover:border-fun-pink-dark'
                }
              `}
            >
              <div className="text-4xl mb-4">{site.icon}</div>
              <h4 className="text-xl font-bold mb-2">{site.title}</h4>
              <p className="text-sm text-fun-gray mb-4">{site.description}</p>
              <div className="text-fun-pink font-bold text-lg">{site.priceLabel}</div>
              <ul className="mt-4 space-y-2">
                {site.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-fun-gray flex items-start">
                    <span className="text-fun-pink mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-fun-gray mt-6 italic">
          💡 Les tarifs sont donnés à titre indicatif et peuvent être ajustés selon vos besoins. 
          Chaque projet est unique.
        </p>
      </div>

      {/* Modules optionnels */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8">Modules Optionnels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${selectedModules.includes(module.id)
                  ? 'border-fun-pink bg-fun-pink-darkerer'
                  : 'border-fun-gray hover:border-fun-pink-dark'
                }
              `}
            >
              <div 
                onClick={() => toggleModule(module.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{module.icon}</span>
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => {}}
                    className="w-5 h-5"
                  />
                </div>
                <h4 className="font-bold mb-2">{module.title}</h4>
                <p className="text-xs text-fun-gray mb-3">{module.description}</p>
                <div className="text-fun-pink font-bold">+{module.price} €</div>
              </div>
              {/* Bouton Voir l'exemple */}
              {(module.id === 'booking' || module.id === 'planning' || module.id === 'client') && (
                <a
                  href="/demos"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 w-full block text-center px-3 py-2 bg-fun-pink text-white text-xs rounded-lg hover:opacity-75 transition-opacity"
                >
                  Voir l'exemple →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur de devis */}
      <div className="mb-16 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-8">
        <h3 className="text-3xl font-bold mb-6 text-center">Estimation de Votre Projet</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-fun-gray">Type de site :</span>
                <span className="font-semibold">
                  {siteTypes.find(s => s.id === selectedSite)?.title}
                </span>
              </div>
              {selectedModules.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-fun-gray">Modules sélectionnés :</span>
                  <span className="font-semibold">{selectedModules.length}</span>
                </div>
              )}
              {selectedModules.map(moduleId => {
                const module = modules.find(m => m.id === moduleId);
                return module ? (
                  <div key={moduleId} className="flex justify-between text-sm">
                    <span className="text-fun-gray">→ {module.title}</span>
                    <span>+{module.price} €</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-fun-pink rounded-xl p-8 min-w-[200px]">
            <div className="text-sm text-white mb-2">Total Estimé</div>
            <div className="text-4xl font-bold text-white">{calculateTotal()}</div>
          </div>
        </div>
        <button
          onClick={() => setShowDevisForm(true)}
          className="mt-8 w-full md:w-auto mx-auto block px-8 py-4 bg-white text-fun-pink rounded-full font-bold hover:bg-fun-pink hover:text-white transition-colors"
        >
          Obtenir un Devis Personnalisé →
        </button>
      </div>

      {/* Garanties */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Mes Engagements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {guarantees.map((guarantee, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-3">{guarantee.icon}</div>
              <h4 className="font-bold mb-2">{guarantee.title}</h4>
              <p className="text-xs text-fun-gray">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire de devis (modal) */}
      {showDevisForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-bg border-2 border-fun-pink rounded-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowDevisForm(false)}
              className="absolute top-4 right-4 text-2xl hover:text-fun-pink"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6">Demande de Devis</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nom complet *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-fun-pink-darkerer border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-fun-pink-darkerer border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description du projet *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-fun-pink-darkerer border border-fun-gray rounded-lg focus:border-fun-pink outline-none resize-none"
                  placeholder="Décrivez votre projet en quelques mots..."
                />
              </div>
              <div className="bg-fun-pink-darkerer p-3 rounded-lg">
                <div className="text-sm text-fun-gray mb-1">Estimation actuelle :</div>
                <div className="text-xl font-bold text-fun-pink">{calculateTotal()}</div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-fun-pink text-white rounded-full font-bold hover:opacity-75 transition-opacity"
              >
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OffreClient;

