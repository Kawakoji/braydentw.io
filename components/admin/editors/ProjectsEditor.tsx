import React, { useState, useEffect } from 'react';
import ImageUploader from '../ImageUploader';

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  link?: string;
  github?: string;
  tags: string[];
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/get-content?type=projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Parser le contenu TypeScript
        const projectsMatch = data.raw.match(/const projects: Project\[\] = (\[[\s\S]*?\]);/);
        
        if (projectsMatch && projectsMatch[1]) {
          try {
            const projectsData = new Function('return ' + projectsMatch[1])();
            setProjects(projectsData);
          } catch (e) {
            console.error('Error parsing projects:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const updateTags = (index: number, tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    updateProject(index, 'tags', tags);
  };

  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 0;
    setProjects([...projects, { id: newId, title: '', desc: '', img: '', link: '', tags: [] }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleImageUpload = (index: number, url: string) => {
    updateProject(index, 'img', url);
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const projectsCode = `const projects: Project[] = ${JSON.stringify(projects, null, 2)};`;
      const allTagsCode = `export const allTags = []\n\nprojects.forEach((project) => {\n  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))\n});\n\n`;
      
      const fullContent = `import { kebabCase, kebabArray } from "@/utils/utils";
import { Project } from "types";

${projectsCode}

${allTagsCode}
export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export default projects
`;

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'projects',
          content: fullContent,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Projets sauvegardés avec succès !' });
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
          <h2 className="text-2xl font-bold text-gray-900">Projets</h2>
          <p className="text-gray-600 mt-1">Gérez vos projets portfolio</p>
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

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Liste des projets</h3>
          <button
            onClick={addProject}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Ajouter un projet
          </button>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien</label>
                    <input
                      type="text"
                      value={project.link || ''}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={project.desc}
                    onChange={(e) => updateProject(index, 'desc', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={project.img}
                      onChange={(e) => updateProject(index, 'img', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="/static/projects/image.png"
                    />
                    <ImageUploader
                      folder="projects"
                      onUpload={(url) => handleImageUpload(index, url)}
                    />
                  </div>
                  {project.img && (
                    <div className="mt-2">
                      <img src={project.img} alt={project.title} className="max-w-xs h-32 object-cover rounded" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={project.tags.join(', ')}
                    onChange={(e) => updateTags(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="HTML, CSS, JavaScript"
                  />
                </div>
              </div>
              <button
                onClick={() => removeProject(index)}
                className="mt-4 text-sm text-red-600 hover:text-red-700"
              >
                Supprimer ce projet
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

