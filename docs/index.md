# MarkLab — Documentation technique

## Présentation

MarkLab est une application web de rédaction Markdown. Elle permet à un utilisateur de créer un compte, d’écrire des documents dans un éditeur à deux panneaux, de prévisualiser le résultat instantanément et de retrouver ses documents dans un espace privé.

Le projet est réalisé dans une optique de travail pratique individuel (TPI) CFC. Cette documentation décrit l’état effectivement implémenté du projet au 5 octobre 2026. Elle est structurée pour être publiée avec [MkDocs](https://www.mkdocs.org/).

## Périmètre implémenté

- Authentification par inscription, connexion et déconnexion.
- Gestion de documents privés : création, consultation, modification, suppression et liste triée par dernière modification.
- Saisie Markdown avec aperçu rendu, inversion des panneaux et mémorisation de la préférence d’affichage.
- Sauvegarde automatique et export du document courant au format Markdown ou texte brut.

## Lecture de la documentation

| Document | Contenu |
| --- | --- |
| [Contexte et objectifs](01-contexte-et-objectifs.md) | Besoin, utilisateurs et objectifs. |
| [Planification](02-planification.md) | Jalons effectivement réalisés. |
| [Stack et architecture](03-stack-et-architecture.md) | Technologies, structure et circulation des données. |
| [Fonctionnalités](04-fonctionnalites.md) | Parcours utilisateur et comportement de l’interface. |
| [Données et API](05-donnees-et-api.md) | Modèle relationnel et contrat HTTP. |
| [Sécurité](06-securite.md) | Contrôles de sécurité en place et limites. |
| [Installation et exploitation](07-installation-et-exploitation.md) | Préparation de l’environnement et commandes. |
| [Choix techniques et extraits](08-decisions-et-extraits.md) | Justification de choix et extraits représentatifs. |

## Publication locale avec MkDocs

Le fichier `mkdocs.yml` à la racine définit déjà la navigation. Après avoir installé MkDocs dans l’environnement choisi, la documentation peut être prévisualisée avec :

```bash
mkdocs serve
```

Puis elle est accessible par défaut à l’adresse indiquée par MkDocs, généralement `http://127.0.0.1:8000/`.
