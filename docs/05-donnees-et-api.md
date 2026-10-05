# Données et API

## Modèle de données

Deux tables constituent le modèle relationnel.

| Table | Champs principaux | Rôle |
| --- | --- | --- |
| `users` | `id` (UUID), `username`, `email` unique, `password`, `created_at` | Compte utilisateur. Le champ `password` contient uniquement le hachage Argon2. |
| `documents` | `id` (UUID), `user_id`, `title`, `content`, `created_at`, `updated_at` | Document Markdown appartenant à un utilisateur. |

La clé étrangère `documents.user_id` référence `users.id` avec suppression en cascade. La suppression d’un compte entraîne donc celle de ses documents. Les identifiants sont générés par PostgreSQL sous forme d’UUID.

```text
users (1) ──────── (n) documents
  id                   user_id → users.id
```

## Validation

Les schémas Zod situés dans `app/utils/schemas.ts` définissent notamment :

- adresse e-mail valide et mot de passe d’au moins 8 caractères pour la connexion ;
- nom d’utilisateur de 5 à 50 caractères et confirmation du mot de passe pour l’inscription ;
- UUID valide dans les paramètres d’une route de document ;
- titre de document non vide, nettoyé et limité à 255 caractères ;
- contenu de document sous forme de chaîne de caractères.

La même définition est utilisée par les formulaires Nuxt UI et par les routes serveur. Une donnée incorrecte est rejetée avec le statut HTTP `400`.

## Endpoints d’authentification

| Méthode | Route | Authentification | Résultat principal |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Non | Crée le compte et pose le cookie de session ; `409` si l’e-mail existe. |
| `POST` | `/api/auth/login` | Non | Vérifie les identifiants et pose le cookie de session ; `403` sinon. |
| `GET` | `/api/auth/me` | Oui | Retourne les données publiques de l’utilisateur connecté. |
| `POST` | `/api/auth/logout` | Oui | Supprime le cookie de session. |

## Endpoints des documents

Le middleware serveur intercepte toutes les routes commençant par `/api/docs`. Sans session valide, il retourne `401 Unauthorized` avant l’exécution de l’endpoint.

| Méthode | Route | Description | Réponses notables |
| --- | --- | --- | --- |
| `GET` | `/api/docs` | Liste les documents du compte, triés par modification décroissante. | `200`, `401` |
| `POST` | `/api/docs` | Crée un document. Titre par défaut : `New Document`. | `201`, `400`, `401` |
| `GET` | `/api/docs/:id` | Retourne un document du propriétaire. | `200`, `400`, `401`, `404` |
| `PATCH` | `/api/docs/:id` | Modifie le titre et le contenu d’un document du propriétaire. | `200`, `400`, `401`, `404` |
| `DELETE` | `/api/docs/:id` | Supprime un document du propriétaire. | `204`, `400`, `401`, `404` |

Les réponses ne retournent jamais le mot de passe. Pour la liste, l’API réduit également les données à l’identifiant, au titre et aux dates : le contenu complet n’est chargé qu’à l’ouverture du document.
