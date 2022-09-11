import { redirectUser } from 'lib/utils';
import { getLikedVideos } from 'lib/videos';
import { CustomHead, CardSection } from 'components';

export async function getServerSideProps(context) {
	const { userId, token } = await redirectUser(context);
	const likedVideos = await getLikedVideos(userId, token);

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	return { props: { likedVideos } };
}

export default function FavouritesPage({ likedVideos }) {
	return (
		<>
			<CustomHead title="Watch favourite videos again" />
			<CardSection
				title="My favourited"
				data={likedVideos}
				shouldWrap
				shouldTransform={false}
			/>
		</>
	);
}
