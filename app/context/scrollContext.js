import { createContext, useRef } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const productDivRef = useRef(null);

    const scrollToMyProduct = () => {
        if (productDivRef.current) {
            productDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <ScrollContext.Provider value={{ productDivRef, scrollToMyProduct }}>
            {children}
        </ScrollContext.Provider>
    );
};

export default ScrollContext;
