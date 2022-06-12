import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false
};

const theme = extendTheme({
	fonts: {
		heading: `'IBM Plex Sans', sans-serif`
	},
	...config
});

export default theme;
