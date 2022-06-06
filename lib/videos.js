import videoData from '../data/mockData.json';

export const getVideos = () =>
	videoData.items.map((item) => ({
		title: item.snippet.title,
		imgUrl: item.snippet.thumbnails.high.url,
		id: item?.id?.videoId
	}));
