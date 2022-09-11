import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useUserMeta from 'hooks/useMagicUserMeta';

export default function useMagicLogout() {
	const router = useRouter();
	const { didToken } = useUserMeta();

	const handleSignOut = useCallback(async () => {
		// e?.preventDefault();

		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${didToken}`,
					'Content-Type': 'application/json'
				}
			});
			await response.json();
		} catch (error) {
			console.error('Error logging out', error);
			router.push('/login');
			router.reload();
		}
	}, [didToken, router]);

	return { handleSignOut };
}
