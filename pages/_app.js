import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>NetFilms</title>
			</Head>
			<ChakraProvider theme={theme}>
				<main>
					<Component {...pageProps} />
				</main>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
