import { ZodError } from 'zod'
import { documentIdSchema, updateDocumentSchema } from '~~/app/utils/schemas'
import type { User } from '~~/server/domain/user'
import { DocumentRepository } from '~~/server/repositories/document/drizzleRepo'
import { DocumentService } from '~~/server/services/document.service'
import { db } from '~~/server/db'
import { toDocumentResponse } from '~~/server/utils/document'

export default defineEventHandler(async (event) => {
    try {
        const { id } = documentIdSchema.parse(getRouterParams(event))
        const data = updateDocumentSchema.parse(await readBody(event))
        const user = event.context.user as User
        const documentService = new DocumentService(new DocumentRepository(db))
        const document = await documentService.updateDocument(id, data.title, data.content, user.id)

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

        if (
            typeof error === 'object'
            && error !== null
            && 'statusCode' in error
            && error.statusCode === 404
        ) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update document.',
        })
    }
})
