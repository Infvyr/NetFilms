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
	useColorMode
} from '@chakra-ui/react';
import { DislikeIcon, Iframe, LikeIcon } from 'components';
import { getVideoById } from 'lib/videos';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { dateFormat, formatNumber } from 'utils';

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
	const { colorMode } = useColorMode();
	const router = useRouter();
	const videoId = router.query.videoId;
	const [likeFlag, setLikeFlag] = useState(false);
	const [dislikeFlag, setDislikeFlag] = useState(false);
	const fetchedVideoRef = useRef(false);

	const bgTooltip = colorMode === 'light' ? 'gray.800' : 'whiteAlpha.50';
	const colorTooltip = colorMode === 'light' ? 'gray.100' : 'white';

	const runRatingService = useCallback(
		async (favourited) => {
			return await fetch('/api/stats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					videoId,
					favourited
				})
			});
		},
		[videoId]
	);

	const handleLike = useCallback(async () => {
		try {
			setLikeFlag(true);
			setDislikeFlag(false);
			const favourited = likeFlag ? 0 : 1;
			await runRatingService(favourited);
		} catch (error) {
			console.error(error);
		}
	}, [likeFlag, runRatingService]);

	const handleDislike = useCallback(async () => {
		try {
			setDislikeFlag(true);
			setLikeFlag(false);
			const favourited = dislikeFlag ? 1 : 0;
			await runRatingService(favourited);
		} catch (error) {
			console.error(error);
		}
	}, [dislikeFlag, runRatingService]);

	const debouncedSetLike = useMemo(
		() => debounce(handleLike, 300),
		[handleLike]
	);
	const debouncedSetDislike = useMemo(
		() => debounce(handleDislike, 300),
		[handleDislike]
	);

	useEffect(() => {
		if (fetchedVideoRef.current) return;
		fetchedVideoRef.current = true;

		(async () => {
			try {
				const response = await fetch(`/api/stats?videoId=${videoId}`);
				const data = await response.json();
				if (data.length > 0) {
					const favourited = data[0].favourited;
					if (favourited === 1) setLikeFlag(true);
					if (favourited === 0) setDislikeFlag(true);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [videoId]);

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
								<Tooltip
									label="Like"
									hasArrow
									bg={bgTooltip}
									color={colorTooltip}
								>
									<Button
										variant="outline"
										width={8}
										height={8}
										padding={0}
										_hover={{ bgColor: 'whiteAlpha.50' }}
										onClick={debouncedSetLike}
									>
										<LikeIcon selected={likeFlag} />
									</Button>
								</Tooltip>
								<Tooltip
									label="Dislike"
									hasArrow
									bg={bgTooltip}
									color={colorTooltip}
								>
									<Button
										variant="outline"
										width={8}
										height={8}
										padding={0}
										_hover={{ bgColor: 'whiteAlpha.50' }}
										onClick={debouncedSetDislike}
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
									{formatNumber(viewCount)}
								</ListItem>
							)}
							{likeCount && (
								<ListItem>
									<b>Likes: </b>
									{formatNumber(likeCount)}
								</ListItem>
							)}
							{commentCount && (
								<ListItem>
									<b>Comments: </b>
									{formatNumber(commentCount)}
								</ListItem>
							)}
						</UnorderedList>
					</Box>
				</SimpleGrid>
			</Container>
		</>
	);
}
