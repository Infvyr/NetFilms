import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { Logo, Menu, MenuDropDown, SwitchColor } from 'components/';
import useUserMeta from 'hooks/useMagicUserMeta';

export const Navbar = () => {
	const { username } = useUserMeta();
	const [isSmallerThan576] = useMediaQuery('(max-width: 576px)');
	const bgColor = useColorModeValue('#fff', '#19202c');

	return (
		<Flex
			as="header"
			px={[4, 14]}
			alignItems="center"
			gap="10"
			pos="sticky"
			top="0"
			zIndex="9999"
			bgColor={bgColor}
			boxShadow="sm"
			justifyContent={isSmallerThan576 && 'space-between'}
		>
			<Logo />
			<Menu />
			<Flex>
				<SwitchColor />
				<MenuDropDown username={username} />
			</Flex>
		</Flex>
	);
};
