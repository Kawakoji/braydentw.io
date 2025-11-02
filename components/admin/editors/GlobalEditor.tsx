import React, { useState, useEffect } from 'react';

interface Route {
  title: string;
  path: string;
}

interface FooterLink {
  name: string;
  link: string;
  icon?: string;
  leavesWebsite: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface Footer {
  columns: FooterColumn[];
  support: {
    buymeacoffee: string;
    paypal: string;
    message: string;
  };
}

export default function GlobalEditor() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [footer, setFooter] = useState<Footer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/get-content?type=global', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Parser le contenu
        const routesMatch = data.raw.match(/export const routes: Route\[\] = (\[[\s\S]*?\]);/);
        const footerMatch = data.raw.match(/export const footer: Footer = ({[\s\S]*?});/);

        if (routesMatch && routesMatch[1]) {
          try {
            const routesData = new Function('return ' + routesMatch[1])();
            setRoutes(routesData);
          } catch (e) {
            console.error('Error parsing routes:', e);
          }
        }

        if (footerMatch && footerMatch[1]) {
          try {
            const footerData = new Function('return ' + footerMatch[1])();
            setFooter(footerData);
          } catch (e) {
            console.error('Error parsing footer:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRoute = (index: number, field: keyof Route, value: string) => {
    const updated = [...routes];
    updated[index] = { ...updated[index], [field]: value };
    setRoutes(updated);
  };

  const addRoute = () => {
    setRoutes([...routes, { title: '', path: '' }]);
  };

  const removeRoute = (index: number) => {
    setRoutes(routes.filter((_, i) => i !== index));
  };

  const updateFooterLink = (colIndex: number, linkIndex: number, field: keyof FooterLink, value: string | boolean) => {
    if (!footer) return;
    const updated = { ...footer };
    updated.columns[colIndex].links[linkIndex] = {
      ...updated.columns[colIndex].links[linkIndex],
      [field]: value,
    };
    setFooter(updated);
  };

  const addFooterLink = (colIndex: number) => {
    if (!footer) return;
    const updated = { ...footer };
    updated.columns[colIndex].links.push({
      name: '',
      link: '',
      leavesWebsite: false,
    });
    setFooter(updated);
  };

  const removeFooterLink = (colIndex: number, linkIndex: number) => {
    if (!footer) return;
    const updated = { ...footer };
    updated.columns[colIndex].links = updated.columns[colIndex].links.filter((_, i) => i !== linkIndex);
    setFooter(updated);
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const routesCode = `export const routes: Route[] = ${JSON.stringify(routes, null, 2)};`;
      const footerCode = footer ? `export const footer: Footer = ${JSON.stringify(footer, null, 2)};` : '';
      
      const fullContent = `type Route = {
  title: string,
  path: string
}

type FooterCol = {
  title: string,
  links: {
    name: string,
    link: string,
    icon?: string,
    leavesWebsite: boolean
  }[]
}

type Footer = {
  columns: FooterCol[]
  support: {
    buymeacoffee: string
    paypal: string
    message: string
  }
};

${routesCode}


${footerCode}
`;

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'global',
          content: fullContent,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Navigation et footer sauvegardés avec succès !' });
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
          <h2 className="text-2xl font-bold text-gray-900">Navigation & Footer</h2>
          <p className="text-gray-600 mt-1">Gérez les menus et le footer</p>
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

      {/* Routes Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Menus de navigation</h3>
          <button
            onClick={addRoute}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {routes.map((route, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={route.title}
                    onChange={(e) => updateRoute(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chemin</label>
                  <input
                    type="text"
                    value={route.path}
                    onChange={(e) => updateRoute(index, 'path', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/page"
                  />
                </div>
              </div>
              <button
                onClick={() => removeRoute(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      {footer && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer</h3>

          {footer.columns.map((column, colIndex) => (
            <div key={colIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{column.title}</h4>
                <button
                  onClick={() => addFooterLink(colIndex)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  + Ajouter un lien
                </button>
              </div>

              <div className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="border border-gray-200 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => updateFooterLink(colIndex, linkIndex, 'name', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Lien</label>
                        <input
                          type="text"
                          value={link.link}
                          onChange={(e) => updateFooterLink(colIndex, linkIndex, 'link', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={link.leavesWebsite}
                          onChange={(e) => updateFooterLink(colIndex, linkIndex, 'leavesWebsite', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Lien externe</span>
                      </label>
                      <button
                        onClick={() => removeFooterLink(colIndex, linkIndex)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

