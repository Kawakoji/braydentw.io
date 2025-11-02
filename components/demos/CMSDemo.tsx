import React, { useState } from "react";

function CMSDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'interface'>('overview');

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✏️</div>
          <h2 className="text-3xl font-bold mb-2">Module CMS Light</h2>
          <p className="text-lg text-gray-600">
            Gérez votre site vous-même sans dépendre d'un développeur
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            550€ - Prix unique
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'features'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => setActiveTab('interface')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'interface'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Interface
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Pourquoi ce module ?</h3>
              <p className="text-gray-700 mb-4">
                Après la livraison de votre site, vous pourriez avoir besoin de modifier certains contenus : 
                mettre à jour des textes, changer des images, ajouter des projets... 
                Sans ce module, vous devriez faire appel à un développeur à chaque fois.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">❌</div>
                <h4 className="font-bold mb-2">Sans le module</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Contactez le développeur</li>
                  <li>• Attendez la modification</li>
                  <li>• Payez pour chaque changement</li>
                  <li>• Dépendance continue</li>
                </ul>
              </div>

              <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                <div className="text-3xl mb-3">✅</div>
                <h4 className="font-bold mb-2">Avec le module CMS</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Modifiez quand vous voulez</li>
                  <li>• Modifications instantanées</li>
                  <li>• Pas de coût supplémentaire</li>
                  <li>• Autonomie totale</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">💡 Investissement intelligent</h4>
              <p className="text-green-700 text-sm">
                Pour 550€, vous gagnez votre indépendance. Plus besoin de payer 50-100€ 
                à chaque modification de contenu. Le module se rentabilise rapidement !
              </p>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">📋 Fonctionnalités incluses</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-semibold mb-2">Modification des textes</h4>
                <p className="text-sm text-gray-600">
                  Titres, descriptions, phrases d'accroche - tout est modifiable depuis l'interface
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🖼️</div>
                <h4 className="font-semibold mb-2">Gestion des images</h4>
                <p className="text-sm text-gray-600">
                  Upload et remplacement d'images pour galeries, bannières, projets, etc.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">📑</div>
                <h4 className="font-semibold mb-2">Gestion des menus</h4>
                <p className="text-sm text-gray-600">
                  Ajoutez ou supprimez des rubriques de navigation sans coder
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold mb-2">Sécurisé</h4>
                <p className="text-sm text-gray-600">
                  Interface protégée par authentification - seul vous y avez accès
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">💼</div>
                <h4 className="font-semibold mb-2">Gestion de projets</h4>
                <p className="text-sm text-gray-600">
                  Ajoutez/modifiez/supprimez des projets portfolio facilement
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold mb-2">Modifications instantanées</h4>
                <p className="text-sm text-gray-600">
                  Les changements sont appliqués immédiatement sur le site en ligne
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-blue-800 mb-2">🎨 Interface moderne</h4>
              <p className="text-blue-700 text-sm mb-3">
                Design sobre et intuitif, inspiré de Notion ou Google Drive. 
                Facile à prendre en main, même pour les non-techniques.
              </p>
              <div className="flex items-center space-x-2 text-xs text-blue-600">
                <span>✓</span>
                <span>Interface responsive (mobile, tablette, desktop)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interface' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">🖥️ Aperçu de l'interface</h3>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
                {/* Sidebar */}
                <div className="flex">
                  <div className="w-64 bg-white border-r border-gray-200 p-4">
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900">Panel Admin</h4>
                      <p className="text-xs text-gray-500">Gestion de contenu</p>
                    </div>
                    <div className="space-y-2">
                      <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium flex items-center space-x-2">
                        <span>🏠</span>
                        <span>Page d'accueil</span>
                      </div>
                      <div className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                        <span>💼</span>
                        <span>Projets</span>
                      </div>
                      <div className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                        <span>⚙️</span>
                        <span>Navigation</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Page d'accueil</h3>
                      <p className="text-gray-600 text-sm">Modifiez les compétences et témoignages</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <label className="block text-sm font-medium mb-2">Compétence</label>
                        <input 
                          type="text" 
                          value="React" 
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <label className="block text-sm font-medium mb-2">Témoignage</label>
                        <textarea 
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          rows={2}
                          value="Excellent travail, je recommande !"
                        />
                      </div>
                      
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Note :</strong> Cette interface est intégrée directement dans votre site. 
                Accédez-y via <code className="bg-yellow-100 px-2 py-1 rounded">/admin</code> 
                après l'authentification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CMSDemo;

