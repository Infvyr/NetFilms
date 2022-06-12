export const getCommonVideos = async (url) => {
	const YOUTUBE_API_URL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;
	const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

	try {
		const response = await fetch(
			`${YOUTUBE_API_URL}/${url}&maxResults=20&key=${YOUTUBE_API_KEY}`
		);
		const data = await response.json();

		if (data?.error) {
			console.error('Youtube API error', data.error);
			return [];
		}

		return data?.items.map((item) => {
			const id = item?.id?.videoId || item?.id?.kind || item.id;

			return {
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
				id
			};
		});
	} catch (error) {
		console.error('Something went wrong with video library', error);
		return [];
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
