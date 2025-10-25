import React, { useState } from "react";

function MailingDemo() {
  const [emailData, setEmailData] = useState({
    subject: "",
    content: "",
    recipient: "",
    template: "newsletter"
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const templates = [
    { id: "newsletter", name: "Newsletter", icon: "📰" },
    { id: "welcome", name: "Bienvenue", icon: "👋" },
    { id: "promotion", name: "Promotion", icon: "🎯" },
    { id: "reminder", name: "Rappel", icon: "⏰" }
  ];

  const recipients = [
    { email: "marie@exemple.com", name: "Marie Dubois", status: "actif" },
    { email: "pierre@exemple.com", name: "Pierre Martin", status: "actif" },
    { email: "sophie@exemple.com", name: "Sophie Bernard", status: "inactif" },
    { email: "jean@exemple.com", name: "Jean Dupont", status: "actif" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const templateContent = {
    newsletter: {
      subject: "Notre newsletter mensuelle",
      content: "Découvrez nos dernières actualités et conseils..."
    },
    welcome: {
      subject: "Bienvenue chez nous !",
      content: "Merci de nous avoir rejoint. Découvrez nos services..."
    },
    promotion: {
      subject: "Offre spéciale - 20% de réduction",
      content: "Profitez de notre offre limitée dans le temps..."
    },
    reminder: {
      subject: "N'oubliez pas votre rendez-vous",
      content: "Rappel de votre rendez-vous prévu demain..."
    }
  };

  const currentTemplate = templateContent[emailData.template as keyof typeof templateContent];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">📧 Système de Mailing</h2>
        <p className="text-fun-gray">
          Exemple de système d'envoi d'emails automatiques et newsletters
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Création d'email */}
        <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Créer un Email</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection du template */}
            <div>
              <label className="block text-sm font-semibold mb-3">Type d'email *</label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <label
                    key={template.id}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      emailData.template === template.id
                        ? 'border-fun-pink bg-fun-pink-darkerer'
                        : 'border-fun-gray hover:border-fun-pink-dark'
                    }`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={emailData.template === template.id}
                      onChange={(e) => setEmailData({...emailData, template: e.target.value})}
                      className="mr-3"
                    />
                    <span className="text-2xl mr-3">{template.icon}</span>
                    <span className="font-semibold">{template.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Destinataire */}
            <div>
              <label className="block text-sm font-semibold mb-2">Destinataire *</label>
              <select
                value={emailData.recipient}
                onChange={(e) => setEmailData({...emailData, recipient: e.target.value})}
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                required
              >
                <option value="">Sélectionner un destinataire</option>
                {recipients.map((recipient, index) => (
                  <option key={index} value={recipient.email}>
                    {recipient.name} ({recipient.email}) - {recipient.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Sujet */}
            <div>
              <label className="block text-sm font-semibold mb-2">Sujet *</label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                placeholder={currentTemplate.subject}
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none"
                required
              />
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-semibold mb-2">Contenu *</label>
              <textarea
                value={emailData.content}
                onChange={(e) => setEmailData({...emailData, content: e.target.value})}
                rows={6}
                placeholder={currentTemplate.content}
                className="w-full px-4 py-2 bg-bg border border-fun-gray rounded-lg focus:border-fun-pink outline-none resize-none"
                required
              />
            </div>

            {/* Options d'envoi */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="tracking" className="mr-3" defaultChecked />
                <label htmlFor="tracking" className="text-sm">
                  Activer le suivi d'ouverture
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="scheduled" className="mr-3" />
                <label htmlFor="scheduled" className="text-sm">
                  Programmer l'envoi
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex-1 px-4 py-2 border-2 border-fun-gray text-fun-gray rounded-lg hover:border-fun-pink hover:text-fun-pink transition-colors"
              >
                Aperçu
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-fun-pink text-white rounded-lg font-semibold hover:opacity-75 transition-opacity"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>

        {/* Liste des contacts et statistiques */}
        <div className="space-y-6">
          {/* Liste des contacts */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">📋 Liste des Contacts</h3>
            <div className="space-y-3">
              {recipients.map((recipient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg rounded-lg">
                  <div>
                    <div className="font-semibold">{recipient.name}</div>
                    <div className="text-sm text-fun-gray">{recipient.email}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    recipient.status === 'actif' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-fun-gray text-fun-gray'
                  }`}>
                    {recipient.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-fun-gray">
              Total : {recipients.length} contacts
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">📊 Statistiques</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-fun-pink">2,847</div>
                <div className="text-sm text-fun-gray">Emails envoyés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">68%</div>
                <div className="text-sm text-fun-gray">Taux d'ouverture</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">12%</div>
                <div className="text-sm text-fun-gray">Taux de clic</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">1,234</div>
                <div className="text-sm text-fun-gray">Abonnés actifs</div>
              </div>
            </div>
          </div>

          {/* Coûts */}
          <div className="bg-fun-pink-darkerer border-2 border-fun-pink rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">💰 Coûts</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Développement :</span>
                <span className="font-bold">250 €</span>
              </div>
              <div className="flex justify-between">
                <span>Coût récurrent :</span>
                <span className="font-bold text-fun-pink">0 €/mois</span>
              </div>
              <div className="text-sm text-fun-gray">
                Utilise votre email professionnel (Gmail, Outlook, etc.)
              </div>
              <div className="text-xs text-fun-gray mt-2">
                Alternative : Service premium (20-50€/mois) pour gros volumes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu de l'email */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-bg border-2 border-fun-pink rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Aperçu de l'email</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-2xl hover:text-fun-pink"
              >
                ×
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="border-b pb-4 mb-4">
                <div className="text-sm text-fun-gray">À : {emailData.recipient || "Destinataire"}</div>
                <div className="text-sm text-fun-gray">Sujet : {emailData.subject || currentTemplate.subject}</div>
              </div>
              <div className="prose max-w-none">
                <p>{emailData.content || currentTemplate.content}</p>
                <div className="mt-6 p-4 bg-fun-pink-darkerer rounded-lg">
                  <p className="text-sm text-fun-gray">
                    Cet email a été envoyé via notre système de mailing automatisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-bg border-2 border-fun-pink rounded-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-2xl font-bold mb-2">Email envoyé !</h3>
            <p className="text-fun-gray">
              Votre email a été envoyé avec succès. Le destinataire recevra une notification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MailingDemo;
