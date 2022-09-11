import Head from 'next/head';
import PropTypes from 'prop-types';

export const CustomHead = ({
	title = 'Netty - watch videos',
	description = 'Netty is an online video platform to watch videos from YouTube by built-in categories like popular, disney and travel',
	children
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			{children}
		</Head>
	);
};

CustomHead.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node
};
