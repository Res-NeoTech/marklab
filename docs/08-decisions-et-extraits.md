# Choix techniques et extraits représentatifs

Cette page explique des éléments clés de l’implémentation sans annoter les fichiers source eux-mêmes. Les extraits sont volontairement courts et renvoient à la logique décrite dans les pages précédentes.

## 1. Validation commune avec Zod

Le projet centralise les règles de validation dans `app/utils/schemas.ts`. Elles peuvent être utilisées par le formulaire et par l’endpoint, ce qui évite que le client et le serveur appliquent deux règles divergentes.

```ts
export const updateDocumentSchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string(),
})
```

Cette règle garantit notamment qu’un titre vide ou trop long ne soit pas enregistré, même si une requête est envoyée directement vers l’API.

## 2. Vérification de propriété dans le service

La règle « un utilisateur ne manipule que ses documents » appartient au service métier, et non uniquement à l’interface. Le service charge le document et compare son propriétaire à l’identité issue de la session.

```ts
const document = await this.documentRepository.findById(idDocument)

if (!document || document.userId !== userId) {
  return null
}
```

Les endpoints traduisent ensuite l’absence de document accessible en réponse `404`.

## 3. Session signée dans un cookie HTTP-only

Après connexion ou inscription, le serveur signe l’identifiant utilisateur dans un JWT puis l’envoie dans un cookie que JavaScript côté navigateur ne peut pas lire directement.

```ts
setCookie(event, 'auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 31,
  path: '/',
})
```

Le cookie devient sécurisé (`secure`) en production et il expire au bout de 31 jours. La vérification du JWT est effectuée à chaque résolution de l’utilisateur courant.

## 4. Sauvegarde temporisée

Pour ne pas lancer une requête à chaque frappe, l’éditeur diffère l’enregistrement. Une nouvelle modification réinitialise le minuteur ; seule la dernière version après une pause est envoyée.

```ts
if (saveTimer) {
  clearTimeout(saveTimer)
}

saveTimer = setTimeout(() => void saveDocument(id, version), 750)
```

Le compteur de révision empêche une réponse plus ancienne de remplacer l’état le plus récent de l’interface.

## 5. Repository et requête protégée

Même après le contrôle du service, la mise à jour SQL filtre le document sur son identifiant **et** celui de son propriétaire.

```ts
.where(and(
  eq(documents.id, document.id),
  eq(documents.userId, document.userId),
))
```

Cette redondance volontaire apporte une défense supplémentaire au niveau de la persistance.

## Évolutions techniques pertinentes

- Ajouter une suite de tests Vitest pour les services et les endpoints.
- Exposer des scripts Drizzle Kit reproductibles (`generate` et `migrate`).
- Ajouter un fichier Docker et une configuration de déploiement effective si la conteneurisation est retenue.
- Prévoir la gestion des conflits d’édition si l’application doit permettre plusieurs sessions ou de la collaboration.
