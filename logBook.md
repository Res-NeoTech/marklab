# MarkLab
## Journal de bord - Maksym Ptytsia

### 31.08.2026

Ceci est le jour où j'ai sérieusement commencé le projet. Je l'ai débute avec **Nuxt + NuxtHub** qui contient déjà **PostgresSQL** inclus dans les DevTools du Nuxt, le **stockage clé-valeur** integré et **Drizzle ORM** pour faciliter l'accés à la base des données. J'ai également installé les composants UI du Nuxt. Ce stack m'aidera à développer l'application plus rapidement et avec un meilleur DX. J'ai aussi initialisée le projet dans le GitLab de l'école. A part d'installer les paquets essentiels, j'ai aussi installé les librairies que j'utiliserais plus tard pour la réalisation des points prévus dans le cahier de charge.

### 01.09.2026

Aujourd'hui, j'ai continué à améliorer l'environnement du developpement de projet. Le temps a été notamment consacré à la configuration de **NuxtUI** et **Layout** du site J'ai également conçu le planning adapté pour le projet.

### 07.09.2026

Cette fois j'ai pris le temps à configurer plus profondement le **Layout** du site. La librairie Nuxt UI était trop facile est compréhensible à faire cela.

### 08.09.2026

Pendant ce cours, J'a debougé les problémes avec **Drizzle ORM** qui étaient en lien avec la migration. Même si la schema des données n'est pas encore compléte, configurer une base solide pour le futur est déjà crucial. Même si je n'ai pas vraiment encore débuté le développement back-end, j'aurais moins de travail sur ça prochainement. L'autre moitié du cours à l'aide des paquets comme `@nuxtjs/mdc` j'ai déjà réussi à faire une saisie et visualisation basique du **Markdown** et la persistence de la saisie d'utilisateur grâce à `pinia`. Même s'il reste des améliorations à faire, les fonctionnalités principales de l'application sont desormais implémentées.

### 14.09.2026

Je me suis concentrée aujourd'hui sur l'expérience utilisateur. Avant la grande pause j'ai amélioré l'éditeur afin de prevoir differentes cas de changement de taille de la saisie Markdown et changement de la taille automatiquement lors de la saisie, ainsi qu'éliminer les bugs qui peuvent arriver pendant l'édition. La fonctionnalité principale décrite avant et desormais mieux implementé et plus agréable à utiliser. Le reste du cours, j'ai continué à utilise **NuxtUI** afin de créer le champ du titre du document et le bouton pour swap les layouts. J'ai également utilisé `pinia-plugin-persistedstate` pour `pinia` afin de persister dans le **localStorage** les infos sur le document et les préferences utilisateur.

### 15.09.2026

La prémiere partie du cours avant la pause, j'ai pris le temps à mettre en place la réaction de l'application sur certains touches clavier pour rendre **UX** de l'application plus fluide et intuitive. Après la grande pause, j'ai pu implementer l'exportation du document courant vers **.md** et **.txt**. Vers la fin, j'ai déjà commencé à utiliser l'outil que j'ai developpé pour rédiger ce journal de bord. Vu que j'ai déjà implementé l'exportation, je prends un jour d'avance sur le planning prévu.

### 21.09.2026

Aujourd'hui je débute enfin le développement back-end. La prémiere heure du cours j'ai fait les pages de connexion, tels que **Sign-Up** et **Log-In**. C'était assez facile à faire parce que **Nuxt UI** fournit déjà un composant qu'il me faut, donc je l'ai just adapté pour mes besoins. La deuxiéme heure j'ai également implementé les schemas de validation avec la librairie **Zod**. Ca m'a permis de créer une schéma unique qui va être utilisée dans le Front-End(surligner les erreurs) et dans le Back-End(valider les données côté-serveur). Après la grande pause, j'ai réussi à établir la connexion avec **PostgresSQL** via **Drizzle ORM**(cette fois dans le code) ainsi qu'implémenter le repository pour la table `users`. La dérniere heure, j'ai implementé le service d'authentification avec les fonctions `signup()` et `login()`. J'ai utilisé **Argon2ID** come hachage des mots de passe parce que c'est un algo le plus fort pour le moment.