# Contexte et objectifs

## Problématique

La rédaction en Markdown est simple, portable et adaptée à la documentation technique. Elle nécessite néanmoins souvent de passer d’un éditeur à un aperçu, de gérer les fichiers à la main et de choisir un outil de stockage séparé. MarkLab rassemble ces usages dans une application web : l’utilisateur rédige, visualise, sauvegarde et exporte son contenu depuis le même espace.

## Public cible

L’application s’adresse principalement à une personne qui rédige des notes, journaux de bord ou documents techniques en Markdown et souhaite les conserver dans un espace personnel accessible après authentification.

## Objectif principal

Fournir un éditeur Markdown web avec prévisualisation immédiate et persistance des documents par utilisateur, sans exposer les documents d’un compte à un autre.

## Objectifs fonctionnels

| Objectif | Résultat attendu |
| --- | --- |
| Gérer une identité utilisateur | Créer un compte, se connecter et se déconnecter. |
| Rédiger du Markdown | Saisir un titre et du contenu dans un éditeur. |
| Visualiser le résultat | Rendre le Markdown dans un panneau voisin. |
| Conserver le travail | Créer, lister, modifier et supprimer ses documents. |
| Limiter les pertes de saisie | Sauvegarder automatiquement après une courte pause. |
| Produire un fichier | Télécharger le contenu courant en `.md` ou `.txt`. |

## Hors périmètre actuel

Les fonctionnalités suivantes ne font pas partie de l’état implémenté : collaboration temps réel, partage public, historique de versions, dossiers ou étiquettes, import de fichiers, récupération de mot de passe et tests automatisés déclarés dans les scripts du projet.

Les dépendances Tiptap figurent dans `package.json`, mais l’interface actuelle utilise un champ texte et Nuxt MDC pour le rendu Markdown ; elles ne correspondent donc pas à une fonctionnalité active de l’interface.
