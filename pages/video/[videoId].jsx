import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	Heading,
	ListItem,
	SimpleGrid,
	Text,
	Tooltip,
	UnorderedList,
	useBoolean
} from '@chakra-ui/react';
import { DislikeIcon, Iframe, LikeIcon } from 'components';
import { getVideoById } from 'lib/videos';
import { useRouter } from 'next/router';
import { dateFormat } from 'utils/formatDate';

export async function getStaticProps(context) {
	const videoId = context.params?.videoId;
	const video = await getVideoById(videoId);

	return {
		props: {
			video: video.length > 0 ? video[0] : {}
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

export default function VideoPage({ video }) {
	const {
		title,
		publishedAt,
		description,
		channelTitle,
		statistics: { viewCount, likeCount, commentCount } = {
			viewCount: 0,
			likeCount: 0,
			commentCount: 0
		}
	} = video;
	const router = useRouter();
	const videoId = router.query.videoId;
	const [likeFlag, setLikeFlag] = useBoolean();
	const [dislikeFlag, setDislikeFlag] = useBoolean();

	const handleToogleLike = () => {
		setLikeFlag.on();
		setDislikeFlag.off();
	};
	const handleToogleDislike = () => {
		setDislikeFlag.on();
		setLikeFlag.off();
	};

	return (
		<>
			<Box height="clamp(50vh, 80vh, 45vh)" bgColor="gray.300">
				<Iframe videoId={videoId} title="video" />
			</Box>
			<Container centerContent maxW="5xl" alignItems="unset">
				<SimpleGrid
					columns={{ sm: 1, lg: 2 }}
					spacing={{ base: 4, lg: 8 }}
					templateColumns={{ base: '1fr', lg: '1fr 0.35fr' }}
					pt="8"
					pb="8"
				>
					<Box borderWidth="1px" borderRadius="lg" p="6">
						<Flex justify="space-between" align="flex-end">
							{title && (
								<Heading as="h1" mb="1" size="md">
									{title}
								</Heading>
							)}
							<ButtonGroup spacing={2}>
								<Tooltip label="Like">
									<Button
										variant="outline"
										width={8}
										height={8}
										padding={0}
										onClick={handleToogleLike}
									>
										<LikeIcon selected={likeFlag} />
									</Button>
								</Tooltip>
								<Tooltip label="Dislike">
									<Button
										variant="outline"
										width={8}
										height={8}
										padding={0}
										onClick={handleToogleDislike}
									>
										<DislikeIcon selected={dislikeFlag} />
									</Button>
								</Tooltip>
							</ButtonGroup>
						</Flex>
						{publishedAt && (
							<>
								<b>Published: </b>
								<time dateTime={publishedAt}>{dateFormat(publishedAt)}</time>
							</>
						)}
						{description && (
							<Text mt="3" mb="3">
								{description}
							</Text>
						)}
					</Box>
					<Box
						order={{ base: -1, lg: 2 }}
						borderWidth="1px"
						borderRadius="lg"
						p="6"
					>
						<UnorderedList listStyleType="none" ml="0">
							{channelTitle && (
								<ListItem>
									<b>Cast: </b>
									{channelTitle}
								</ListItem>
							)}
							{viewCount && (
								<ListItem>
									<b>Views: </b>
									{viewCount}
								</ListItem>
							)}
							{likeCount && (
								<ListItem>
									<b>Likes: </b>
									{likeCount}
								</ListItem>
							)}
							{commentCount && (
								<ListItem>
									<b>Comments: </b>
									{commentCount}
								</ListItem>
							)}
						</UnorderedList>
					</Box>
				</SimpleGrid>
			</Container>
		</>
	);
}
