export class User {
    constructor(
        public readonly id: string,
        public username: string,
        public email: string,
        public password: string,
        public readonly createdAt: Date,
    ) { }

    static create(params: {
        id: string
        username: string
        email: string
        password: string
        createdAt?: Date
    }) {
        return new User(
            params.id,
            params.username,
            params.email,
            params.password,
            params.createdAt ?? new Date(),
        )
    }
}