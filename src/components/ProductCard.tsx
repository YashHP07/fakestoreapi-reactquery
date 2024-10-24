

// import { Product } from '../types/Product';
// import { useCart } from '../hooks/useCart';

// interface ProductCardProps {
//     product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//     const { addToCart } = useCart();

//     return (
//         <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white">
//             <img 
//                 src={product.image} 
//                 alt={product.title} 
//                 className="h-48 w-full object-cover transition-opacity duration-300 hover:opacity-80" 
//             />
//             <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
//                 <p className="text-lg text-gray-600 font-bold">${product.price.toFixed(2)}</p>
//                 <button
//                     className="bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-md shadow hover:bg-blue-700 transition duration-200 w-full"
//                     onClick={() => addToCart(product)}
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// }


import { Product } from '../types/Product';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white flex flex-col">
            <img 
                src={product.image} 
                alt={product.title} 
                className="h-48 w-full object-cover transition-opacity duration-300 hover:opacity-80" 
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
                    <p className="text-lg text-gray-600 font-bold">${product.price.toFixed(2)}</p>
                </div>
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-md shadow hover:bg-blue-700 transition duration-200 w-full"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}







