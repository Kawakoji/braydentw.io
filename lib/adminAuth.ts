// Utilitaire pour vérifier l'authentification côté client
export const checkAuth = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return data.valid === true;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  const token = localStorage.getItem('adminToken');
  if (token) {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
};

