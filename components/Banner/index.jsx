import {
	Box,
	Button,
	Heading,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';

export const Banner = (props) => {
	const { title, subTitle, imgUrl } = props;
	const btnColorScheme = useColorModeValue('whiteAlpha', 'gray');

	const handleOnClick = (e) => {
		console.log(e.target);
	};

	return (
		<Box
			as="section"
			h="40vh"
			w="100%"
			bg={`url(${imgUrl}) center/cover no-repeat`}
			display="flex"
			alignItems="center"
			padding={5}
			_after={{
				content: '""',
				pos: 'absolute',
				left: 0,
				w: '100%',
				h: 'inherit',
				bgGradient:
					'linear-gradient(to right, hsl(0deg 0% 0% / 24%), hsl(171deg 4% 30% / 70%))'
			}}
		>
			<Box
				w={['100%', 500, '50vw']}
				display="flex"
				flexDir="column"
				alignItems="flex-start"
				color="gray.50"
				zIndex={1}
			>
				<Heading as="h1" noOfLines={1} mb={2} size="2xl">
					{title}
				</Heading>
				<Text noOfLines={2} mb={3} fontSize="lg">
					{subTitle}
				</Text>
				<Box>
					<Button
						pr="6"
						colorScheme={btnColorScheme}
						leftIcon={
							<Image
								src="/static/play-icon.svg"
								alt="play icon"
								width={32}
								height={32}
							/>
						}
						onClick={handleOnClick}
					>
						Play
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
