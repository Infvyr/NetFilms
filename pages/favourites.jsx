import { redirectUser } from 'lib/utils';

export async function getServerSideProps(context) {
	const { userId } = await redirectUser(context);

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	return { props: {} };
}

export default function FavouritesPage() {
	return <>Favourites</>;
}
