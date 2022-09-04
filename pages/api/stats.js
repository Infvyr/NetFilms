import jwt from 'jsonwebtoken';

import { findVideoByUser, insertStats, updateStats } from 'lib/db/hasura';

export default async function stats(req, resp) {
	if (req.method === 'POST') {
		try {
			const token = req.cookies['nf-token'];
			if (token) {
				const { videoId, favourited, watched = true } = req.body;
				if (videoId) {
					const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
					const userId = decodedToken.issuer;
					const doesStatsExist = await findVideoByUser(token, userId, videoId);

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
				}
			} else {
				resp.status(403).send({ message: 'Forbidden' });
			}
		} catch (error) {
			console.error('Error /stats', error);
			resp.status(500).send({ done: false, error: error?.message });
		}
	}
}
