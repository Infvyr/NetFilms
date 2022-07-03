import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DynamicIframe = dynamic(() => import('../').then((mod) => mod.Iframe), {
	ssr: false
});

export const Banner = (props) => {
	const [visible, setVisible] = useState(false);
	const { title, subTitle, imgUrl, videoId } = props;
	const btnColorScheme = useColorModeValue('whiteAlpha', 'gray');

	const onModalOpen = () => setVisible((prev) => !prev);
	const onModalClose = () => setVisible((prev) => !prev);

	return (
		<>
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
						{videoId && (
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
								onClick={onModalOpen}
							>
								Play
							</Button>
						)}
					</Box>
				</Box>
			</Box>

			<Modal
				isCentered
				onClose={onModalClose}
				size="5xl"
				isOpen={visible}
				autoFocus
			>
				<ModalOverlay
					bg="blackAlpha.300"
					backdropFilter="blur(10px) hue-rotate(90deg)"
				/>
				<ModalContent>
					<ModalCloseButton
						position="absolute"
						top="-32px"
						color="darkgrey"
						_hover={{ color: 'red.500' }}
					/>
					<ModalBody p="0">
						<DynamicIframe videoId={videoId} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};;

Banner.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	imgUrl: PropTypes.string,
	videoId: PropTypes.string
};
