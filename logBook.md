# MarkLab

## Journal de bord — Maksym Ptytsia

> Les durées ci-dessous sont des estimations reconstituées après coup. Une période correspond approximativement à 45 minutes. Elles servent à rendre compte du suivi du travail et ne modifient pas le contenu des réalisations consignées.

### 31.08.2026 — Initialisation du projet

**Temps effectué :** 2 périodes, environ 1 h 30.

**Tâches réalisées :**

- Initialisation de MarkLab avec **Nuxt** et **NuxtHub**.
- Mise en place de PostgreSQL, du stockage clé-valeur et de **Drizzle ORM**.
- Installation de Nuxt UI et des dépendances prévues pour les futures fonctionnalités.
- Création du dépôt GitLab de l’école.

**Choix et réflexion :** J’ai choisi Nuxt et NuxtHub afin de disposer d’un environnement cohérent pour le front-end, le serveur et les services de données. Drizzle ORM doit simplifier l’accès à la base de données grâce au typage TypeScript. Installer les dépendances nécessaires dès le départ permet aussi de préparer les fonctionnalités prévues dans le cahier des charges et d’éviter des interruptions plus tard.

**Problèmes et résolution :** Aucun blocage majeur n’a été rencontré pendant l’initialisation. J’ai vérifié que les modules essentiels étaient bien reconnus par le projet avant de poursuivre.

---

### 01.09.2026 — Environnement et planification

**Temps effectué :** 2 périodes, environ 1 h 30.

**Tâches réalisées :**

- Poursuite de la configuration de l’environnement de développement.
- Configuration de **Nuxt UI** et de la structure générale du layout.
- Préparation du planning du projet.

**Choix et réflexion :** J’ai consacré du temps à la structure visuelle avant de développer les fonctionnalités métier. Une interface de base cohérente rend les pages suivantes plus rapides à créer et permet de conserver une expérience utilisateur homogène.

**Problèmes et résolution :** Le principal point d’attention était de comprendre l’organisation des composants Nuxt UI. La documentation et les composants fournis ont permis de configurer la base sans difficulté bloquante.

---

### 07.09.2026 — Amélioration du layout

**Temps effectué :** 1 période, environ 45 minutes.

**Tâches réalisées :**

- Approfondissement de la configuration du layout global.
- Ajustement de la structure de l’interface avec Nuxt UI.

**Choix et réflexion :** J’ai conservé Nuxt UI pour la construction de l’interface. La bibliothèque est suffisamment claire et rapide à prendre en main ; elle permet de produire un layout propre sans recréer des composants de base.

**Problèmes et résolution :** Aucun problème technique important n’a été rencontré. Le travail a surtout consisté à tester et à ajuster la disposition des éléments.

---

### 08.09.2026 — Migrations et premier éditeur Markdown

**Temps effectué :** 4 périodes, environ 3 heures.

**Tâches réalisées :**

- Débogage des problèmes liés aux migrations avec **Drizzle ORM**.
- Mise en place d’une base de données prête à accueillir les fonctionnalités back-end.
- Création d’une première saisie Markdown et de son affichage.
- Ajout de la persistance de la saisie utilisateur avec **Pinia**.

**Problèmes et résolution :** Les migrations Drizzle posaient problème. J’ai repris la configuration et vérifié le schéma afin d’obtenir une base de données exploitable. Ce travail a demandé du temps, mais il réduit le risque de devoir reprendre la structure de données lorsque le back-end sera développé.

**Choix et réflexion :** J’ai utilisé `@nuxtjs/mdc` pour le rendu Markdown et Pinia pour l’état côté client. Cette solution a permis d’obtenir rapidement le flux principal : saisir du Markdown puis visualiser le résultat. Même si l’éditeur devait encore être amélioré, les fondations de la fonctionnalité centrale étaient en place.

---

### 14.09.2026 — Expérience utilisateur de l’éditeur

**Temps effectué :** 4 périodes, environ 3 heures.

**Tâches réalisées :**

- Amélioration du comportement de l’éditeur lors de la saisie Markdown.
- Adaptation automatique de la hauteur de la zone de saisie.
- Correction de comportements gênants pendant l’édition.
- Ajout du champ de titre et du bouton permettant d’inverser les panneaux.
- Persistance des préférences utilisateur avec `pinia-plugin-persistedstate` et le **localStorage**.

**Problèmes et résolution :** La zone de saisie devait rester confortable lorsque la quantité de texte changeait. J’ai adapté son redimensionnement automatique afin d’éviter une taille inadaptée pendant la rédaction.

**Choix et réflexion :** L’inversion des panneaux et la mémorisation de la préférence améliorent le confort d’utilisation sans alourdir l’application. Conserver uniquement cette préférence dans le navigateur est adapté, car elle ne concerne pas les données métier du compte.

---

### 15.09.2026 — Raccourcis et export

**Temps effectué :** 3 périodes, environ 2 h 15.

**Tâches réalisées :**

- Ajout de raccourcis clavier pour fluidifier l’utilisation de l’éditeur.
- Implémentation de l’export du document courant aux formats **`.md`** et **`.txt`**.
- Première utilisation de l’outil développé pour rédiger le journal de bord.

**Problèmes et résolution :** Il fallait empêcher les raccourcis de navigateur, en particulier la sauvegarde standard, de perturber l’application. Les événements clavier sont interceptés dans l’éditeur pour déclencher l’action attendue.

