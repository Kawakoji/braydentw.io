import React, { useState, useEffect } from 'react';

interface Skill {
  title: string;
  icon: string;
  style?: object;
}

interface Testimonial {
  quote: string;
  name: string;
  job: string;
}

export default function HomeEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/get-content?type=home', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Parser le contenu TypeScript pour extraire les données
        // Utiliser une regex plus robuste pour capturer les arrays multilignes
        const skillsMatch = data.raw.match(/export const skills: Skill\[\] = (\[[\s\S]*?\]);/);
        const testimonialsMatch = data.raw.match(/export const testimonials: Testimonial\[\] = (\[[\s\S]*?\]);/);

        if (skillsMatch && skillsMatch[1]) {
          try {
            // Utiliser Function constructor au lieu de eval pour plus de sécurité
            const skillsData = new Function('return ' + skillsMatch[1])();
            setSkills(skillsData);
          } catch (e) {
            console.error('Error parsing skills:', e);
            // Fallback: essayer de parser manuellement ou laisser vide
          }
        }

        if (testimonialsMatch && testimonialsMatch[1]) {
          try {
            const testimonialsData = new Function('return ' + testimonialsMatch[1])();
            setTestimonials(testimonialsData);
          } catch (e) {
            console.error('Error parsing testimonials:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { title: '', icon: '' }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { quote: '', name: '', job: '' }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Reconstruire le fichier TypeScript
      const skillsCode = `export const skills: Skill[] = ${JSON.stringify(skills, null, 2)};`;
      const testimonialsCode = `export const testimonials: Testimonial[] = ${JSON.stringify(testimonials, null, 2)};`;
      
      const fullContent = `type Skill = {
  title: string,
  icon: string,
  style?: object
};
type Testimonial = {
  quote: string,
  name: string,
  job: string
};


${skillsCode}

${testimonialsCode}
`;

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'home',
          content: fullContent,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Contenu sauvegardé avec succès !' });
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Page d'accueil</h2>
          <p className="text-gray-600 mt-1">Modifiez les compétences et témoignages</p>
        </div>
        <button
          onClick={saveContent}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Compétences</h3>
          <button
            onClick={addSkill}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={skill.title}
                    onChange={(e) => updateSkill(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icône (URL)</label>
                  <input
                    type="text"
                    value={skill.icon}
                    onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Témoignages</h3>
          <button
            onClick={addTestimonial}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Citation</label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                    <input
                      type="text"
                      value={testimonial.job}
                      onChange={(e) => updateTestimonial(index, 'job', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeTestimonial(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

