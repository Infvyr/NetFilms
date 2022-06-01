import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import Head from 'next/head';
import { Navbar } from 'components';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>NetFilms</title>
			</Head>
			<ChakraProvider theme={theme}>
				<>
					<Navbar />
					<main>
						<Component {...pageProps} />
					</main>
				</>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
