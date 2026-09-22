import { User } from '../domain/user';
import type { IUserRepository } from '../repositories/user/repo'
import argon2 from 'argon2';

export class EmailAlreadyExistsError extends Error {
    constructor() {
        super('Email is already in use.')
        this.name = 'EmailAlreadyExistsError'
    }
}

export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async signup(username: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new EmailAlreadyExistsError();
        }

        const hashedPassword: string = await argon2.hash(password);

        const user = await this.userRepository.create(
            username,
            email,
            hashedPassword
        );

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error('Invalid credentials.')
        }

        const valid = await argon2.verify(
            user.password,
            password
        )

        if (!valid) {
            throw new Error('Invalid credentials.')
        }

        return user;
    }
}