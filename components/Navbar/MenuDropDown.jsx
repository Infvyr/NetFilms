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
import useMagicLogout from 'hooks/useMagicLogout';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const MenuDropDown = ({ username }) => {
	const { handleLogout } = useMagicLogout();
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
	const menuListBg = useColorModeValue('white', '#1e2634');
	const menuListColor = useColorModeValue('black', 'white');

	return (
		<Menu>
			<MenuButton
				as={Button}
				bg="inherit"
				px={3}
				_focus={{ boxShadow: 'none' }}
				_hover={{ bg: bg }}
				_active={{ bg: bg }}
			>
				<Avatar
					icon={
						<Image
							src="/static/account_circle.svg"
							alt="avatar"
							width={20}
							height={20}
						/>
					}
					size="full"
				/>
			</MenuButton>
			<MenuList bgColor={menuListBg} color={menuListColor}>
				<MenuItem as="div">
					<span>
						<b>Signed in as:</b> <br />
						{username}
					</span>
				</MenuItem>
				<Divider />
				<MenuItem>
					<Link href="/user/profile">
						<a style={{ width: '100%' }}>Profile</a>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/favourites">
						<a style={{ width: '100%' }}>My Favourites</a>
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem>
					<Link href="/">
						<a onClick={handleLogout} style={{ width: '100%' }}>
							Sign out
						</a>
					</Link>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

MenuDropDown.propTypes = {
	username: PropTypes.string
};
