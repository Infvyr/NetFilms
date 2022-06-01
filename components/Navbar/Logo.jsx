import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Logo = () => {
	const { pathname } = useRouter();

	return (
		<Box>
			<Heading size="xl" color="red.500">
				{pathname === '/' ? (
					<Text cursor="default">NetFilms</Text>
				) : (
					<Link href="/" passHref>
						<a>NetFilms</a>
					</Link>
				)}
			</Heading>
		</Box>
	);
};
