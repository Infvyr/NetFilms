import { Banner, CardSection } from 'components';
import { getVideos } from 'lib/videos';

export async function getServerSideProps() {
	const videos = await getVideos();

	return {
		props: { videos }
	};
}

export default function Home({ videos }) {
	return (
		<>
			<Banner
				title="Banner title"
				subTitle="here will be the banner subtitle"
				imgUrl="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			/>
			<CardSection title="Card section title" data={videos} size="large" />
			<CardSection title="Card section title" data={videos} />
			<CardSection title="Card section title" data={videos} size="small" />
		</>
	);
}
