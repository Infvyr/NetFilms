import { magicAdmin } from '../../lib/magic-server';

export default async function login(req, res) {
	if (req.method === 'POST') {
		try {
			const auth = req.headers.authorization;
			const didToken = auth ? auth.substr(7) : '';
			console.log({ didToken });

			// invoke magic
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);
			console.log({ metadata });

			res.send({ done: true });
		} catch (error) {
			console.error('Something went wrong loggin in', error);
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ done: false });
	}
}
