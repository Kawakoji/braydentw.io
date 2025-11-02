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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { type } = req.query;

  try {
    let content = {};

    switch (type) {
      case 'home': {
        const homePath = path.join(process.cwd(), 'data/content/home.ts');
        const homeContent = fs.readFileSync(homePath, 'utf8');
        content = { raw: homeContent };
        break;
      }

      case 'projects': {
        const projectsPath = path.join(process.cwd(), 'data/content/projects.ts');
        const projectsContent = fs.readFileSync(projectsPath, 'utf8');
        content = { raw: projectsContent };
        break;
      }

      case 'offres': {
        const offresPath = path.join(process.cwd(), 'data/content/offres.ts');
        const offresContent = fs.readFileSync(offresPath, 'utf8');
        content = { raw: offresContent };
        break;
      }

      case 'global': {
        const globalPath = path.join(process.cwd(), 'data/global.ts');
        const globalContent = fs.readFileSync(globalPath, 'utf8');
        content = { raw: globalContent };
        break;
      }

      default: {
        // Retourner tout le contenu
        const allContent = {
          home: fs.readFileSync(path.join(process.cwd(), 'data/content/home.ts'), 'utf8'),
          projects: fs.readFileSync(path.join(process.cwd(), 'data/content/projects.ts'), 'utf8'),
          offres: fs.readFileSync(path.join(process.cwd(), 'data/content/offres.ts'), 'utf8'),
          global: fs.readFileSync(path.join(process.cwd(), 'data/global.ts'), 'utf8'),
        };
        content = allContent;
        break;
      }
    }

    res.status(200).json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Erreur lors de la lecture du contenu' });
  }
}

