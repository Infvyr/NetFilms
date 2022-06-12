import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import Head from 'next/head';
import { Navbar } from 'components';
import '../styles/global.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>NetFilms</title>
			</Head>
			<ChakraProvider theme={theme}>
				<>
					{router.pathname !== '/login' ? <Navbar /> : null}
					<main role="content">
						<Component {...pageProps} />
					</main>
				</>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
