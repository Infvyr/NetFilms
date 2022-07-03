import mockData from '../data/mockData.json';

const fetchVideos = async (url) => {
	const YOUTUBE_API_URL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;
	const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

	const response = await fetch(
		`${YOUTUBE_API_URL}/${url}&maxResults=20&key=${YOUTUBE_API_KEY}`
	);
	return await response.json();
};

export const getCommonVideos = async (url) => {
	try {
		const isDev = process.env.DEVELOPMENT;
		const data = isDev ? mockData : await fetchVideos(url);
		const ITEMS = data?.items;

		if (data?.error) {
			console.error('Youtube API error', data.error);

			return mockData.items.map((item) => {
				const id = item?.id?.videoId || item?.id?.kind || item.id;
				const snippet = item.snippet;

				return {
					id,
					title: snippet.title,
					imgUrl: snippet.thumbnails.high.url,
					description: snippet?.description,
					publishedAt: snippet?.publishedAt,
					channelTitle: snippet.channelTitle,
					statistics: item?.statistics ?? {}
				};
			});
		}

		return ITEMS.map((item) => {
			const id = item?.id?.videoId || item?.id?.kind || item.id;
			const snippet = item.snippet;

			return {
				id,
				title: snippet.title,
				imgUrl: snippet.thumbnails.high.url,
				description: snippet?.description,
				publishedAt: snippet?.publishedAt,
				channelTitle: snippet.channelTitle,
				statistics: item?.statistics ?? {}
			};
		});
	} catch (error) {
		console.error('Something went wrong with video library', error);

		return mockData.items.map((item) => {
			const id = item?.id?.videoId || item?.id?.kind || item.id;
			const snippet = item.snippet;

			return {
				id,
				title: snippet.title,
				imgUrl: snippet.thumbnails.high.url,
				description: snippet?.description,
				publishedAt: snippet?.publishedAt,
				channelTitle: snippet.channelTitle,
				statistics: item?.statistics ?? {}
			};
		});
	}
};

export const getVideos = (searchQuery) => {
	const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
	return getCommonVideos(URL);
};

export const getPopularVideos = () => {
	const URL =
		'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';
	return getCommonVideos(URL);
};

export const getVideoById = (videoId) => {
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
	return getCommonVideos(URL);
};
