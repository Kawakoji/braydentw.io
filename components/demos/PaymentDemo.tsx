import React, { useState } from "react";

function PaymentDemo() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentMethods = [
    { id: "stripe", name: "Carte Bancaire", icon: "💳", fee: "1,4% + 0,25€" },
    { id: "paypal", name: "PayPal", icon: "🅿️", fee: "2,9% + 0,35€" },
    { id: "lydia", name: "Lydia Pro", icon: "📱", fee: "0,5% par transaction" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">💳 Système de Paiement</h2>
        <p className="text-fun-gray">
          Exemple d'intégration de paiement sécurisé pour e-commerce, services, etc.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire de paiement */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Finaliser votre commande</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Résumé de la commande</h4>
            <div className="bg-bg p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Service Premium</span>
                <span>99,00 €</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de traitement</span>
                <span>1,66 €</span>
              </div>
              <hr className="border-fun-gray" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>100,66 €</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Méthodes de paiement */}
            <div>
              <label className="block text-sm font-semibold mb-3">Méthode de paiement *</label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-fun-pink bg-fun-pink-darkerer'
                        : 'border-fun-gray hover:border-fun-pink-dark'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-xs text-fun-gray">Frais : {method.fee}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Informations carte (si carte sélectionnée) */}
            {selectedMethod === "stripe" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Numéro de carte *</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date d'expiration *</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">CVV *</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nom sur la carte *</label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email de confirmation *</label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-fun-pink text-white rounded-lg font-bold hover:opacity-75 transition-opacity"
            >
              Payer {selectedMethod === "stripe" ? "100,66 €" : "99,00 €"}
            </button>
          </form>
        </div>

        {/* Informations et sécurité */}
        <div className="space-y-6">
          {/* Sécurité */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">🔒 Sécurité des Paiements</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                <div>
                  <div className="font-semibold">Chiffrement SSL</div>
                  <div className="text-sm text-fun-gray">Toutes les données sont cryptées</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <div className="font-semibold">Conformité PCI DSS</div>
                  <div className="text-sm text-fun-gray">Standards bancaires internationaux</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔐</span>
                <div>
                  <div className="font-semibold">3D Secure</div>
                  <div className="text-sm text-fun-gray">Authentification renforcée</div>
                </div>
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">⚡ Fonctionnalités</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="text-fun-pink mr-2">✓</span>
                Paiement en une fois ou en plusieurs fois
              </li>
              <li className="flex items-center">
                <span className="text-fun-pink mr-2">✓</span>
                Remboursements automatiques
              </li>
              <li className="flex items-center">
                <span className="text-fun-pink mr-2">✓</span>
                Notifications par email/SMS
              </li>
              <li className="flex items-center">
                <span className="text-fun-pink mr-2">✓</span>
                Gestion des abonnements
              </li>
              <li className="flex items-center">
                <span className="text-fun-pink mr-2">✓</span>
                Interface d'administration
              </li>
            </ul>
          </div>

          {/* Coûts */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">💰 Coûts</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Développement :</span>
                <span className="font-bold">400 €</span>
              </div>
              <div className="flex justify-between">
                <span>Coût récurrent :</span>
                <span className="font-bold text-fun-pink">1,4% + 0,25€ par transaction</span>
              </div>
              <div className="text-xs text-fun-gray mt-2">
                Pas d'abonnement mensuel - seulement les frais de transaction
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
            <h3 className="text-2xl font-bold mb-2">Paiement réussi !</h3>
            <p className="text-fun-gray">
              Votre commande a été traitée avec succès. Vous recevrez un email de confirmation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentDemo;
