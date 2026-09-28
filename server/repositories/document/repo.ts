import type { Document } from "~~/server/domain/document"

export interface IDocumentRepository {
    findById(id: string): Promise<Document | null>
    findAllByAuthor(userId: string): Promise<Document[]>
    create(title: string, content: string, userId: string): Promise<Document>
    update(document: Document): Promise<Document | null>
    delete(document: Document): Promise<boolean>
}
