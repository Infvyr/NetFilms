import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

export default MyApp;
