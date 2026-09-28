import { ZodError } from 'zod'
import { createDocumentSchema } from '~~/app/utils/schemas'
import type { User } from '~~/server/domain/user'
import { DocumentRepository } from '~~/server/repositories/document/drizzleRepo'
import { DocumentService } from '~~/server/services/document.service'
import { db } from '~~/server/db'
import { toDocumentResponse } from '~~/server/utils/document'

export default defineEventHandler(async (event) => {
    try {
        const data = createDocumentSchema.parse(await readBody(event))
        const user = event.context.user as User
        const documentService = new DocumentService(new DocumentRepository(db))
        const document = await documentService.createDocument(data.title, data.content, user.id)

        setResponseStatus(event, 201)

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

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create document.',
        })
    }
})
