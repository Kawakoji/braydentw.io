import React, { useState } from "react";

function PlanningDemo() {
  const [selectedView, setSelectedView] = useState<"week" | "month">("week");
  
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`);

  const appointments = [
    { day: 0, hour: 2, duration: 1, title: "Rdv Client A", color: "bg-blue-500" },
    { day: 1, hour: 4, duration: 2, title: "Réunion Projet", color: "bg-purple-500" },
    { day: 2, hour: 1, duration: 1, title: "Consultation", color: "bg-green-500" },
    { day: 3, hour: 3, duration: 1, title: "Rdv Client B", color: "bg-yellow-500" },
    { day: 4, hour: 5, duration: 2, title: "Formation", color: "bg-red-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">📆 Planning / Agenda</h2>
        <p className="text-fun-gray">
          Gestion des disponibilités et rendez-vous avec vue calendrier
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendrier principal */}
        <div className="lg:col-span-3">
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            {/* Header du calendrier */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-bg border border-fun-gray rounded-lg hover:border-fun-pink">
                  ← Semaine précédente
                </button>
                <h3 className="text-xl font-bold">Semaine du 15-21 Janvier 2025</h3>
                <button className="px-4 py-2 bg-bg border border-fun-gray rounded-lg hover:border-fun-pink">
                  Semaine suivante →
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedView("week")}
                  className={`px-4 py-2 rounded-lg ${
                    selectedView === "week" ? "bg-fun-pink" : "bg-bg border border-fun-gray"
                  }`}
                >
                  Semaine
                </button>
                <button
                  onClick={() => setSelectedView("month")}
                  className={`px-4 py-2 rounded-lg ${
                    selectedView === "month" ? "bg-fun-pink" : "bg-bg border border-fun-gray"
                  }`}
                >
                  Mois
                </button>
              </div>
            </div>

            {/* Grille du planning */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* En-tête des jours */}
                <div className="grid grid-cols-8 gap-2 mb-2">
                  <div className="text-center font-bold text-sm">Heure</div>
                  {daysOfWeek.map((day, idx) => (
                    <div key={idx} className="text-center font-bold text-sm">
                      <div>{day}</div>
                      <div className="text-xs text-fun-gray">{15 + idx} Jan</div>
                    </div>
                  ))}
                </div>

                {/* Lignes horaires */}
                <div className="relative">
                  {hours.map((hour, hourIdx) => (
                    <div key={hour} className="grid grid-cols-8 gap-2 mb-1">
                      <div className="text-xs text-fun-gray text-right pr-2">{hour}</div>
                      {daysOfWeek.map((_, dayIdx) => (
                        <div
                          key={dayIdx}
                          className="bg-bg border border-fun-gray rounded min-h-[60px] hover:border-fun-pink cursor-pointer relative"
                        >
                          {appointments
                            .filter(apt => apt.day === dayIdx && apt.hour === hourIdx)
                            .map((apt, aptIdx) => (
                              <div
                                key={aptIdx}
                                className={`${apt.color} text-white text-xs p-2 rounded absolute inset-0 m-1 overflow-hidden`}
                                style={{ height: `${apt.duration * 60}px` }}
                              >
                                <div className="font-bold">{apt.title}</div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar d'informations */}
        <div className="space-y-6">
          {/* Prochains rendez-vous */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">🔔 Aujourd'hui</h4>
            <div className="space-y-3">
              <div className="bg-bg p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Rdv Client A</span>
                  <span className="text-xs bg-blue-500 px-2 py-1 rounded">11:00</span>
                </div>
                <p className="text-xs text-fun-gray">Durée: 1h</p>
              </div>
              <div className="bg-bg p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Réunion Projet</span>
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded">15:00</span>
                </div>
                <p className="text-xs text-fun-gray">Durée: 2h</p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">📊 Cette semaine</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-fun-gray">Total RDV</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fun-gray">Heures réservées</span>
                <span className="font-bold">18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fun-gray">Taux occupation</span>
                <span className="font-bold text-green-400">75%</span>
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">✨ Fonctionnalités</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Vue semaine / mois</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Glisser-déposer les RDV</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Notifications automatiques</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Synchronisation calendrier</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Gestion des créneaux</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanningDemo;









