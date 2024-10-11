// src/pages/_app.tsx
import { AppProps } from 'next/app'; // Import the AppProps type
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
// fixed the type issue
export default function App({ Component, pageProps }: AppProps) { // Use AppProps type here
    return (
        <CartProvider>
            <Navbar />
            <Component {...pageProps} />
        </CartProvider>
    );
}
