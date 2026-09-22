import { loginSchema, signupSchema } from '~~/app/utils/schemas'
import { UserRepository } from '~~/server/repositories/user/drizzleRepo'
import { AuthService } from '~~/server/services/auth.service'
import { db } from '~~/server/db'
import { ZodError } from 'zod'
import { signToken } from '~~/server/auth/jwt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const data = loginSchema.parse(body)

        const userRepository = new UserRepository(db)
        const authService = new AuthService(userRepository)

        const user = await authService.login(data.email, data.password);

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
        } else {
            throw createError({
                statusCode: 403,
                statusMessage: 'Incorrect credentials.',
            })
        }
    }
})