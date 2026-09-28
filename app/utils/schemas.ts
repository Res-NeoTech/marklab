import { z } from "zod";

export const loginSchema = z.object({
    email: z.email('Must be a valid email.'),
    password: z.string('Must be a valid string.').min(8, 'Must be at least 8 characters.')
})

export type LoginSchema = z.output<typeof loginSchema>

export const signupSchema = z.object({
    username: z.string('Must be a valid string.').min(5, 'Must be at least 5 characters.').max(50, 'Must be less than 50 characters.'),
    email: z.email('Must be a valid email.'),
    password: z.string('Must be a valid string.').min(8, 'Must be at least 8 characters.'),
    rPassword: z.string('Must be a valid string.').min(8, 'Must be at least 8 characters.')
}).refine(
    (data) => data.password === data.rPassword,
    {
        message: 'Passwords do not match.',
        path: ['rPassword'],
    }
)

export type SignupSchema = z.output<typeof signupSchema>

export const documentIdSchema = z.object({
    id: z.uuid('Document ID must be a valid UUID.'),
})

export const createDocumentSchema = z.object({
    title: z.string('Must be a valid string.')
        .trim()
        .min(1, 'Title cannot be empty.')
        .max(255, 'Title must be 255 characters or fewer.')
        .default('New Document'),
    content: z.string('Must be a valid string.').default(''),
})

export const updateDocumentSchema = z.object({
    title: z.string('Must be a valid string.')
        .trim()
        .min(1, 'Title cannot be empty.')
        .max(255, 'Title must be 255 characters or fewer.'),
    content: z.string('Must be a valid string.'),
})
