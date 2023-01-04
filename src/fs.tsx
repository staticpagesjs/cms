import React from 'react';

const FS = React.createContext(null);

export const useFS = React.useContext(FS);

type FSProviderProps = {
	backend: Record<string, unknown>;
	children?: React.ReactNode;
};

export const FSProvider: React.FunctionComponent<FSProviderProps> = ({ children, backend }) =>
	<FS.Provider value={backend}>
		{children}
	</FS.Provider>;
