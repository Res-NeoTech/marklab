import type { Document } from '../domain/document';
import type { IDocumentRepository } from '../repositories/document/repo'

export class DocumentService {
    constructor(
        private readonly documentRepository: IDocumentRepository
    ) { }

    async getDocumentById(idDocument: string, userId: string): Promise<Document | null> {
        const document: Document | null = await this.documentRepository.findById(idDocument);

        if (!document) {
            return null;
        }

        if (document.userId !== userId) {
            return null;
        }

        return document;
    }

    async getAllMyDocuments(userId: string): Promise<Document[]> {
        return await this.documentRepository.findAllByAuthor(userId);
    }

    async createDocument(title: string, content: string, userId: string): Promise<Document> {
        try {
            return await this.documentRepository.create(title, content, userId);
        } catch (error) {
            throw new Error('Failed to create new document.', { cause: error })
        }
    }

    async updateDocument(
        idDocument: string,
        title: string,
        content: string,
        userId: string,
    ): Promise<Document | null> {
        const document = await this.getDocumentById(idDocument, userId);

        if (!document) {
            return null;
        }

        document.title = title;
        document.content = content;

        try {
            return await this.documentRepository.update(document);
        } catch (error) {
            throw new Error('Failed to update document.', { cause: error })
        }
    }

    async deleteDocument(idDocument: string, userId: string): Promise<boolean> {
        const document = await this.getDocumentById(idDocument, userId);

        if (!document) {
            return false;
        }

        try {
            return await this.documentRepository.delete(document);
        } catch (error) {
            throw new Error('Failed to delete document.', { cause: error })
        }
    }
}
