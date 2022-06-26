import { Banner, CardSection } from 'components';
import { getVideos, getPopularVideos } from 'lib/videos';

export async function getServerSideProps() {
	const popular = await getPopularVideos();
	const disney = await getVideos('disney trailer');
	const travel = await getVideos('travelling across europe');

	return {
		props: {
			popular: popular,
			disney: disney,
			travel: travel
		}
	};
}

export default function Home({ popular, disney, travel }) {
	return (
		<>
			<Banner
				title="Banner title"
				subTitle="here will be the banner subtitle"
				imgUrl="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			/>
			<CardSection title="Popular" data={popular} size="large" />
			<CardSection title="Disney" data={disney} />
			<CardSection title="Travel" data={travel} size="small" />
		</>
	);
}
