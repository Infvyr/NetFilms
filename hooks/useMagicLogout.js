import { magic } from 'lib/magic-client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useMagicLogout() {
	const router = useRouter();

	const handleLogout = useCallback(
		async (e) => {
			e.preventDefault();

			try {
				await magic.user.logout();
				router.replace('/');
			} catch (error) {
				console.error('Error logging out', error);
				router.replace('/');
			}
		},
		[router]
	);

	return { handleLogout };
}
