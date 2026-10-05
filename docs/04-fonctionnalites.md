# Fonctionnalités

## Authentification

Un visiteur peut créer un compte avec un nom d’utilisateur, une adresse e-mail et un mot de passe confirmé. Après une inscription ou une connexion réussie, le serveur place un jeton JWT dans un cookie HTTP-only. La page `log-out` invalide ce cookie côté navigateur.

Les pages d’inscription et de connexion sont réservées aux visiteurs ; une session déjà active est redirigée vers `/documents`. Inversement, l’espace de documents et les exports requièrent une session active.

## Gestion des documents

La page **Documents** présente les documents du compte connecté, triés par date de dernière modification décroissante. L’utilisateur peut :

- créer un document ;
- ouvrir un document existant ;
- modifier son titre et son contenu ;
- supprimer le document ouvert ;
- rafraîchir la liste.

Chaque document est lié à son propriétaire. Une demande visant l’identifiant d’un document d’un autre compte reçoit le même résultat qu’un document inexistant (`404`).

## Éditeur et aperçu

L’écran d’édition affiche un panneau de saisie et un panneau de prévisualisation. Nuxt MDC rend le contenu Markdown au fur et à mesure de la saisie. Le bouton d’inversion échange les positions des panneaux ; ce choix est conservé dans le `localStorage` via le store de préférences.

Le champ de texte ajuste sa hauteur à son contenu pour éviter une zone de saisie inutilement fixe.

## Sauvegarde

Après chaque modification, l’application attend 750 ms avant d’envoyer une mise à jour. Une nouvelle saisie pendant ce délai annule le minuteur précédent. L’utilisateur peut aussi déclencher immédiatement l’enregistrement avec `Ctrl + S` sous Windows/Linux ou `Cmd + S` sous macOS. Avant de quitter la route, l’application tente également d’enregistrer les changements en attente.

L’interface indique les états `Saving…`, `Saved` ou `Could not save`.

## Raccourcis

| Raccourci | Action |
| --- | --- |
| `Ctrl/Cmd + S` | Sauvegarder immédiatement dans l’éditeur d’un document existant. |
| `Ctrl/Cmd + Enter` | Donner le focus au champ du titre. |

## Export

Les entrées de navigation **Markdown** et **Text** téléchargent le contenu actuellement présent dans le store Pinia sous forme de fichier `.md` ou `.txt`. Si le document courant est vide, l’utilisateur est renvoyé à l’éditeur sans téléchargement.

Cette fonction exporte l’état en mémoire du client. Pour un document ouvert, la sauvegarde manuelle ou automatique permet de synchroniser cet état avec la base avant l’export.
