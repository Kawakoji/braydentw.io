import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkAuth, logout } from '@/lib/adminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import HomeEditor from '@/components/admin/editors/HomeEditor';
import ProjectsEditor from '@/components/admin/editors/ProjectsEditor';
import OffresEditor from '@/components/admin/editors/OffresEditor';
import GlobalEditor from '@/components/admin/editors/GlobalEditor';

type Tab = 'home' | 'projects' | 'offres' | 'global';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const isValid = await checkAuth();
      if (!isValid) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    verify();
  }, [router]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const tabs = [
    { id: 'home' as Tab, label: 'Page d\'accueil', icon: '🏠' },
    { id: 'projects' as Tab, label: 'Projets', icon: '💼' },
    { id: 'offres' as Tab, label: 'Offres', icon: '💰' },
    { id: 'global' as Tab, label: 'Navigation & Footer', icon: '⚙️' },
  ];

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Panel AdamDev</h1>
            <p className="text-sm text-gray-500 mt-1">Gestion de contenu</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">
            {activeTab === 'home' && <HomeEditor />}
            {activeTab === 'projects' && <ProjectsEditor />}
            {activeTab === 'offres' && <OffresEditor />}
            {activeTab === 'global' && <GlobalEditor />}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
