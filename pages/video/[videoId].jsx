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
import { getVideoById } from 'lib/videos';
import { useRouter } from 'next/router';
import { dateFormat } from 'utils/formatDate';

export async function getStaticProps() {
	let videoId = 'venrE8gdz30';
	const videoMockup = await getVideoById(videoId);

	return {
		props: {
			videoMockup: videoMockup.length > 0 ? videoMockup[0] : {}
		},
		revalidate: 10
	};
}

export async function getStaticPaths() {
	const listOfVideos = ['venrE8gdz30', 'GTBy9SRDOAM', '7CWIJmp9ukI'];

	const paths = listOfVideos.map((videoId) => ({
		params: { videoId }
	}));

	return { paths, fallback: 'blocking' };
}

export default function VideoPage({ videoMockup }) {
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
										<Heading mb="1" size="md">
											{videoMockup.title}
										</Heading>
									)}
									{videoMockup?.publishedAt && (
										<>
											<b>Published: </b>
											<time dateTime={videoMockup.publishedAt}>
												{dateFormat(videoMockup.publishedAt)}
											</time>
										</>
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
											<ListItem>
												<b>Cast: </b>
												{videoMockup.channelTitle}
											</ListItem>
										)}
										{videoMockup.statistics.viewCount && (
											<ListItem>
												<b>Views: </b>
												{videoMockup.statistics.viewCount}
											</ListItem>
										)}
										{videoMockup.statistics.likeCount && (
											<ListItem>
												<b>Likes: </b>
												{videoMockup.statistics.likeCount}
											</ListItem>
										)}
										{videoMockup.statistics.commentCount && (
											<ListItem>
												<b>Comments: </b>
												{videoMockup.statistics.commentCount}
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
