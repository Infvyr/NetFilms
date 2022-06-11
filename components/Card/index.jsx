import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Card.module.css';

export const Card = ({
	id,
	imgUrl = '/static/no-image-placeholder.webp',
	size = 'medium'
}) => {
	const scaleValue = 1.1;
	const classMap = {
		large: styles['card--large'],
		medium: styles['card--medium'],
		small: styles['card--small']
	};
	const [imgSrc, setImgSrc] = useState(imgUrl);

	const handleOnError = () => setImgSrc('/static/no-image-placeholder.webp');

	const imageLoader = ({ src, width }) =>
		`${src}?auto=compress&cs=tinysrgb&w=${width}&h=750&dpr=2`;

	const scaleProperty =
		id === 'card-0' ? { scaleY: scaleValue } : { scale: scaleValue };

	return (
		<article className={styles['card-container']}>
			<motion.div
				className={cn(styles['card-image--motion'], classMap[size])}
				whileHover={{ ...scaleProperty }}
				whileTap={{ ...scaleProperty }}
			>
				<Image
					src={imgSrc}
					loader={imageLoader}
					alt="poster"
					layout="fill"
					className={styles['card-image']}
					onErrorCapture={handleOnError}
					placeholder="blur"
					blurDataURL
				/>
			</motion.div>
		</article>
	);
};

Card.propTypes = {
	id: PropTypes.string,
	imgUrl: PropTypes.string,
	size: PropTypes.string
};
