import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;
  
  try {
    const tokenFile = path.join(process.cwd(), '.admin-token');
    if (fs.existsSync(tokenFile)) {
      const storedToken = fs.readFileSync(tokenFile, 'utf8').trim();
      if (token === storedToken) {
        return res.status(200).json({ valid: true });
      }
    }
  } catch (error) {
    // Ignore errors
  }

  res.status(401).json({ valid: false });
}

