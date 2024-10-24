
// src/components/Navbar.tsx

import { useCart } from '../hooks/useCart';
import Link from 'next/link';

export default function Navbar() {
    const { cart } = useCart();
 

    return (
        <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-blue-400 p-4 flex justify-between items-center shadow-lg  z-50">
            <h1 className="ml-4 text-white text-3xl font-extrabold drop-shadow-lg">E-Commerce Store</h1>
           
            <Link href="/cart" className="text-white">
                <div className="mr-8 relative hover:scale-110 transition-transform duration-300">
                    <span className="material-icons">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png" 
                            className='h-[40px] w-[50px] drop-shadow-lg' 
                        />
                    </span>
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shadow-md">
                            {cart.length}
                        </span>
                    )}
                </div>
            </Link>
        </nav>
    );
}
