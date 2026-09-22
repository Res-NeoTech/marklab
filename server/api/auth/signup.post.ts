import { signupSchema } from '~~/app/utils/schemas'
import { UserRepository } from '~~/server/repositories/user/drizzleRepo'
import { AuthService, EmailAlreadyExistsError } from '~~/server/services/auth.service'
import { db } from '~~/server/db'
import { ZodError } from 'zod'
import { signToken } from '~~/server/auth/jwt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const data = signupSchema.parse(body)

        const userRepository = new UserRepository(db)
        const authService = new AuthService(userRepository)

        const user = await authService.signup(
            data.username,
            data.email,
            data.password
        )

        const token = await signToken(user.id)

        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 31,
            path: '/',
        })

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Validation failed.',
                data: {
                    errors: error.issues,
                },
            })
        } else if (error instanceof EmailAlreadyExistsError) {
            throw createError({
                statusCode: 409,
                statusMessage: error.message,
            })
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to create account.',
            })
        }
    }
})