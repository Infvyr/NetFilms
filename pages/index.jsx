import { Banner, CardSection } from 'components';

export default function Home() {
	const posters = [
		{
			imgUrl:
				'https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		},
		{
			imgUrl:
				'https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		},
		{
			imgUrl:
				'https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		},
		{
			imgUrl:
				'https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		}
	];

	return (
		<>
			<Banner
				title="Banner title"
				subTitle="here will be the banner subtitle"
				imgUrl="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			/>
			<CardSection title="Card section title" data={posters} size="large" />
			<CardSection title="Card section title" data={posters} />
			<CardSection title="Card section title" data={posters} size="small" />
		</>
	);
}
