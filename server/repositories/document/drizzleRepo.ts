import { and, desc, eq } from 'drizzle-orm'
import { Document } from '~~/server/domain/document'
import type { IDocumentRepository } from './repo'
import type { db as database } from '~~/server/db'
import { documents } from '~~/server/db/schema'

export class DocumentRepository implements IDocumentRepository {
    constructor(private readonly db: typeof database) { }

    async findById(id: string): Promise<Document | null> {
        const result = await this.db
            .select()
            .from(documents)
            .where(eq(documents.id, id))
            .limit(1)

        const document = result[0]

        if (!document) {
            return null
        }

        return Document.create(document)
    }

    async findAllByAuthor(userId: string): Promise<Document[]> {
        const result = await this.db
            .select()
            .from(documents)
            .where(eq(documents.userId, userId))
            .orderBy(desc(documents.updatedAt))

        return result.map((document) => Document.create(document))
    }

    async create(title: string, content: string, userId: string): Promise<Document> {
        const result = await this.db
            .insert(documents)
            .values({
                title,
                content,
                userId,
            })
            .returning()

        const document = result[0]

        if (!document) {
            throw new Error('Failed to create new document.')
        }

        return Document.create(document)
    }

    async update(document: Document): Promise<Document | null> {
        const result = await this.db
            .update(documents)
            .set({
                title: document.title,
                content: document.content,
                updatedAt: new Date(),
            })
            .where(and(
                eq(documents.id, document.id),
                eq(documents.userId, document.userId),
            ))
            .returning()

        const updatedDocument = result[0]

        return updatedDocument ? Document.create(updatedDocument) : null
    }

    async delete(document: Document): Promise<boolean> {
        const result = await this.db
            .delete(documents)
            .where(and(
                eq(documents.id, document.id),
                eq(documents.userId, document.userId),
            ))
            .returning({ id: documents.id })

        return result.length > 0
    }
}
