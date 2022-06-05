import { SimpleGrid } from '@chakra-ui/react';
import { Banner, Card } from 'components';

export default function Home() {
	return (
		<>
			<Banner
				title="Banner title"
				subTitle="here will be the banner subtitle"
				imgUrl="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			/>
			<SimpleGrid columns={4} spacing={0.5}>
				<Card imgUrl="https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
				<Card imgUrl="https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
				<Card imgUrl="https://images.pexels.com/photos/2925328/pexels-photo-2925328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
				<Card imgUrl="https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
			</SimpleGrid>
		</>
	);
}
