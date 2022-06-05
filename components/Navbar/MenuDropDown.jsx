import {
	Avatar,
	Button,
	Divider,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const MenuDropDown = () => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
	const menuListBg = useColorModeValue('white', '#1e2634');
	const menuListColor = useColorModeValue('black', 'white');

	return (
		<Menu>
			<MenuButton
				as={Button}
				bg="inherit"
				_focus={{ boxShadow: 'none' }}
				_hover={{ bg: bg }}
				_active={{ bg: bg }}
			>
				<Avatar
					icon={
						<Image
							src="/static/account_circle.svg"
							alt="avatar"
							width={30}
							height={30}
						/>
					}
					size="full"
				/>
			</MenuButton>
			<MenuList bgColor={menuListBg} color={menuListColor}>
				<MenuItem>
					<Link href="/user/profile">
						<a style={{ width: '100%' }}>Profile</a>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/browse/favourites">
						<a style={{ width: '100%' }}>My Favourites</a>
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem>
					<Link href="/login">
						<a style={{ width: '100%' }}>Sign out</a>
					</Link>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
