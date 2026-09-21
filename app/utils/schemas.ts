import { z } from "zod";

export const loginSchema = z.object({
    email: z.email('Must be a valid email.'),
    password: z.string().min(8, 'Must be at least 8 characters.')
})

export type LoginSchema = z.output<typeof loginSchema>

export const signupSchema = z.object({
    username: z.string().min(5, 'Must be at least 5 characters.').max(50, 'Must be less than 50 characters.'),
    email: z.email('Must be a valid email.'),
    password: z.string().min(8, 'Must be at least 8 characters.'),
    rPassword: z.string().min(8, 'Must be at least 8 characters.')
}).refine(
    (data) => data.password === data.rPassword,
    {
        message: 'Passwords do not match.',
        path: ['rPassword'],
    }
)

export type SignupSchema = z.output<typeof signupSchema>