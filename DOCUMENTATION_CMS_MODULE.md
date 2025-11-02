# 📦 Module CMS Light - Documentation d'intégration

## Vue d'ensemble

Le **Module CMS Light** permet aux clients de modifier le contenu de leur site sans dépendre d'un développeur. Il s'intègre dans n'importe quel projet Next.js et offre une interface admin moderne et intuitive.

**Prix : 550€** | **Aucun coût récurrent**

---

## 🎯 Fonctionnalités incluses

- ✅ **Modification des textes** : Titres, descriptions, phrases d'accroche
- ✅ **Gestion des images** : Upload et remplacement d'images
- ✅ **Gestion des menus** : Ajout/suppression de rubriques de navigation
- ✅ **Gestion du footer** : Modification des liens et informations
- ✅ **Gestion de projets** : CRUD complet pour portfolios
- ✅ **Interface sécurisée** : Authentification par mot de passe
- ✅ **Design moderne** : Interface sobre inspirée de Notion/Google Drive

---

## 📦 Structure du module

```
cms-module/
├── pages/
│   ├── admin/
│   │   ├── login.tsx          # Page de connexion
│   │   └── index.tsx          # Dashboard admin
│   └── api/
│       ├── auth/
│       │   ├── login.js       # Authentification
│       │   ├── verify.js      # Vérification token
│       │   └── logout.js      # Déconnexion
│       └── admin/
│           ├── get-content.js  # Lecture du contenu
│           ├── save-content.js # Sauvegarde du contenu
│           └── upload-image.js # Upload d'images
├── components/
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── ImageUploader.tsx
│       └── editors/
│           ├── HomeEditor.tsx
│           ├── ProjectsEditor.tsx
│           ├── OffresEditor.tsx
│           └── GlobalEditor.tsx
└── lib/
    └── adminAuth.ts           # Utilitaires d'authentification
```

---

## 🚀 Installation dans un projet client

### Étape 1 : Copier les fichiers

Copiez tous les fichiers du module dans votre projet Next.js :

```bash
# Copier les pages
cp -r cms-module/pages/admin/* projet-client/pages/admin/
cp -r cms-module/pages/api/auth/* projet-client/pages/api/auth/
cp -r cms-module/pages/api/admin/* projet-client/pages/api/admin/

# Copier les composants
cp -r cms-module/components/admin/* projet-client/components/admin/

# Copier les utilitaires
cp -r cms-module/lib/* projet-client/lib/
```

### Étape 2 : Installer les dépendances

```bash
npm install formidable
```

### Étape 3 : Configurer le mot de passe admin

Créez un fichier `.env.local` à la racine du projet :

```env
ADMIN_PASSWORD=votre_mot_de_passe_securise
```

**Important :** Changez le mot de passe par défaut en production !

### Étape 4 : Adapter les éditeurs au contenu du client

Les éditeurs doivent être adaptés selon la structure des données du site client :

#### Exemple : Adapter HomeEditor pour un site e-commerce

```typescript
// components/admin/editors/HomeEditor.tsx
// Au lieu de "skills" et "testimonials", adaptez pour :
// - Produits en vedette
// - Catégories
// - Promotions
```

#### Structure des données

Le module lit/modifie les fichiers dans `data/content/`. Assurez-vous que la structure correspond :

```
data/
├── content/
│   ├── home.ts       # Contenu de la page d'accueil
│   ├── projects.ts   # Liste des projets
│   └── offres.ts     # Offres/services
└── global.ts         # Navigation, footer
```

### Étape 5 : Personnaliser les types

Dans chaque éditeur, adaptez les types TypeScript :

```typescript
// Exemple pour un site portfolio
interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  link?: string;
  tags: string[];
}
```

---

## 🔧 Personnalisation

### Modifier les sections éditable

1. **Créer un nouvel éditeur** :
   - Copiez `HomeEditor.tsx`
   - Adaptez les champs selon vos besoins
   - Ajoutez-le dans `pages/admin/index.tsx`

2. **Ajouter une nouvelle section** :
   ```typescript
   // Dans pages/admin/index.tsx
   const tabs = [
     // ... autres tabs
     { id: 'products', label: 'Produits', icon: '🛍️' },
   ];
   ```

3. **Créer l'API correspondante** :
   ```javascript
   // Dans pages/api/admin/get-content.js
   case 'products':
     const productsPath = path.join(process.cwd(), 'data/content/products.ts');
     const productsContent = fs.readFileSync(productsPath, 'utf8');
     content = { raw: productsContent };
     break;
   ```

### Personnaliser le design

Le design utilise Tailwind CSS. Modifiez les classes dans :
- `pages/admin/login.tsx`
- `pages/admin/index.tsx`
- `components/admin/editors/*.tsx`

---

## 🔒 Sécurité

### Points importants

1. **Mot de passe fort** : Utilisez un mot de passe sécurisé en production
2. **HTTPS obligatoire** : Le panel admin doit être accessible uniquement en HTTPS
3. **Token de session** : Le token est stocké localement (localStorage)
4. **Vérification serveur** : Toutes les API routes vérifient l'authentification

### Améliorations possibles

Pour une sécurité renforcée, vous pouvez :
- Implémenter un système de sessions avec cookies httpOnly
- Ajouter un rate limiting sur les API routes
- Utiliser bcrypt pour hasher les mots de passe
- Ajouter une double authentification (2FA)

---

## 📝 Exemple d'utilisation client

Une fois intégré, le client peut :

1. **Se connecter** : `/admin/login`
2. **Modifier le contenu** :
   - Aller dans l'onglet "Page d'accueil"
   - Modifier les textes
   - Cliquer sur "Enregistrer les modifications"
3. **Uploader une image** :
   - Cliquer sur "📤 Uploader"
   - Sélectionner l'image
   - L'URL est automatiquement remplie

---

## 🐛 Dépannage

### Le panel ne charge pas

- Vérifiez que toutes les dépendances sont installées
- Vérifiez les imports dans les fichiers
- Consultez la console du navigateur pour les erreurs

### Les modifications ne se sauvegardent pas

- Vérifiez les permissions d'écriture sur `data/content/`
- Vérifiez les logs serveur pour les erreurs
- Assurez-vous que le token est valide

### Upload d'images échoue

- Vérifiez que le dossier `public/static/` existe
- Vérifiez les permissions d'écriture
- Vérifiez la taille maximale (10MB par défaut)

---

## 💰 Tarification pour le client

Le module est facturé **550€** en une seule fois, sans coût récurrent.

**Avantages pour le client :**
- Autonomie totale sur le contenu
- Pas de dépendance au développeur
- Modifications instantanées
- Économie sur le long terme (évite de payer 50-100€ par modification)

---

## 📞 Support

Pour toute question sur l'intégration :
- Consultez cette documentation
- Vérifiez les exemples dans le code
- Contactez le développeur si besoin

---

## ✅ Checklist d'intégration

- [ ] Fichiers copiés dans le projet
- [ ] Dépendances installées (`formidable`)
- [ ] Variable d'environnement `ADMIN_PASSWORD` configurée
- [ ] Éditeurs adaptés au contenu du site client
- [ ] Types TypeScript mis à jour
- [ ] API routes fonctionnelles
- [ ] Upload d'images testé
- [ ] Authentification testée
- [ ] Design personnalisé si nécessaire
- [ ] Documentation client fournie (comment utiliser)

---

**Module développé par AdamDev** | **Version 1.0** | **2024**

