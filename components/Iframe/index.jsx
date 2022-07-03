import PropTypes from 'prop-types';
import styles from './Iframe.module.css';

export const Iframe = ({ videoId }) => {
	return (
		<iframe
			id="ytplayer"
			className={styles.iframe}
			type="text/html"
			src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&origin=http://example.com`}
		/>
	);
};

Iframe.propTypes = {
	videoId: PropTypes.string
};
