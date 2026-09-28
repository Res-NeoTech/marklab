import { getCurrentUser } from "../auth/user";
import { User } from "../domain/user";

export default defineEventHandler(async (event) => {
    if (event.path.startsWith('/api/docs')) {
        const user: User | null = await getCurrentUser(event);

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            });
        }

        event.context.user = user;
    }
});