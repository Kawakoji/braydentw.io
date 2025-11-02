import fs from 'fs';
import path from 'path';

// Middleware pour vérifier l'authentification
function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return false;

  try {
    const tokenFile = path.join(process.cwd(), '.admin-token');
    if (fs.existsSync(tokenFile)) {
      const storedToken = fs.readFileSync(tokenFile, 'utf8').trim();
      return token === storedToken;
    }
  } catch {
    return false;
  }
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { type, content } = req.body;

  if (!type || !content) {
    return res.status(400).json({ error: 'Type et contenu requis' });
  }

  try {
    let filePath;

    switch (type) {
      case 'home':
        filePath = path.join(process.cwd(), 'data/content/home.ts');
        break;
      case 'projects':
        filePath = path.join(process.cwd(), 'data/content/projects.ts');
        break;
      case 'offres':
        filePath = path.join(process.cwd(), 'data/content/offres.ts');
        break;
      case 'global':
        filePath = path.join(process.cwd(), 'data/global.ts');
        break;
      default:
        return res.status(400).json({ error: 'Type invalide' });
    }

    // Sauvegarder le contenu
    fs.writeFileSync(filePath, content, 'utf8');

    res.status(200).json({ success: true, message: 'Contenu sauvegardé avec succès' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde du contenu' });
  }
}

