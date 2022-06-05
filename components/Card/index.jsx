import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Card.module.css';

export const Card = ({
	imgUrl = '/static/no-image-placeholder.webp',
	size = 'medium'
}) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);
	const classMap = {
		large: styles['card--large'],
		medium: styles['card--medium'],
		small: styles['card--small']
	};

	const handleOnError = () => setImgSrc('/static/no-image-placeholder.webp');
	const imageLoader = ({ src, width }) => {
		return `${src}?auto=compress&cs=tinysrgb&w=${width}&h=750&dpr=2`;
	};

	return (
		<div className={styles['card-container']}>
			<motion.div
				className={cn(styles['card-image--motion'], classMap[size])}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 1.1 }}
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
		</div>
	);
};

Card.propTypes = {
	imgUrl: PropTypes.string,
	size: PropTypes.string
};
