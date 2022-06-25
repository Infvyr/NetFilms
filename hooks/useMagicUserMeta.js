import { magic } from 'lib/magic-client';
import { useState, useEffect } from 'react';

export default function useUserMeta() {
	const [username, setUserName] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const { email } = await magic.user.getMetadata();
				if (email) setUserName(email);
			} catch (error) {
				console.error('Error retrieving email', error);
			}
		})();
	}, []);

	return { username };
}
