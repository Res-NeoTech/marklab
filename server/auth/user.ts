import { UserRepository } from '~~/server/repositories/user/drizzleRepo'
import { db } from '~~/server/db'
import { verifyToken } from './jwt'

export async function getCurrentUser(event: any) {
    const token = getCookie(event, 'auth_token')

    if (!token) {
        return null
    }

    try {
        const payload = await verifyToken(token)

        if (!payload.sub) {
            return null
        }

        const userRepository = new UserRepository(db)

        return await userRepository.findById(payload.sub)
    } catch {
        return null
    }
}