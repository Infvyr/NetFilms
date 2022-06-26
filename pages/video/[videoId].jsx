import { useRouter } from 'next/router';

export default function VideoPage() {
	const router = useRouter();

	return <>Video {router.query.videoId}</>;
}
