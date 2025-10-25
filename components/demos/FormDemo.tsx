import React, { useState } from "react";

function FormDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
    newsletter: false,
    urgency: "normal"
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    { id: "website", name: "Site Web", price: "À partir de 500€" },
    { id: "ecommerce", name: "E-commerce", price: "À partir de 1500€" },
    { id: "app", name: "Application", price: "Sur devis" },
    { id: "maintenance", name: "Maintenance", price: "À partir de 100€/mois" }
  ];

  const budgets = [
    { id: "500-1000", label: "500€ - 1000€" },
    { id: "1000-3000", label: "1000€ - 3000€" },
    { id: "3000-5000", label: "3000€ - 5000€" },
    { id: "5000+", label: "Plus de 5000€" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(1);
      setFormData({
        name: "", email: "", phone: "", service: "", budget: "", 
        message: "", newsletter: false, urgency: "normal"
      });
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">📝 Formulaire Avancé</h2>
        <p className="text-fun-gray">
          Exemple de formulaire avec logique conditionnelle et envoi dynamique
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire multi-étapes */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Demande de Devis</h3>
          
          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep ? 'bg-fun-pink text-white' : 'bg-fun-gray text-fun-gray'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-fun-pink' : 'bg-fun-gray'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Vos informations</h4>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    placeholder="jean@exemple.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Urgence du projet</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  >
                    <option value="normal">Normal (1-2 mois)</option>
                    <option value="urgent">Urgent (2-4 semaines)</option>
                    <option value="very-urgent">Très urgent (1-2 semaines)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Étape 2: Projet */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Votre projet</h4>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Type de service *</label>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.service === service.id
                            ? 'border-fun-pink bg-fun-pink-darkerer'
                            : 'border-fun-gray hover:border-fun-pink-dark'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={formData.service === service.id}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-sm text-fun-gray">{service.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Budget estimé</label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgets.map((budget) => (
                      <label
                        key={budget.id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.budget === budget.id
                            ? 'border-fun-pink bg-fun-pink-darkerer'
                            : 'border-fun-gray hover:border-fun-pink-dark'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={budget.id}
                          checked={formData.budget === budget.id}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{budget.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Détails */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Détails du projet</h4>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Description du projet *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none resize-none"
                    placeholder="Décrivez votre projet en détail..."
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="mr-3"
                  />
                  <label htmlFor="newsletter" className="text-sm">
                    Je souhaite recevoir des conseils et actualités par email
                  </label>
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border-2 border-fun-gray text-fun-gray rounded-lg hover:border-fun-pink hover:text-fun-pink transition-colors"
                >
                  ← Précédent
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-2 bg-fun-pink text-white rounded-lg font-semibold hover:opacity-75 transition-opacity"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75 transition-opacity"
                >
                  Envoyer la demande
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Fonctionnalités et logique */}
        <div className="space-y-6">
          {/* Logique conditionnelle */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">🧠 Logique Conditionnelle</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📋</span>
                <div>
                  <div className="font-semibold">Étapes dynamiques</div>
                  <div className="text-sm text-fun-gray">Le formulaire s'adapte selon les réponses</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚡</span>
                <div>
                  <div className="font-semibold">Validation en temps réel</div>
                  <div className="text-sm text-fun-gray">Vérification instantanée des données</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <div className="font-semibold">Personnalisation</div>
                  <div className="text-sm text-fun-gray">Champs qui apparaissent selon les besoins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Envoi dynamique */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">📧 Envoi Dynamique</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📨</span>
                <div>
                  <div className="font-semibold">Email automatique</div>
                  <div className="text-sm text-fun-gray">Confirmation immédiate au client</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <div className="font-semibold">Base de données</div>
                  <div className="text-sm text-fun-gray">Sauvegarde automatique des données</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔔</span>
                <div>
                  <div className="font-semibold">Notifications</div>
                  <div className="text-sm text-fun-gray">Alerte immédiate pour l'administrateur</div>
                </div>
              </div>
            </div>
          </div>

          {/* Coûts */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">💰 Coûts</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Développement :</span>
                <span className="font-bold">150 €</span>
              </div>
              <div className="flex justify-between">
                <span>Coût récurrent :</span>
                <span className="font-bold text-fun-pink">0 €/mois</span>
              </div>
              <div className="text-sm text-fun-gray">
                Développement custom - pas d'abonnement
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-bg border-2 border-fun-pink rounded-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
            <p className="text-fun-gray">
              Votre demande a été transmise avec succès. Nous vous recontacterons rapidement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormDemo;
