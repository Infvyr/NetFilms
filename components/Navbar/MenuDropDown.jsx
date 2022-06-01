import {
	Avatar,
	Button,
	Divider,
	Menu,
	MenuButton,
	MenuItem,
	MenuList
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const MenuDropDown = () => (
	<Menu>
		<MenuButton
			as={Button}
			rightIcon={
				<Image
					src="/static/expand_more.svg"
					alt="expand more"
					width={20}
					height={20}
				/>
			}
			bg="currentColor"
			_focus={{ boxShadow: 'none' }}
			_hover={{ bg: 'blackAlpha.400' }}
			_active={{ bg: 'blackAlpha.500' }}
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
				bg="none"
				size="full"
			/>
		</MenuButton>
		<MenuList>
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
