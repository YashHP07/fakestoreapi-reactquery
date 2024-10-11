
"use client"; // Add this line to make this a client component

import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from '../context/CartContext'; // Adjust the path as needed
import './globals.css';
import Navbar from '../components/Navbar';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <html lang="en">
                    <body>
                        <Navbar />
                        {children}
                    </body>
                </html>
            </CartProvider>
        </QueryClientProvider>
    );
}
