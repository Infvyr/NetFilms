import { Box, Flex, Heading } from '@chakra-ui/react';
import { Card } from 'components';
import PropTypes from 'prop-types';
import styles from './CardSection.module.css';
import Link from 'next/link';

export const CardSection = ({ title, data, size = 'medium' }) => {
	return (
		<Box as="section" p={['24px', '24px 60px']}>
			<Heading size="lg">{title}</Heading>
			<Flex
				className={styles.container}
				gap="2"
				pt="6"
				pb="6"
				overflowX="scroll"
				overflowY="hidden"
			>
				{data.length > 0
					? data.map((rec, idx) => (
							<Link href={`/video/${rec.id}`} key={idx}>
								<a title={rec.title}>
									<Card
										key={idx}
										id={`card-${idx}`}
										imgUrl={rec.imgUrl}
										size={size}
									/>
								</a>
							</Link>
					  ))
					: 'No data to show!'}
			</Flex>
		</Box>
	);
};

CardSection.propTypes = {
	title: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	size: PropTypes.string
};
