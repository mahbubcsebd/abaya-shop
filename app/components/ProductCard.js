// "use client"

import Image from "next/image";
import Link from "next/link";
// import { useContext } from "react";
// import { TiShoppingCart } from 'react-icons/ti';
// import { toast } from "react-toastify";
// import { ProductContext } from '../context/cartContext';


const ProductCard = ({ product }) => {
    const {uuid, name, preview_image, sale_price} = product;

    // const { state, dispatch } = useContext(ProductContext);

    // const isInCart = state.cartItems.some((item) => item.id === product.id);

    // function handleAddToCart(event, product) {
    //     event.stopPropagation();

    //     if (!isInCart) {
    //         dispatch({
    //             type: 'ADD_TO_CART',
    //             payload: {
    //                 ...product,
    //             },
    //         });
    //         toast.success(`Added  ${product.name} to Cart!`, {
    //             position: 'bottom-right',
    //         });
    //     } else {
    //         toast.error(
    //             `The product ${product.name} has already been added to the cart`,
    //             {
    //                 position: 'bottom-right',
    //             }
    //         );
    //     }
    // }


    return (
        <div className="overflow-hidden rounded-lg product-card">
            <Link
                href={`/product/${uuid}`}
                className="block product-image h-[190px] md:h-[320px] rounded-lg overflow-hidden"
            >
                {/* <Image
                    src={product1}
                    alt={name}
                    className="object-cover w-full h-full"
                /> */}
                <Image
                    src={preview_image}
                    alt={name}
                    width={270}
                    height={320}
                    className="object-cover w-full h-full"
                />
            </Link>
            <div className="product-content p-[10px] md:p-[18px] bg-white">
                <Link
                    href={`/product/${uuid}`}
                    className="block mb-1 text-xs font-medium text-gray-900 md:mb-2 md:text-xl product-title"
                >
                    {name}
                </Link>
                <p className="product-price text-xs md:text-lg font-semibold text-gray-900 mb-[18px]">
                    দাম : ৳{sale_price}
                </p>
                <button
                    type="button"
                    className="w-full py-[10px] px-5 md:py-3 text-[10px] md:text-base font-normal text-white bg-gray-900 rounded-lg product-button"
                >
                    অর্ডার করুন
                </button>
                {/* <button
                    type="button"
                    className={`w-9 h-9 rounded-full border border-gray-400 p-[6] flex justify-center items-center transition duration-150 ${
                        isInCart
                            ? 'text-white bg-blue-900'
                            : 'text-blue-900 bg-white'
                    }`}
                    onClick={(e) => handleAddToCart(e, product)}
                >
                    {' '}
                    <TiShoppingCart />
                </button> */}
            </div>
        </div>
    );
};

export default ProductCard