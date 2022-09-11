import jwt from 'jsonwebtoken';

export async function verifyToken(token) {
	if (token) {
		const decodedToken = jwt?.verify(token, process.env.JWT_SECRET_KEY);
		return decodedToken?.issuer;
	}
	return null;
}

export async function redirectUser(context) {
	const token = context.req ? context.req?.cookies['nf-token'] : null;
	const userId = await verifyToken(token);

	return { token, userId };
}
