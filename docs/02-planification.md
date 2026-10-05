# Planification et avancement

## Méthode de suivi

Le suivi de développement est consigné dans `logBook.md`. Le tableau ci-dessous reprend les jalons réalisés ; il ne transforme pas le journal en plan prévisionnel a posteriori. Les dates sont celles des entrées du journal de bord.

## Jalons réalisés

| Date | Jalons réalisés |
| --- | --- |
| 31.08.2026 | Initialisation de Nuxt, NuxtHub, PostgreSQL/Drizzle et des composants UI ; création du dépôt scolaire. |
| 01.09.2026 | Configuration de Nuxt UI, du layout et préparation du planning. |
| 07.09.2026 | Approfondissement du layout de l’application. |
| 08.09.2026 | Résolution de problèmes de migration ; premier éditeur Markdown avec persistance locale. |
| 14.09.2026 | Améliorations UX de l’éditeur, titre, inversion de panneaux et persistance des préférences. |
| 15.09.2026 | Raccourcis clavier et export aux formats Markdown et texte. |
| 21.09.2026 | Pages d’authentification, validation Zod, connexion PostgreSQL, repositories et service d’authentification. |
| 22.09.2026 | JWT, composable d’authentification, déconnexion et middlewares de navigation. |
| 28.09.2026 | Domaine, repository et service des documents ; liste, édition et sauvegarde automatique. |
| 29.09.2026 | Suppression de document et début de la conteneurisation. |

## État au 5 octobre 2026

Le parcours principal est terminé : un utilisateur peut s’inscrire, accéder à ses documents, en créer un, l’éditer avec sauvegarde automatique, l’exporter et le supprimer. La conteneurisation est mentionnée comme commencée dans le journal, mais aucun fichier Docker n’est présent dans le dépôt ; elle n’est donc pas documentée comme livrée.

## Prochaines étapes recommandées

1. Ajouter une commande de migration et décrire le déploiement réel.
2. Mettre en place des tests unitaires pour les services et des tests d’intégration pour les routes API.
3. Ajouter un dialogue de confirmation avant suppression et améliorer les retours utilisateur localisés.
4. Évaluer les besoins de partage, de versionnage et de récupération de compte avant de les implémenter.
