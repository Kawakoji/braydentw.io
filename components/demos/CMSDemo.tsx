import React, { useState } from "react";

interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

interface MenuItem {
  id: number;
  title: string;
  path: string;
}

function CMSDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'carousel' | 'menu'>('overview');
  
  // État pour le carrousel
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([
    { id: 1, url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800", alt: "Image 1" },
    { id: 2, url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800", alt: "Image 2" },
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  
  // État pour les menus
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, title: "Accueil", path: "/" },
    { id: 2, title: "Services", path: "/services" },
    { id: 3, title: "Contact", path: "/contact" },
  ]);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuPath, setNewMenuPath] = useState("");

  // Fonctions pour le carrousel
  const addCarouselImage = () => {
    if (newImageUrl.trim()) {
      const newId = carouselImages.length > 0 
        ? Math.max(...carouselImages.map(img => img.id)) + 1 
        : 1;
      setCarouselImages([...carouselImages, {
        id: newId,
        url: newImageUrl,
        alt: newImageAlt || "Image carrousel"
      }]);
      setNewImageUrl("");
      setNewImageAlt("");
    }
  };

  const removeCarouselImage = (id: number) => {
    setCarouselImages(carouselImages.filter(img => img.id !== id));
  };

  // Fonctions pour les menus
  const addMenuItem = () => {
    if (newMenuTitle.trim() && newMenuPath.trim()) {
      const newId = menuItems.length > 0 
        ? Math.max(...menuItems.map(item => item.id)) + 1 
        : 1;
      setMenuItems([...menuItems, {
        id: newId,
        title: newMenuTitle,
        path: newMenuPath
      }]);
      setNewMenuTitle("");
      setNewMenuPath("");
    }
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✏️</div>
          <h2 className="text-3xl font-bold mb-2">Module CMS Light</h2>
          <p className="text-lg text-gray-600">
            Essayez l'interface admin - Gérez votre contenu vous-même !
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            550€ - Prix unique | Aucun coût récurrent
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('carousel')}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'carousel'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🖼️ Gérer un Carrousel
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📑 Gérer les Menus
          </button>
        </div>

        {/* Contenu des onglets */}
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

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-3">📋 Fonctionnalités incluses</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📝</span>
                  <span className="text-sm">Modification des textes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🖼️</span>
                  <span className="text-sm">Gestion des images</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📑</span>
                  <span className="text-sm">Gestion des menus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">💼</span>
                  <span className="text-sm">Gestion de projets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔒</span>
                  <span className="text-sm">Interface sécurisée</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚡</span>
                  <span className="text-sm">Modifications instantanées</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">Essayez les fonctionnalités interactives dans les onglets ci-dessus !</p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setActiveTab('carousel')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  → Tester le carrousel
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  → Tester les menus
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">🖼️ Gestion du Carrousel d'Images</h3>
              <p className="text-sm text-gray-700">
                Ajoutez, supprimez et organisez les images de votre carrousel. 
                Dans le vrai CMS, vous pouvez uploader directement depuis votre ordinateur !
              </p>
            </div>

            {/* Affichage du carrousel */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="font-semibold mb-4 text-center">Carrousel actuel</h4>
              {carouselImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {carouselImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeCarouselImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-center mt-2 text-gray-600">{image.alt}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Aucune image dans le carrousel</p>
              )}
            </div>

            {/* Formulaire d'ajout */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h4 className="font-semibold mb-4">➕ Ajouter une image</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Dans le vrai CMS, vous cliquez sur "Uploader" pour choisir un fichier
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte alternatif (optionnel)
                  </label>
                  <input
                    type="text"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    placeholder="Description de l'image"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addCarouselImage}
                  disabled={!newImageUrl.trim()}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  ➕ Ajouter au carrousel
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✅ <strong>Dans le vrai CMS :</strong> Les images sont uploadées sur votre serveur 
                et les modifications sont sauvegardées immédiatement. Le carrousel se met à jour 
                automatiquement sur votre site !
              </p>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">📑 Gestion des Menus de Navigation</h3>
              <p className="text-sm text-gray-700">
                Ajoutez ou supprimez des rubriques dans votre menu de navigation. 
                Les modifications apparaissent instantanément sur votre site !
              </p>
            </div>

            {/* Affichage du menu actuel */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-4 text-center">Menu de navigation actuel</h4>
                {menuItems.length > 0 ? (
                  <nav className="flex flex-wrap justify-center gap-4">
                    {menuItems.map((item) => (
                      <div 
                        key={item.id}
                        className="group relative px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <a href={item.path} className="text-gray-800 font-medium">
                          {item.title}
                        </a>
                        <button
                          onClick={() => removeMenuItem(item.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Supprimer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </nav>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucun élément dans le menu</p>
                )}
              </div>
            </div>

            {/* Liste détaillée */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h4 className="font-semibold mb-3">Éléments du menu</h4>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div>
                      <span className="font-medium text-gray-900">{item.title}</span>
                      <span className="text-sm text-gray-500 ml-2">→ {item.path}</span>
                    </div>
                    <button
                      onClick={() => removeMenuItem(item.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
                {menuItems.length === 0 && (
                  <p className="text-center text-gray-500 py-4">Aucun élément</p>
                )}
              </div>
            </div>

            {/* Formulaire d'ajout */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h4 className="font-semibold mb-4">➕ Ajouter un élément au menu</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du menu
                  </label>
                  <input
                    type="text"
                    value={newMenuTitle}
                    onChange={(e) => setNewMenuTitle(e.target.value)}
                    placeholder="Ex: Blog, À propos, Portfolio..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chemin (URL)
                  </label>
                  <input
                    type="text"
                    value={newMenuPath}
                    onChange={(e) => setNewMenuPath(e.target.value)}
                    placeholder="Ex: /blog, /about, /portfolio..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Utilisez "/" pour la page d'accueil
                  </p>
                </div>
                <button
                  onClick={addMenuItem}
                  disabled={!newMenuTitle.trim() || !newMenuPath.trim()}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  ➕ Ajouter au menu
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✅ <strong>Dans le vrai CMS :</strong> Les modifications sont sauvegardées 
                automatiquement et le menu se met à jour en temps réel sur votre site. 
                Vous pouvez réorganiser les éléments par glisser-déposer (fonctionnalité avancée) !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CMSDemo;