**Choix et réflexion :** L’export Markdown conserve le format natif du document tandis que l’export texte permet un usage plus universel. Le fait de rédiger ce journal avec MarkLab a également permis de vérifier la pertinence de l’outil dans un cas réel. Cette avance sur l’export m’a donné une marge sur le planning.

---

### 21.09.2026 — Début du back-end et authentification

**Temps effectué :** Journée de cours complète, 4 périodes, environ 3 heures.

**Tâches réalisées :**

- Création des pages **Sign-Up** et **Log-In**.
- Mise en place des schémas de validation avec **Zod**.
- Connexion de l’application à PostgreSQL au moyen de **Drizzle ORM**.
- Création du repository pour la table `users`.
- Implémentation du service d’authentification avec `signup()` et `login()`.
- Hachage des mots de passe avec **Argon2id**.

**Problèmes et résolution :** La difficulté principale était de relier les différents niveaux de l’application : formulaires, validation, base de données et logique métier. J’ai séparé le repository, responsable de l’accès aux données, du service, responsable des règles d’authentification, afin de clarifier le code.

**Choix et réflexion :** Zod est utilisé à la fois côté front-end pour afficher les erreurs de formulaire et côté serveur pour valider les données reçues. Une source de validation commune réduit les incohérences. Argon2id a été choisi pour le hachage des mots de passe, car c’est un algorithme moderne et adapté à cet usage.

---

### 22.09.2026 — Finalisation de l’authentification

**Temps effectué :** Journée de cours complète, 4 périodes, environ 3 heures.

**Tâches réalisées :**

- Connexion des formulaires d’authentification au back-end.
- Création et signature des jetons **JWT** avec `jose`.
- Création du composable Nuxt `useAuth()` pour centraliser l’état de connexion.
- Ajout de la déconnexion.
- Ajout des middlewares de navigation selon l’état de connexion.

**Problèmes et résolution :** Une authentification utilisable ne se limite pas à vérifier un mot de passe : il faut aussi conserver l’état de session et protéger les pages. J’ai résolu ce point avec un jeton JWT stocké dans un cookie HTTP-only et avec des middlewares qui redirigent les visiteurs selon leur session.

**Choix et réflexion :** Le composable `useAuth()` évite de répéter des appels pour connaître l’utilisateur connecté dans chaque page :

```ts
const { fetchUser, isAuthenticated, user } = useAuth()
```

Ce choix rend l’état d’authentification accessible dans toute l’application et simplifie la protection des routes. L’avance prise dans les tâches précédentes a permis de garder une petite marge dans le planning.

---

### 28.09.2026 — Gestion des documents

**Temps effectué :** Journée de cours complète, 4 périodes, environ 3 heures.

**Tâches réalisées :**

- Création de la classe de domaine, du repository et du service pour les documents.
- Réalisation de la page de gestion des documents.
- Adaptation de la page d’édition pour ouvrir les documents enregistrés en base de données.
- Mise en place de la sauvegarde automatique.

**Problèmes et résolution :** La page d’édition initiale était conçue pour un document local. Je l’ai refactorisée afin qu’elle puisse charger et enregistrer un document existant. La sauvegarde automatique a été temporisée afin de ne pas envoyer une requête à chaque frappe.

**Choix et réflexion :** J’ai repris la structure déjà utilisée pour `User` — domaine, repository et service — afin d’obtenir une architecture cohérente. La gestion des documents représente le cœur de l’application : une fois cette partie terminée, le parcours utilisateur principal est techniquement complet.

---

### 29.09.2026 — Suppression et réflexion sur le déploiement

**Temps effectué :** 2 périodes, environ 1 h 30.

**Tâches réalisées :**

- Implémentation de la suppression d’un document.
- Début de la réflexion sur la conteneurisation du projet.

**Problèmes et résolution :** La suppression elle-même a été rapide à réaliser, environ 30 minutes. J’ai réutilisé le même contrôle de propriété que pour la consultation et la modification afin qu’un utilisateur ne puisse supprimer que ses propres documents.

**Choix et réflexion :** La suppression termine les opérations principales de gestion de documents. J’ai ensuite commencé à évaluer Docker comme piste de déploiement, afin de rendre l’environnement plus reproductible.

---

### 05.10.2026 — Déploiement et documentation

**Temps effectué :** 3 périodes, environ 2 h 15.

**Tâches réalisées :**

- Abandon de la piste Docker au profit d’un hébergement sur **Vercel**.
- Correction de petits problèmes de redirection après une authentification réussie.
- Redéploiement de l’application.
- Personnalisation de la configuration par défaut de **Nuxt UI**.
- Début de la documentation technique du projet et de la réécriture du `README.md`.

**Problèmes et résolution :** Des erreurs de redirection apparaissaient après l’authentification. J’ai vérifié le flux de session et les redirections, puis corrigé ce comportement avant de redéployer l’application.

**Choix et réflexion :** J’ai retenu Vercel plutôt que Docker pour le déploiement à ce stade. Les déploiements de production sont déclenchés automatiquement à chaque commit sur la branche principale, ce qui évite une opération manuelle. La personnalisation de Nuxt UI permet également de mieux différencier l’interface de la configuration par défaut. Enfin, la documentation technique et le README rendent le projet plus compréhensible, maintenable et présentable.
