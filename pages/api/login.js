import jwt from 'jsonwebtoken';
import { isNewUser, createNewUser } from 'lib/db/hasura';
import { setCookieToken } from 'lib/cookies';
import { magicAdmin } from 'lib/magic-server';

export default async function login(req, res) {
	if (req.method === 'POST') {
		try {
			const auth = req.headers.authorization;
			const didToken = auth ? auth.substr(7) : '';

			// invoke magic
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);

			// create jwt
			const token = jwt.sign(
				{
					...metadata,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor((Date.now() / 1000) * 7 * 24 * 60 * 60),
					'https://hasura.io/jwt/claims': {
						'x-hasura-allowed-roles': ['user', 'admin'],
						'x-hasura-default-role': 'user',
						'x-hasura-user-id': `${metadata.issuer}`
					}
				},
				process.env.JWT_SECRET_KEY
			);

			// check if user exists
			const isNewUserQuery = await isNewUser(token, metadata.issuer);

			// if is new user create it
			isNewUserQuery && (await createNewUser(token, metadata));

			// set cookie
			setCookieToken(token, res);
			res.send({ done: true });
		} catch (error) {
			console.error('Something went wrong loggin in', error);
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ done: false });
	}
}
