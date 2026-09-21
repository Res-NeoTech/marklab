import { eq } from 'drizzle-orm'
import { User } from '~~/server/domain/user'
import type { IUserRepository } from './repo'
import { db as database } from '~~/server/db'
import { users } from '~~/server/db/schema'

export class UserRepository implements IUserRepository {
    constructor(private readonly db: typeof database) { }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

        const user = result[0]

        if (!user) {
            return null
        }

        return User.create(user)
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)

        const user = result[0]

        if (!user) {
            return null
        }

        return User.create(user)
    }

    async create(
        username: string,
        email: string,
        password: string
    ): Promise<User> {
        const result = await this.db
            .insert(users)
            .values({
                username,
                email,
                password,
            })
            .returning()

        const user = result[0]

        if (!user) {
            throw new Error('Failed to create user')
        }

        return User.create(user)
    }
}