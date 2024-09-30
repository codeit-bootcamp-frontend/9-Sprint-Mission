import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
    children: ReactNode;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const DropdownProvider = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <DropdownContext.Provider value={{ isOpen, setIsOpen }}>{children}</DropdownContext.Provider>;
};

export const useDropdownContext = (): DropdownContextType => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('DropdownContext not found');
    }
    return context;
};

export default DropdownProvider;
