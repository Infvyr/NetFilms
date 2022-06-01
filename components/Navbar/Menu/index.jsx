import { Box, List, ListItem, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './Menu.module.css';

export const Menu = () => {
	return (
		<Box as="nav" flex={1} className={styles.menu}>
			<List display="inline-flex" alignItems="center" fontSize="lg">
				<ListItem>
					<Link href="/" passHref>
						<ChakraLink
							color="white"
							lineHeight={3.35}
							display="block"
							pl={3}
							pr={3}
							transitionDuration="400ms"
							_hover={{ textDecoration: 'none', bgColor: 'blackAlpha.400' }}
						>
							Home
						</ChakraLink>
					</Link>
				</ListItem>
				<ListItem>
					<Link href="/browse/favourites" passHref>
						<ChakraLink
							color="white"
							lineHeight={3.35}
							display="block"
							pl={3}
							transitionDuration="400ms"
							pr={3}
							_hover={{ textDecoration: 'none', bgColor: 'blackAlpha.400' }}
						>
							Favourites
						</ChakraLink>
					</Link>
				</ListItem>
			</List>
		</Box>
	);
};
