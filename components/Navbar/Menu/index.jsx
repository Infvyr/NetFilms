import {
	Box,
	List,
	ListItem,
	Link as ChakraLink,
	useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import styles from './Menu.module.css';

export const Menu = () => {
	const bg = useColorModeValue('gray.100', 'blackAlpha.400');

	return (
		<Box as="nav" flex={1} className={styles.menu} role="navigation">
			<List display="inline-flex" alignItems="center" fontSize="lg">
				<ListItem>
					<Link href="/" passHref>
						<ChakraLink
							lineHeight={3.35}
							display="block"
							pl={3}
							pr={3}
							transitionDuration="400ms"
							_hover={{ textDecoration: 'none', bgColor: bg }}
						>
							Home
						</ChakraLink>
					</Link>
				</ListItem>
				<ListItem>
					<Link href="/browse/favourites" passHref>
						<ChakraLink
							lineHeight={3.35}
							display="block"
							pl={3}
							transitionDuration="400ms"
							pr={3}
							_hover={{ textDecoration: 'none', bgColor: bg }}
						>
							Favourites
						</ChakraLink>
					</Link>
				</ListItem>
			</List>
		</Box>
	);
};
