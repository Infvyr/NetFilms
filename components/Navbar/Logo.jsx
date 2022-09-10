import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Logo = () => {
	const { pathname } = useRouter();

	return (
		<Box>
			<Heading size="xl" color="red.500">
				{pathname === '/' ? (
					<Text cursor="default">Netty</Text>
				) : (
					<Link href="/" passHref>
						<a>Netty</a>
					</Link>
				)}
			</Heading>
		</Box>
	);
};
