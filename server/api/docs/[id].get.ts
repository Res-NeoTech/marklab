import { ZodError } from 'zod'
import { documentIdSchema } from '~~/app/utils/schemas'
import type { User } from '~~/server/domain/user'
import { DocumentRepository } from '~~/server/repositories/document/drizzleRepo'
import { DocumentService } from '~~/server/services/document.service'
import { db } from '~~/server/db'
import { toDocumentResponse } from '~~/server/utils/document'

export default defineEventHandler(async (event) => {
    try {
        const { id } = documentIdSchema.parse(getRouterParams(event))
        const user = event.context.user as User
        const documentService = new DocumentService(new DocumentRepository(db))
        const document = await documentService.getDocumentById(id, user.id)

        if (!document) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Document not found.',
            })
        }

        return {
            document: toDocumentResponse(document),
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Validation failed.',
                data: { errors: error.issues },
            })
        }

        throw error
    }
})
