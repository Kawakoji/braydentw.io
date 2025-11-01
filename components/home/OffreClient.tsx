import React, { useState } from "react";
import Link from "next/link";
import SectionTitle from "../global/SectionTitle";
import { siteTypes, modules, guarantees } from "@/data/content/offres";

function OffreClient() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [showDevisForm, setShowDevisForm] = useState(false);

  // Calcul du prix total
  const calculateTotal = () => {
    const siteType = siteTypes.find(s => s.id === selectedSite);
    
    // Si pas de site sélectionné, calculer juste les modules
    if (!selectedSite) {
      const modulesPrice = selectedModules.reduce((total, moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        return total + (module?.price || 0);
      }, 0);
      return modulesPrice > 0 ? `${modulesPrice} €` : null;
    }
    
    if (!siteType) return null;
    
    if (siteType.price === 0) {
      // Vérifier si on a des modules avec prix, sinon "Sur devis"
      const modulesPrice = selectedModules.reduce((total, moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        return total + (module?.price || 0);
      }, 0);
      return modulesPrice > 0 ? `${modulesPrice} €` : "Sur devis";
    }
    
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

  const hasSelection = selectedSite !== null || selectedModules.length > 0;

  return (
    <div className="flex flex-col text-left max-w-7xl w-full m-auto relative pb-32 md:pb-16">
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
              className={`
                p-6 rounded-xl border-2 transition-all flex flex-col
                ${selectedSite === site.id
                  ? 'border-fun-pink bg-fun-pink-darkerer'
                  : 'border-fun-gray hover:border-fun-pink-dark'
                }
              `}
            >
              <div className="flex-1">
                <div className="text-4xl mb-4">{site.icon}</div>
                <h4 className="text-xl font-bold mb-2">{site.title}</h4>
                <p className="text-sm text-fun-gray mb-4">{site.description}</p>
                <div className="text-fun-pink font-bold text-lg mb-4">{site.priceLabel}</div>
                <ul className="space-y-2 mb-4">
                  {site.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-fun-gray flex items-start">
                      <span className="text-fun-pink mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setSelectedSite(site.id)}
                className={`
                  w-full py-3 px-4 rounded-lg font-bold transition-all mt-4
                  ${selectedSite === site.id
                    ? 'bg-fun-pink text-white'
                    : 'bg-fun-pink-darkerer text-fun-pink hover:bg-fun-pink hover:text-white border-2 border-fun-pink'
                  }
                `}
              >
                {selectedSite === site.id ? '✓ Sélectionné' : 'Sélectionner'}
              </button>
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
                p-4 rounded-lg border-2 transition-all flex flex-col
                ${selectedModules.includes(module.id)
                  ? 'border-fun-pink bg-fun-pink-darkerer'
                  : 'border-fun-gray hover:border-fun-pink-dark'
                }
              `}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{module.icon}</span>
                </div>
                <h4 className="font-bold mb-2">{module.title}</h4>
                <p className="text-xs text-fun-gray mb-3">{module.description}</p>
                <div className="text-fun-pink font-bold mb-2">
                  {module.price > 0 ? `+${module.price} €` : 'Sur devis'}
                </div>
                {module.recurringCosts && (
                  <div className="text-xs text-fun-gray bg-fun-pink-darkerer p-2 rounded mb-3">
                    <div className="font-semibold text-fun-pink mb-1">
                      Coût récurrent : {module.recurringCosts.amount} {module.recurringCosts.frequency}
                    </div>
                    <div className="text-xs mb-1">{module.recurringCosts.reason}</div>
                    {module.recurringCosts.alternative && (
                      <div className="text-xs italic">{module.recurringCosts.alternative}</div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleModule(module.id)}
                className={`
                  w-full py-2 px-3 rounded-lg font-bold text-sm transition-all mb-2
                  ${selectedModules.includes(module.id)
                    ? 'bg-fun-pink text-white'
                    : 'bg-fun-pink-darkerer text-fun-pink hover:bg-fun-pink hover:text-white border-2 border-fun-pink'
                  }
                `}
              >
                {selectedModules.includes(module.id) ? '✓ Ajouté' : 'Ajouter'}
              </button>
              {/* Bouton Voir l'exemple */}
              {(module.id === 'booking' || module.id === 'planning' || module.id === 'client' || 
                module.id === 'payment' || module.id === 'dashboard' || module.id === 'multilang' || 
                module.id === 'form' || module.id === 'mailing') && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full block text-center px-3 py-2 bg-fun-pink text-white text-xs rounded-lg hover:opacity-75 transition-opacity"
                >
                  <Link href="/demos">
                    Voir l'exemple →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Panier latéral - Desktop */}
      {hasSelection && (
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-80 bg-bg border-2 border-fun-pink rounded-xl p-6 shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🛒</span> Votre Sélection
          </h3>
          <div className="space-y-4">
            {selectedSite && (
              <div className="bg-fun-pink-darkerer rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm">
                    {siteTypes.find(s => s.id === selectedSite)?.title}
                  </span>
                  <button
                    onClick={() => setSelectedSite(null)}
                    className="text-fun-pink hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-fun-pink text-sm">
                  {siteTypes.find(s => s.id === selectedSite)?.priceLabel}
                </div>
              </div>
            )}
            {selectedModules.map(moduleId => {
              const module = modules.find(m => m.id === moduleId);
              return module ? (
                <div key={moduleId} className="bg-fun-pink-darkerer rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm">{module.title}</span>
                    <button
                      onClick={() => toggleModule(moduleId)}
                      className="text-fun-pink hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-fun-pink text-sm">
                    {module.price > 0 ? `+${module.price} €` : 'Sur devis'}
                  </div>
                </div>
              ) : null;
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-fun-gray">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total Estimé</span>
              <span className="text-2xl font-bold text-fun-pink">
                {calculateTotal() || "Sélectionnez un service"}
              </span>
            </div>
            <button
              onClick={() => setShowDevisForm(true)}
              className="w-full py-3 px-4 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75 transition-opacity"
            >
              Demander un Devis →
            </button>
          </div>
        </div>
      )}

      {/* Panier Mobile - Bottom */}
      {hasSelection && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg border-t-2 border-fun-pink rounded-t-xl p-4 shadow-2xl z-40">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span>🛒</span> Sélection ({selectedModules.length + (selectedSite ? 1 : 0)})
              </h3>
              <div className="text-xl font-bold text-fun-pink">
                {calculateTotal() || "Sur devis"}
              </div>
            </div>
            <button
              onClick={() => setShowDevisForm(true)}
              className="w-full py-3 px-4 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75 transition-opacity"
            >
              Demander un Devis →
            </button>
          </div>
        </div>
      )}

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

