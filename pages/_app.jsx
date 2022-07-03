import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import theme from '../config/theme';
import Head from 'next/head';
import { Navbar } from 'components';
import { useEffect, useState } from 'react';
import { magic } from 'lib/magic-client';
import dynamic from 'next/dynamic';

import '../styles/global.css';

const DynamicLogin = dynamic(() =>
	import('../components/Login').then((mod) => mod.Login)
);

function MyApp({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			try {
				const isLoggedIn = await magic.user.isLoggedIn();

				if (isLoggedIn) {
					setIsLoading(false);
					setIsUserLoggedIn(isLoggedIn);
				} else {
					setIsLoading(false);
					setIsUserLoggedIn(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.error(error);
			}
		};

		checkUserLoggedIn();
	}, []);

	return (
		<>
			<Head>
				<title>NetFilms</title>
			</Head>
			<ChakraProvider theme={theme}>
				{/* {isLoading ? (
					<Center height="100vh" bgColor="red.50">
						<Spinner color="red.500" size="xl" />
					</Center>
				) : (
					<>
						{isUserLoggedIn ? (
							<>
								<Navbar />
								<main role="content">
									<Component {...pageProps} />
								</main>
							</>
						) : (
							<DynamicLogin />
						)}
					</>
				)} */}

				<>
					<Navbar />
					<main role="content">
						<Component {...pageProps} />
					</main>
				</>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
