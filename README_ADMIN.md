# Module CMS - Panel de gestion AdamDev

## 📋 Fonctionnalités

Ce module permet de modifier le contenu du site sans avoir besoin d'un développeur :

- ✅ **Modification des textes** : Titres, descriptions, témoignages
- ✅ **Gestion des projets** : Ajouter, modifier, supprimer des projets
- ✅ **Gestion des images** : Upload d'images pour les projets et autres sections
- ✅ **Gestion des menus** : Ajouter/supprimer des rubriques de navigation
- ✅ **Gestion du footer** : Modifier les liens et informations du footer

## 🔐 Accès au panel admin

### Configuration initiale

1. **Définir le mot de passe admin** :
   
   Créez un fichier `.env.local` à la racine du projet avec :
   ```
   ADMIN_PASSWORD=votre_mot_de_passe_securise
   ```
   
   Si aucun mot de passe n'est défini, le mot de passe par défaut est `admin123` (à changer absolument en production).

2. **Accéder au panel** :
   
   Allez sur `/admin/login` et connectez-vous avec votre mot de passe.

## 🎯 Guide d'utilisation

### Page d'accueil (`HomeEditor`)

- **Compétences** : Modifiez la liste des technologies/skills affichées
  - Cliquez sur "+ Ajouter" pour ajouter une nouvelle compétence
  - Remplissez le titre et l'URL de l'icône
  - Cliquez sur "Supprimer" pour retirer une compétence

- **Témoignages** : Gérez les témoignages clients
  - Ajoutez/modifiez les citations, noms et postes
  - Utilisez le bouton "Supprimer" pour retirer un témoignage

### Projets (`ProjectsEditor`)

- **Ajouter un projet** : Cliquez sur "+ Ajouter un projet"
- **Modifier un projet** :
  - Titre, description, lien
  - Image : Utilisez le bouton "📤 Uploader" pour uploader une nouvelle image, ou entrez directement l'URL
  - Tags : Séparez les tags par des virgules (ex: "HTML, CSS, JavaScript")

### Navigation & Footer (`GlobalEditor`)

- **Menus de navigation** :
  - Ajoutez des rubriques avec leur chemin (ex: "/blog")
  - Les rubriques apparaîtront dans le menu principal

- **Footer** :
  - Modifiez les colonnes et liens du footer
  - Cochez "Lien externe" si le lien sort du site

### Offres (`OffresEditor`)

- Mode avancé : Édition directe du code TypeScript
- Permet de modifier les offres et modules disponibles

## 📤 Upload d'images

L'upload d'images est disponible dans l'éditeur de projets :
1. Cliquez sur "📤 Uploader"
2. Sélectionnez votre image
3. L'image sera automatiquement uploadée dans `/public/static/projects/`
4. L'URL sera automatiquement remplie dans le champ image

## 🔒 Sécurité

- Le panel est protégé par authentification
- Les modifications nécessitent une connexion valide
- Le token de session est stocké localement dans le navigateur
- Changez le mot de passe par défaut en production !

## ⚠️ Notes importantes

1. **Sauvegarde** : N'oubliez pas de cliquer sur "Enregistrer les modifications" après chaque modification
2. **Images** : Les images uploadées sont stockées dans `/public/static/`
3. **Format** : Respectez le format TypeScript lors de l'édition manuelle (OffresEditor)
4. **Backup** : Il est recommandé de faire des sauvegardes régulières des fichiers dans `data/content/`

## 🚀 Prix

Ce module est vendu à **550€**.

## 📝 Support

Pour toute question ou problème, contactez le développeur.

