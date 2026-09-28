import type { User } from '~~/server/domain/user'
import { DocumentRepository } from '~~/server/repositories/document/drizzleRepo'
import { DocumentService } from '~~/server/services/document.service'
import { db } from '~~/server/db'
import { toDocumentSummary } from '~~/server/utils/document'

export default defineEventHandler(async (event) => {
    const user = event.context.user as User
    const documentService = new DocumentService(new DocumentRepository(db))
    const documents = await documentService.getAllMyDocuments(user.id)

    return {
        documents: documents.map(toDocumentSummary),
    }
})
