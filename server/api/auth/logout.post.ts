import { setCookie } from 'h3';
import { getCurrentUser } from '~~/server/auth/user';

export default defineEventHandler(async (event) => {
	const user = await getCurrentUser(event);
    
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	setCookie(event, 'auth_token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	});

	return { status: 'User successfully logged-out.' };
});