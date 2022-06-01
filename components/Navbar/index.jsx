import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Logo, Menu, MenuDropDown } from 'components/';

export const Navbar = () => {
	const [isSmallerThan576] = useMediaQuery('(max-width: 576px)');

	return (
		<Flex
			pl={4}
			pr={0}
			alignItems="center"
			gap="10"
			pos="sticky"
			top={0}
			zIndex={9999}
			bgColor="currentcolor"
			justifyContent={isSmallerThan576 && 'space-between'}
		>
			<Logo />
			<Menu />
			<MenuDropDown />
		</Flex>
	);
};
