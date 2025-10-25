import React, { useState } from "react";

function BookingDemo() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1"
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">📅 Système de Réservation</h2>
        <p className="text-fun-gray">
          Exemple de module de réservation pour restaurant, salon, cabinet médical, etc.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire de réservation */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Réserver une table</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection de la date */}
            <div>
              <label className="block text-sm font-semibold mb-2">Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
              />
            </div>

            {/* Sélection de l'heure */}
            <div>
              <label className="block text-sm font-semibold mb-2">Heure *</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${selectedTime === time
                        ? 'bg-fun-pink text-white'
                        : 'bg-bg border border-fun-gray hover:border-fun-pink'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre de personnes */}
            <div>
              <label className="block text-sm font-semibold mb-2">Nombre de personnes *</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
                ))}
              </select>
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-semibold mb-2">Nom complet *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                placeholder="Jean Dupont"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                placeholder="jean@example.com"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                placeholder="06 12 34 56 78"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className="w-full py-3 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer la réservation
            </button>
          </form>
        </div>

        {/* Aperçu et informations */}
        <div className="space-y-6">
          {/* Calendrier visuel */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">📆 Disponibilités en temps réel</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-fun-gray">Aujourd'hui</span>
                <span className="text-green-400">● 12 créneaux disponibles</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fun-gray">Demain</span>
                <span className="text-green-400">● 15 créneaux disponibles</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fun-gray">Après-demain</span>
                <span className="text-yellow-400">● 5 créneaux disponibles</span>
              </div>
            </div>
          </div>

          {/* Fonctionnalités incluses */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">✨ Fonctionnalités incluses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Calendrier avec disponibilités en temps réel</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Sélection de créneaux horaires</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Confirmation par email automatique</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Gestion des annulations</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Interface d'administration</span>
              </li>
              <li className="flex items-start">
                <span className="text-fun-pink mr-2">✓</span>
                <span>Rappels SMS/Email (optionnel)</span>
              </li>
            </ul>
          </div>

          {/* Cas d'usage */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h4 className="font-bold mb-4">🎯 Idéal pour</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-fun-pink rounded-full text-xs">Restaurants</span>
              <span className="px-3 py-1 bg-fun-pink rounded-full text-xs">Salons</span>
              <span className="px-3 py-1 bg-fun-pink rounded-full text-xs">Cabinets médicaux</span>
              <span className="px-3 py-1 bg-fun-pink rounded-full text-xs">Coiffeurs</span>
              <span className="px-3 py-1 bg-fun-pink rounded-full text-xs">Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation popup */}
      {showConfirmation && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <div className="font-bold">Réservation confirmée !</div>
              <div className="text-sm">Un email de confirmation vous a été envoyé</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingDemo;









