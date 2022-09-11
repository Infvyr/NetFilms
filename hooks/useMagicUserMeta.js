import { magic } from 'lib/magic-client';
import { useState, useEffect } from 'react';

export default function useUserMeta() {
	const [username, setUserName] = useState('');
	const [didToken, setDidToken] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const { email } = await magic.user.getMetadata();
				const didToken = await magic.user.getIdToken();
				if (email) {
					setUserName(email);
					setDidToken(didToken);
				}
			} catch (error) {
				console.error('Error retrieving email', error);
			}
		})();
	}, []);

	return { username, didToken };
}
