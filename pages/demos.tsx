import React, { useState } from "react";
import Page from "@/components/utility/Page";
import BookingDemo from "@/components/demos/BookingDemo";
import PlanningDemo from "@/components/demos/PlanningDemo";
import ClientSpaceDemo from "@/components/demos/ClientSpaceDemo";

type DemoType = "booking" | "planning" | "client" | null;

export default function Demos() {
  const [activeDemo, setActiveDemo] = useState<DemoType>(null);

  const demos = [
    {
      id: "booking" as DemoType,
      title: "Réservation / Booking",
      description: "Système de réservation en ligne avec calendrier",
      icon: "📅",
      color: "bg-blue-500"
    },
    {
      id: "planning" as DemoType,
      title: "Planning / Agenda",
      description: "Gestion des disponibilités et rendez-vous",
      icon: "📆",
      color: "bg-purple-500"
    },
    {
      id: "client" as DemoType,
      title: "Espace Client",
      description: "Authentification et profils personnalisés",
      icon: "👤",
      color: "bg-green-500"
    },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case "booking":
        return <BookingDemo />;
      case "planning":
        return <PlanningDemo />;
      case "client":
        return <ClientSpaceDemo />;
      default:
        return null;
    }
  };

  return (
    <Page
      currentPage="Démos Modules"
      meta={{ desc: "Découvrez des exemples interactifs de chaque module disponible" }}
    >
      <div className="min-h-screen py-20">
        {!activeDemo ? (
          // Liste des démos
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Démos Interactives
              </h1>
              <p className="text-lg text-fun-gray max-w-2xl mx-auto">
                Explorez des exemples concrets de chaque module. Cliquez sur une démo
                pour voir à quoi ressemblera la fonctionnalité sur votre site.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {demos.map((demo) => (
                <div
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-8 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className={`w-16 h-16 ${demo.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                    {demo.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                  <p className="text-fun-gray text-sm mb-4">{demo.description}</p>
                  <div className="flex items-center text-fun-pink font-semibold">
                    Voir la démo
                    <span className="ml-2">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Note informative */}
            <div className="mt-12 bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start">
                <span className="text-3xl mr-4">💡</span>
                <div>
                  <h4 className="font-bold mb-2">À propos de ces démos</h4>
                  <p className="text-sm text-fun-gray">
                    Ces démos sont des exemples interactifs pour vous montrer le rendu final.
                    Les fonctionnalités réelles seront entièrement fonctionnelles et personnalisées
                    selon vos besoins spécifiques. Chaque module est développé sur mesure avec un
                    code propre et optimisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Affichage de la démo
          <div>
            <div className="max-w-7xl mx-auto px-6 mb-6">
              <button
                onClick={() => setActiveDemo(null)}
                className="flex items-center text-fun-pink hover:underline mb-4"
              >
                ← Retour aux démos
              </button>
            </div>
            {renderDemo()}
          </div>
        )}
      </div>
    </Page>
  );
}









