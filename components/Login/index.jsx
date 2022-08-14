import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	Input
} from '@chakra-ui/react';
import { magic } from 'lib/magic-client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import bgImage from '../../public/static/netflix-bg.webp';

const regExp = new RegExp(
	// eslint-disable-next-line no-control-regex
	"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);

export const Login = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isEmailError, setIsEmailError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	useEffect(() => {
		const handleComplete = () => setIsLoading(false);

		router.events.on('routerChangeComplete', handleComplete);
		router.events.on('routerChangeError', handleComplete);

		return () => {
			router.events.off('routerChangeComplete', handleComplete);
			router.events.off('routerChangeError', handleComplete);
		};
	}, [router]);

	const handleInputChange = (e) => {
		setErrorMessage('');
		setEmail(e.target.value.trim());
	};

	const onSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			if (email.match(regExp)) {
				if (email) {
					try {
						setIsLoading(true);
						const didToken = await magic.auth.loginWithMagicLink({
							email
						});
						if (didToken) {
							const response = await fetch('/api/login', {
								method: 'POST',
								headers: {
									Authorization: `Bearer ${didToken}`,
									'Content-Type': 'application/json'
								}
							});

							const loggedInResponse = await response.json();

							if (loggedInResponse?.done) {
								router.push('/');
								window.location.reload();
							} else {
								setIsLoading(false);
								setErrorMessage('Something went wrong logging in');
							}
						}
					} catch (error) {
						setIsLoading(false);
						console.error('Something went wrong logging in', error);
					}
				} else {
					setIsLoading(false);
					setIsEmailError(true);
					setErrorMessage('You entered an unregistered email address!');
				}
			} else {
				setIsLoading(false);
				setIsEmailError(true);
				setErrorMessage('Enter a valid email address!');
			}
		},
		[email, router]
	);

	return (
		<Box
			height="100vh"
			bg={`url(${bgImage.src}) center/cover no-repeat`}
			position="relative"
			_after={{
				content: '""',
				pos: 'absolute',
				left: 0,
				top: 0,
				w: '100%',
				h: 'inherit',
				bgColor: 'rgba(0 0 0 / 50%)'
			}}
		>
			<Box
				width="100%"
				maxW={['100%', '450px']}
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%, -50%)"
				zIndex="1"
			>
				<Box p={10} width="inherit" bgColor="rgba(0,0,0, 0.75)" color="white">
					<Heading as="h1">Sign In</Heading>
					<Box mt="2rem" mb="2rem">
						<FormControl isRequired isInvalid={isEmailError}>
							<Input
								id="email"
								type="email"
								value={email}
								placeholder="Email"
								size="lg"
								onChange={handleInputChange}
								border="none"
								bgColor="#333"
							/>
							{isEmailError && (
								<FormErrorMessage>{errorMessage}</FormErrorMessage>
							)}
						</FormControl>

						<br />

						<Button
							isLoading={isLoading}
							onClick={onSubmit}
							loadingText="Loading"
							spinnerPlacement="end"
							colorScheme="red"
							width="100%"
							size="lg"
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
