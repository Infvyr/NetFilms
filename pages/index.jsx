import { Banner, CardSection } from 'components';
import { getVideos, getPopularVideos, getWatchAgainVideos } from 'lib/videos';
import { redirectUser } from 'lib/utils';

export async function getServerSideProps(context) {
	const { token, userId } = await redirectUser(context);

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	const popular = await getPopularVideos();
	const disney = await getVideos('disney trailer');
	const travel = await getVideos('travelling across europe');
	const watchedVideos = await getWatchAgainVideos(userId, token);

	return {
		props: {
			popular,
			disney,
			travel,
			watchedVideos
		}
	};
}

export default function Home({ popular, disney, travel, watchedVideos }) {
	const videoId = 'venrE8gdz30';
	return (
		<>
			<Banner
				title="Banner title"
				subTitle="here will be the banner subtitle"
				imgUrl={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
				videoId={videoId}
			/>
			<CardSection title="Popular" data={popular} size="large" />
			<CardSection title="Watch it again" data={watchedVideos} />
			<CardSection title="Disney" data={disney} />
			<CardSection title="Travel" data={travel} size="small" />
		</>
	);
}
