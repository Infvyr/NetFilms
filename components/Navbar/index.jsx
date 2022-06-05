import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { Logo, Menu, MenuDropDown, SwitchColor } from 'components/';

export const Navbar = () => {
	const [isSmallerThan576] = useMediaQuery('(max-width: 576px)');
	const bgColor = useColorModeValue('#fff', '#19202c');

	return (
		<Flex
			pl="4"
			pr="0"
			alignItems="center"
			gap="10"
			pos="sticky"
			top="0"
			zIndex="9999"
			bgColor={bgColor}
			justifyContent={isSmallerThan576 && 'space-between'}
		>
			<Logo />
			<Menu />
			<Flex>
				<SwitchColor />
				<MenuDropDown />
			</Flex>
		</Flex>
	);
};
