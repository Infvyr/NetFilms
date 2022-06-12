export const getVideos = async (searchQuery) => {
	const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
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
