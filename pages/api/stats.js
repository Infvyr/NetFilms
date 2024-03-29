import { verifyToken } from 'lib/utils';
import { findVideoByUser, insertStats, updateStats } from 'lib/db/hasura';

export default async function stats(req, resp) {
	try {
		const token = req.cookies['nf-token'];
		if (token) {
			const inputParams = req.method === 'POST' ? req.body : req.query;
			const { videoId } = inputParams;
			if (videoId) {
				const userId = await verifyToken(token);
				const findVideo = await findVideoByUser(token, userId, videoId);
				const doesStatsExist = findVideo?.length > 0;

				if (req.method === 'POST') {
					const { favourited, watched = true } = req.body;
					if (doesStatsExist) {
						// update it
						const response = await updateStats(token, {
							favourited,
							userId,
							videoId,
							watched
						});

						resp.send({
							message: 'Update stats',
							data: response
						});
					} else {
						// add it
						const response = await insertStats(token, {
							favourited,
							userId,
							videoId,
							watched
						});
						resp.send({
							message: 'Add stats',
							data: response
						});
					}
				} else {
					if (doesStatsExist) {
						resp.send(findVideo);
					} else {
						resp.status(404);
						resp.send({ user: null, msg: 'Video not found' });
					}
				}
			}
		}
	} catch (error) {
		console.error('Error stats', error);
		resp.status(500).send({ done: false, error: error?.message });
	}
}
