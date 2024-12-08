'use client';

import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
	return (
		<ChakraProvider value={defaultSystem}>
			<Theme appearance='light'>
				{children}
			</Theme>
		</ChakraProvider>
	);
}

