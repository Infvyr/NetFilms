import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	Input
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import bgImage from '../public/static/netflix-bg.webp';

export default function Login() {
	const [email, setEmail] = useState('');
	const [isEmailError, setIsEmailError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const handleInputChange = (e) => {
		setErrorMessage('');
		setEmail(e.target.value.trim());
	};

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();

			const regExp = new RegExp(
				// eslint-disable-next-line no-control-regex
				"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
			);

			if (email.match(regExp)) {
				if (email === 'testmail@mail.loc') {
					router.push('/');
				} else {
					setIsEmailError(true);
					setErrorMessage('You entered an unregistered email address!');
				}
			} else {
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
							isLoading={false}
							onClick={onSubmit}
							loadingText="Signing in"
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
}
