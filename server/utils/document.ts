import type { Document } from '~~/server/domain/document'

export function toDocumentResponse(document: Document) {
    return {
        id: document.id,
        title: document.title,
        content: document.content,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
    }
}

export function toDocumentSummary(document: Document) {
    return {
        id: document.id,
        title: document.title,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
    }
}
