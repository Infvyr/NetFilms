import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	Input
} from '@chakra-ui/react';
import { useState } from 'react';
import bgImage from '../public/static/netflix-bg.webp';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
	const [input, setInput] = useState('');
	const [isInputError, setIsInputError] = useState(null);

	const handleInputChange = (e) => setInput(e.target.value);

	const onSubmit = () => {};

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
					<form className={styles['login-form']}>
						<FormControl isRequired>
							<Input
								id="email"
								type="email"
								value={input}
								placeholder="Email"
								size="lg"
								onChange={handleInputChange}
								border="none"
								bgColor="#333"
							/>
							{isInputError && (
								<FormErrorMessage>Email is required.</FormErrorMessage>
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
					</form>
				</Box>
			</Box>
		</Box>
	);
}

Login.getLayout = function getLayout(page) {
	return <div className="LOGIN">{page}</div>;
};
