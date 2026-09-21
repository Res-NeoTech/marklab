import { User } from "~~/server/domain/user"

export interface IUserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(username: string, email: string, password: string): Promise<User>
}