# Stack et architecture

## Technologies utilisées

| Domaine | Technologie | Rôle dans MarkLab |
| --- | --- | --- |
| Application web | Nuxt 4, Vue 3, TypeScript | Pages, rendu, routage, serveur Nitro et typage. |
| Interface | Nuxt UI, Tailwind CSS, Auto Animate | Composants, styles, thème clair/sombre et animations. |
| État client | Pinia, `pinia-plugin-persistedstate` | Document en cours et préférence d’affichage. |
| Markdown | Nuxt MDC | Rendu du Markdown dans l’aperçu. |
| Validation | Zod | Validation partagée des données reçues par l’API et des formulaires. |
| Données | PostgreSQL, Drizzle ORM, `postgres.js` | Stockage relationnel, schéma et requêtes. |
| Authentification | Argon2, `jose` | Hachage de mots de passe et signature/vérification JWT. |
| Intégration Nuxt | NuxtHub | Configuration de services NuxtHub (PostgreSQL et KV). |

## Organisation du dépôt

```text
app/
  pages/          écrans et routes côté interface
  middleware/     protection des routes de l’interface
  stores/         état Pinia du document et des préférences
  composables/    logique réutilisable, notamment l’authentification
  utils/          schémas Zod et export de fichiers
server/
  api/            endpoints HTTP Nitro
  auth/           lecture de session et JWT
  db/             connexion, schéma Drizzle et migrations SQL
  domain/         entités métier User et Document
  repositories/   accès à PostgreSQL derrière des interfaces
  services/       règles métier et contrôle de propriété
docs/             documentation technique MkDocs
```

## Principe de séparation

L’API ne réalise pas directement toutes les requêtes SQL dans ses endpoints. Elle délègue la persistance à des *repositories* et les règles métier à des *services*. Par exemple, `DocumentService` vérifie que le document appartient au demandeur avant une lecture, une modification ou une suppression. Cette séparation réduit le couplage entre HTTP, logique métier et base de données.

## Circulation d’une modification de document

```text
Utilisateur
    ↓ saisie dans la page /documents/[slug]
Store Pinia (titre et contenu)
    ↓ temporisation de 750 ms ou Ctrl/Cmd + S
PATCH /api/docs/:id
    ↓ middleware serveur : utilisateur JWT obligatoire
DocumentService
    ↓ vérifie que userId est le propriétaire
DocumentRepository → PostgreSQL
    ↓ document mis à jour
Réponse JSON → état « Saved » dans l’interface
```

## Routage

Nuxt génère les routes à partir des fichiers de `app/pages/`. Les routes importantes sont `/`, `/log-in`, `/sign-up`, `/documents`, `/documents/:slug`, `/export/markdown` et `/export/text`. Les middlewares `auth` et `guest` adaptent la navigation selon la session de l’utilisateur.
