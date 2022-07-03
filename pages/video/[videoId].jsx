import {
	Box,
	Container,
	Heading,
	ListItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	SimpleGrid,
	Text,
	UnorderedList
} from '@chakra-ui/react';
import { Iframe } from 'components';
import { useRouter } from 'next/router';
import { dateFormat } from 'utils/formatDate';

const videoMockup = {
	publishedAt: '2022-06-09T13:00:26Z',
	title: 'DC Super Hero Girls | Two Heads Are Better Than One | @DC Kids',
	description:
		"There's No 'I' in Team! I think we can all agree teamwork can really make the dream work, especially when it comes to taking ...",
	channelTitle: 'DC Kids',
	viewCount: 10000
};

export default function VideoPage() {
	const router = useRouter();
	const videoId = router.query.videoId;

	const onModalClose = () => router.back();

	return (
		<>
			<h1>Video {videoId}</h1>
			<Modal
				isCentered
				onClose={onModalClose}
				size="5xl"
				isOpen="true"
				autoFocus={false}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody p="0">
						<Iframe videoId={videoId} />
					</ModalBody>
					<ModalFooter>
						<Container
							centerContent
							maxW="5xl"
							pl={{ base: 0, md: 4 }}
							pr={{ base: 0, md: 4 }}
							alignItems="unset"
						>
							<SimpleGrid
								columns={{ sm: 1, lg: 2 }}
								spacing={{ base: 4, lg: 9 }}
								templateColumns={{ base: '1fr', lg: '1fr 0.35fr' }}
							>
								<Box maxHeight="25rem" overflowY="scroll">
									{videoMockup?.title && (
										<Heading size="md">{videoMockup.title}</Heading>
									)}
									{videoMockup?.description && (
										<Text mt="3" mb="2">
											{videoMockup.description}
										</Text>
									)}
								</Box>
								<Box order={{ base: -1, lg: 2 }}>
									<UnorderedList listStyleType="none" ml="0">
										{videoMockup.channelTitle && (
											<ListItem>Cast: {videoMockup.channelTitle}</ListItem>
										)}
										{videoMockup.viewCount && (
											<ListItem>Views: {videoMockup.viewCount}</ListItem>
										)}
										{videoMockup?.publishedAt && (
											<ListItem>
												Published:&nbsp;
												<time dateTime={videoMockup.publishedAt}>
													{dateFormat(videoMockup.publishedAt)}
												</time>
											</ListItem>
										)}
									</UnorderedList>
								</Box>
							</SimpleGrid>
						</Container>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
