export class Document {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public title: string,
        public content: string,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    static create(params: {
        id: string
        userId: string
        title: string
        content: string
        createdAt: Date
        updatedAt: Date
    }) {
        return new Document(
            params.id,
            params.userId,
            params.title,
            params.content,
            params.createdAt,
            params.updatedAt
        )
    }
}
