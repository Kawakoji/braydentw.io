import React, { useState } from "react";

function DashboardDemo() {
  const [selectedPeriod, setSelectedPeriod] = useState("7j");
  const [selectedMetric, setSelectedMetric] = useState("visits");

  const periods = [
    { id: "7j", label: "7 derniers jours" },
    { id: "30j", label: "30 derniers jours" },
    { id: "90j", label: "3 derniers mois" },
    { id: "1a", label: "1 an" }
  ];

  const metrics = [
    { id: "visits", label: "Visites", value: "2,847", change: "+12%", color: "text-blue-500" },
    { id: "conversions", label: "Conversions", value: "156", change: "+8%", color: "text-green-500" },
    { id: "revenue", label: "Chiffre d'affaires", value: "€12,450", change: "+23%", color: "text-fun-pink" },
    { id: "users", label: "Utilisateurs actifs", value: "1,234", change: "+15%", color: "text-purple-500" }
  ];

  const recentActivities = [
    { type: "sale", user: "Marie Dubois", amount: "€89", time: "Il y a 2 min", icon: "💰" },
    { type: "signup", user: "Pierre Martin", amount: "Nouveau compte", time: "Il y a 5 min", icon: "👤" },
    { type: "contact", user: "Sophie Bernard", amount: "Message", time: "Il y a 12 min", icon: "📧" },
    { type: "sale", user: "Jean Dupont", amount: "€156", time: "Il y a 18 min", icon: "💰" },
    { type: "review", user: "Anna Petit", amount: "5 étoiles", time: "Il y a 25 min", icon: "⭐" }
  ];

  const topPages = [
    { page: "/accueil", views: "1,245", percentage: "35%" },
    { page: "/services", views: "892", percentage: "25%" },
    { page: "/contact", views: "567", percentage: "16%" },
    { page: "/apropos", views: "445", percentage: "12%" },
    { page: "/blog", views: "401", percentage: "11%" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">📊 Tableau de Bord Admin</h2>
        <p className="text-fun-gray">
          Interface d'administration complète pour suivre les performances de votre site
        </p>
      </div>

      {/* Contrôles */}
      <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-fun-pink text-white'
                    : 'bg-bg text-fun-gray hover:bg-fun-pink-dark'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-fun-gray">
            Dernière mise à jour : Il y a 2 minutes
          </div>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-fun-gray">{metric.label}</h3>
              <span className={`text-sm font-bold ${metric.color}`}>{metric.change}</span>
            </div>
            <div className="text-3xl font-bold mb-2">{metric.value}</div>
            <div className="text-xs text-fun-gray">
              vs période précédente
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Graphique des visites */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Évolution des Visites</h3>
          <div className="h-64 bg-bg rounded-lg p-4 flex items-end justify-between">
            {[65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 98].map((height, index) => (
              <div
                key={index}
                className="bg-fun-pink rounded-t"
                style={{
                  height: `${height}%`,
                  width: '8%',
                  minHeight: '20px'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-fun-gray mt-2">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
          </div>
        </div>

        {/* Pages les plus visitées */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Pages les Plus Visitées</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold">{page.page}</div>
                  <div className="text-sm text-fun-gray">{page.views} vues</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-fun-pink">{page.percentage}</div>
                  <div className="w-20 bg-bg rounded-full h-2 mt-1">
                    <div 
                      className="bg-fun-pink h-2 rounded-full"
                      style={{ width: page.percentage }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Activité Récente</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold">{activity.user}</div>
                  <div className="text-sm text-fun-gray">{activity.amount}</div>
                </div>
                <div className="text-xs text-fun-gray">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources de trafic */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Sources de Trafic</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <span>Google</span>
              </div>
              <span className="font-bold">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-fun-pink rounded-full mr-3"></div>
                <span>Réseaux sociaux</span>
              </div>
              <span className="font-bold">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span>Direct</span>
              </div>
              <span className="font-bold">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                <span>Autres</span>
              </div>
              <span className="font-bold">9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-8 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-bg rounded-lg hover:bg-fun-pink-dark transition-colors">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-semibold">Envoyer Email</div>
          </button>
          <button className="p-4 bg-bg rounded-lg hover:bg-fun-pink-dark transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Exporter Données</div>
          </button>
          <button className="p-4 bg-bg rounded-lg hover:bg-fun-pink-dark transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Paramètres</div>
          </button>
          <button className="p-4 bg-bg rounded-lg hover:bg-fun-pink-dark transition-colors">
            <div className="text-2xl mb-2">🔔</div>
            <div className="font-semibold">Notifications</div>
          </button>
        </div>
      </div>

      {/* Coûts */}
      <div className="mt-8 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">💰 Coûts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span>Développement :</span>
              <span className="font-bold">600 €</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Coût récurrent :</span>
              <span className="font-bold text-fun-pink">0 €/mois</span>
            </div>
            <div className="text-sm text-fun-gray">
              Utilise vos données existantes - pas de service externe
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Fonctionnalités incluses :</h4>
            <ul className="text-sm space-y-1">
              <li>• Statistiques en temps réel</li>
              <li>• Export des données</li>
              <li>• Notifications automatiques</li>
              <li>• Interface responsive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDemo;
