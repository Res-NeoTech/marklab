# Sécurité

## Mesures implémentées

| Sujet | Mesure |
| --- | --- |
| Mots de passe | Le mot de passe n’est pas stocké en clair. `argon2.hash()` crée un hachage et `argon2.verify()` le vérifie à la connexion. |
| Session | Le JWT est signé en HS256 avec `JWT_SECRET`, expire après 31 jours et est placé dans un cookie `httpOnly`. |
| Cookie | Le cookie utilise `sameSite: 'lax'`, le chemin `/` et l’attribut `secure` en production. |
| Accès aux routes | Le middleware serveur exige un utilisateur authentifié pour toute route `/api/docs`. |
| Isolation des données | Le service compare `document.userId` à l’identité extraite du JWT avant lecture, modification ou suppression. Les requêtes de mise à jour/suppression filtrent aussi par les deux identifiants. |
| Validation | Zod contrôle le corps des requêtes et la validité des UUID avant d’atteindre la couche de persistance. |
| Secret | `.env` et `.env.*` sont exclus de Git ; `JWT_SECRET` est lu à l’exécution via `runtimeConfig`. |

## Gestion d’autorisation

Le contrôle d’accès aux documents est réalisé à deux niveaux :

1. Le middleware établit l’identité à partir du cookie signé et bloque les appels anonymes.
2. `DocumentService` refuse un document qui n’appartient pas à l’utilisateur connecté ; le repository conserve cette contrainte dans les clauses `WHERE` d’écriture.

Cette double vérification évite qu’un simple UUID deviné donne accès au contenu d’un autre compte.

## Points d’attention pour une mise en production

- Générer un `JWT_SECRET` long, aléatoire et propre à chaque environnement.
- Servir l’application uniquement en HTTPS afin que l’attribut `secure` du cookie soit effectif.
- Ajouter une protection CSRF adaptée aux opérations d’écriture si l’application est exposée sur un domaine public.
- Ajouter une limitation de débit sur l’inscription et la connexion pour réduire les tentatives automatisées.
- Définir une politique de mots de passe plus complète et un mécanisme de récupération de compte si le besoin apparaît.
- Prévoir journalisation, sauvegardes PostgreSQL et surveillance avant une mise en production.

Ces recommandations sont des améliorations à planifier : elles ne doivent pas être présentées comme déjà implémentées.
