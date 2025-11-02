import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'static'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    
    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }

    // Déterminer le dossier de destination selon le type
    const folder = Array.isArray(fields.folder) ? fields.folder[0] : fields.folder || 'misc';
    const destDir = path.join(process.cwd(), 'public', 'static', folder);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Déplacer le fichier vers le bon dossier
    const filename = file.newFilename || file.originalFilename;
    const newPath = path.join(destDir, filename);
    
    // Si le fichier n'est pas déjà au bon endroit, le déplacer
    if (file.filepath !== newPath) {
      fs.renameSync(file.filepath, newPath);
    }

    // Retourner l'URL relative
    const relativePath = `/static/${folder}/${filename}`;

    res.status(200).json({ 
      success: true, 
      url: relativePath,
      filename: filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
  }
}

