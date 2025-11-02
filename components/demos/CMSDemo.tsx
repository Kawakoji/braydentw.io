import React, { useState } from "react";

interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
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
  
  // État pour le menu restaurant
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "Burger Classic", description: "Pain brioché, steak haché, salade, tomate, oignons", price: "12€", category: "Plats" },
    { id: 2, name: "Pizza Margherita", description: "Tomate, mozzarella, basilic frais", price: "11€", category: "Plats" },
    { id: 3, name: "Tiramisu", description: "Dessert italien au café et mascarpone", price: "6€", category: "Desserts" },
  ]);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuDescription, setNewMenuDescription] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");
  const [newMenuCategory, setNewMenuCategory] = useState("Plats");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

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

  // Fonction pour le carrousel automatique
  React.useEffect(() => {
    if (activeTab === 'carousel' && carouselImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
      }, 3000); // Change d'image toutes les 3 secondes
      return () => clearInterval(interval);
    }
  }, [activeTab, carouselImages.length]);

  // Fonctions pour les menus restaurant
  const addMenuItem = () => {
    if (newMenuName.trim() && newMenuPrice.trim()) {
      const newId = menuItems.length > 0 
        ? Math.max(...menuItems.map(item => item.id)) + 1 
        : 1;
      setMenuItems([...menuItems, {
        id: newId,
        name: newMenuName,
        description: newMenuDescription || "Aucune description",
        price: newMenuPrice,
        category: newMenuCategory
      }]);
      setNewMenuName("");
      setNewMenuDescription("");
      setNewMenuPrice("");
      setNewMenuCategory("Plats");
    }
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

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
              🍽️ Gérer le Menu Restaurant
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
                Ajoutez, supprimez et organisez les images de votre carrousel animé. 
                Le carrousel tourne automatiquement ! Dans le vrai CMS, vous pouvez uploader directement depuis votre ordinateur.
              </p>
            </div>

            {/* Affichage du carrousel animé */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="relative overflow-hidden rounded-lg bg-white" style={{ height: '400px' }}>
                {carouselImages.length > 0 ? (
                  <>
                    <div 
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ 
                        transform: `translateX(-${currentCarouselIndex * 100}%)`,
                        width: `${carouselImages.length * 100}%`
                      }}
                    >
                      {carouselImages.map((image, index) => (
                        <div 
                          key={image.id}
                          className="w-full flex-shrink-0 h-full relative"
                          style={{ width: `${100 / carouselImages.length}%` }}
                        >
                          <img 
                            src={image.url} 
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-medium">{image.alt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Indicateurs de slides */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentCarouselIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentCarouselIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 w-2'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Boutons précédent/suivant */}
                    {carouselImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentCarouselIndex((prev) => 
                            prev === 0 ? carouselImages.length - 1 : prev - 1
                          )}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setCurrentCarouselIndex((prev) => 
                            (prev + 1) % carouselImages.length
                          )}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
                        >
                          →
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-lg">Aucune image dans le carrousel</p>
                  </div>
                )}
              </div>
              
              {/* Liste des images pour gestion */}
              {carouselImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-2">
                  {carouselImages.map((image, index) => (
                    <div 
                      key={image.id} 
                      className="relative group cursor-pointer"
                      onClick={() => setCurrentCarouselIndex(index)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className={`w-full h-20 object-cover rounded border-2 transition-all ${
                          index === currentCarouselIndex ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCarouselImage(image.id);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
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
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">🍽️ Gestion du Menu Restaurant</h3>
              <p className="text-sm text-gray-700">
                Ajoutez, modifiez ou supprimez des plats de votre menu. Organisez par catégories 
                (Entrées, Plats, Desserts, Boissons...). Les modifications apparaissent instantanément !
              </p>
            </div>

            {/* Affichage du menu restaurant */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 text-center">
                <h2 className="text-3xl font-bold mb-2">🍴 Notre Menu</h2>
                <p className="text-orange-100">Découvrez nos spécialités</p>
              </div>
              
              <div className="p-6">
                {categories.length > 0 ? (
                  categories.map((category) => {
                    const items = getItemsByCategory(category);
                    return (
                      <div key={category} className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-orange-500 text-gray-800">
                          {category}
                        </h3>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div 
                              key={item.id}
                              className="group relative p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-all"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
                                    <span className="text-orange-600 font-bold text-lg">{item.price}</span>
                                  </div>
                                  <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                                <button
                                  onClick={() => removeMenuItem(item.id)}
                                  className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm opacity-0 group-hover:opacity-100"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 py-8">Aucun plat dans le menu</p>
                )}
              </div>
            </div>

            {/* Formulaire d'ajout */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h4 className="font-semibold mb-4">➕ Ajouter un plat au menu</h4>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du plat *
                    </label>
                    <input
                      type="text"
                      value={newMenuName}
                      onChange={(e) => setNewMenuName(e.target.value)}
                      placeholder="Ex: Burger Classic, Pizza Margherita..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={newMenuCategory}
                      onChange={(e) => setNewMenuCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option>Plats</option>
                      <option>Entrées</option>
                      <option>Desserts</option>
                      <option>Boissons</option>
                      <option>Menus</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newMenuDescription}
                    onChange={(e) => setNewMenuDescription(e.target.value)}
                    placeholder="Ex: Pain brioché, steak haché, salade, tomate..."
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix *
                  </label>
                  <input
                    type="text"
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    placeholder="Ex: 12€, 15.50€..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addMenuItem}
                  disabled={!newMenuName.trim() || !newMenuPrice.trim()}
                  className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  ➕ Ajouter au menu
                </button>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">
                ✅ <strong>Dans le vrai CMS :</strong> Les modifications sont sauvegardées 
                automatiquement et le menu se met à jour en temps réel sur votre site. 
                Vous pouvez aussi ajouter des images aux plats, modifier les prix en masse, 
                et organiser les plats par ordre d'affichage !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CMSDemo;

