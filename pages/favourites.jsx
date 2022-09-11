import { redirectUser } from 'lib/utils';
import { CustomHead, CardSection } from 'components';

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
	return (
		<>
			<CustomHead title="Watch favourite videos again" />
			<CardSection title="Disney" data={[]} />
		</>
	);
}
