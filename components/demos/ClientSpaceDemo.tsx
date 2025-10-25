import React, { useState } from "react";

function ClientSpaceDemo() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile" | "orders">("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const userData = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    memberSince: "Janvier 2024",
    points: 1250,
    avatar: "👤"
  };

  const orders = [
    { id: "CMD-2024-001", date: "15 Jan 2025", status: "Livré", total: "89.99 €" },
    { id: "CMD-2024-002", date: "10 Jan 2025", status: "En cours", total: "45.50 €" },
    { id: "CMD-2023-099", date: "28 Déc 2024", status: "Livré", total: "120.00 €" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">👤 Espace Client</h2>
        <p className="text-fun-gray">
          Authentification, profils et gestion de données personnalisées
        </p>
      </div>

      {isLoggedIn ? (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
              {/* Avatar et infos */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{userData.avatar}</div>
                <h3 className="font-bold text-lg">{userData.name}</h3>
                <p className="text-sm text-fun-gray">{userData.email}</p>
                <p className="text-xs text-fun-gray mt-1">Membre depuis {userData.memberSince}</p>
              </div>

              {/* Points fidélité */}
              <div className="bg-fun-pink p-4 rounded-lg text-center mb-6">
                <div className="text-sm text-white mb-1">Points fidélité</div>
                <div className="text-3xl font-bold text-white">{userData.points}</div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "dashboard"
                      ? "bg-fun-pink text-white"
                      : "hover:bg-bg"
                  }`}
                >
                  📊 Tableau de bord
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-fun-pink text-white"
                      : "hover:bg-bg"
                  }`}
                >
                  ⚙️ Mon profil
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "orders"
                      ? "bg-fun-pink text-white"
                      : "hover:bg-bg"
                  }`}
                >
                  📦 Mes commandes
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-6">Bienvenue {userData.name.split(' ')[0]} ! 👋</h3>
                  
                  {/* Statistiques */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-bg p-4 rounded-lg">
                      <div className="text-2xl mb-2">📦</div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-fun-gray">Commandes</div>
                    </div>
                    <div className="bg-bg p-4 rounded-lg">
                      <div className="text-2xl mb-2">💰</div>
                      <div className="text-2xl font-bold">255.49 €</div>
                      <div className="text-sm text-fun-gray">Total dépensé</div>
                    </div>
                    <div className="bg-bg p-4 rounded-lg">
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="text-2xl font-bold">{userData.points}</div>
                      <div className="text-sm text-fun-gray">Points</div>
                    </div>
                  </div>

                  {/* Activité récente */}
                  <h4 className="font-bold mb-4">Activité récente</h4>
                  <div className="space-y-3">
                    <div className="bg-bg p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Commande livrée</div>
                        <div className="text-sm text-fun-gray">CMD-2024-001 • Il y a 2 jours</div>
                      </div>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="bg-bg p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Commande en cours</div>
                        <div className="text-sm text-fun-gray">CMD-2024-002 • Il y a 5 jours</div>
                      </div>
                      <span className="text-yellow-400">⏳</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Mon Profil</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Prénom</label>
                      <input
                        type="text"
                        defaultValue="Jean"
                        className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nom</label>
                      <input
                        type="text"
                        defaultValue="Dupont"
                        className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="06 12 34 56 78"
                      className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Adresse</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Rue de la République, 75001 Paris"
                      className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75"
                  >
                    Sauvegarder les modifications
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Mes Commandes</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-bg p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold">{order.id}</div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          order.status === "Livré"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-fun-gray">
                        <span>{order.date}</span>
                        <span className="font-bold text-white">{order.total}</span>
                      </div>
                      <button className="mt-3 text-sm text-fun-pink hover:underline">
                        Voir les détails →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Page de connexion
        <div className="max-w-md mx-auto">
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Connexion</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-3 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75"
              >
                Se connecter
              </button>
            </form>
            <p className="text-center text-sm text-fun-gray mt-4">
              Pas encore de compte ?{" "}
              <a href="#" className="text-fun-pink hover:underline">
                S'inscrire
              </a>
            </p>
          </div>

          {/* Fonctionnalités */}
          <div className="mt-6 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">✨ Fonctionnalités Espace Client</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Authentification sécurisée</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Gestion de profil personnalisé</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Historique des commandes</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Programme de fidélité</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Tableau de bord personnalisé</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientSpaceDemo;









