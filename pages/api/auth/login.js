import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Password par défaut, à changer

  if (password === adminPassword) {
    // Créer une session simple avec un token
    const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
    
    // Stocker le token dans un fichier temporaire (en production, utiliser une vraie session)
    const tokenFile = path.join(process.cwd(), '.admin-token');
    fs.writeFileSync(tokenFile, token);

    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Mot de passe incorrect' });
  }
}

