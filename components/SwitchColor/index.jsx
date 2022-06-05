import { Button, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export const SwitchColor = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			aria-label="Switch color mode"
			onClick={toggleColorMode}
			variant="ghost"
		>
			{colorMode === 'light' ? (
				<Image
					src="/static/dark-mode.svg"
					alt="dark-color-mode"
					width={20}
					height={20}
				/>
			) : (
				<Image
					src="/static/light-mode.svg"
					alt="light-color-mode"
					width={20}
					height={20}
				/>
			)}
		</Button>
	);
};
