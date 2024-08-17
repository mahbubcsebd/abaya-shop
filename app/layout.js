'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { ProductContext } from './context/cartContext';
import { ScrollProvider } from './context/scrollContext';
import './globals.css';
import { cartReducer, initialState } from './reducer/CartReducer';
import { SearchProvider } from './reducer/SearchContext';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

// export const metadata = {
//   title: "Abaya Shop",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
    const pathname = usePathname();

    const [state, dispatch] = useReducer(cartReducer, initialState);
    useEffect(() => {
        dispatch({
            type: 'SET_CART',
        });
    }, []);

    return (
        <html lang="en">
            <GoogleTagManager gtmId="GTM-TJDRPB6Q" />
            <body className={poppins.className}>
                <ProductContext.Provider value={{ state, dispatch }}>
                    <ScrollProvider>
                        <SearchProvider>
                            {pathname !== '/order-successfull' && <Header />}
                            {children}
                            {pathname !== '/order-successfull' && <Footer />}
                            <ToastContainer />
                        </SearchProvider>
                    </ScrollProvider>
                </ProductContext.Provider>
                <button
                    onClick={() =>
                        sendGTMEvent('event', 'SendEventButtonClicked', {
                            value: 'Button clicked working',
                        })
                    }
                >
                    Send Event Button
                </button>
            </body>
        </html>
    );
}
