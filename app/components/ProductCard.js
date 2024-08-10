'use client';

import ImageRatio from '@/app/components/ImageRatio';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import noAvailable from "../assets/icons/no-available.svg";
import { ProductContext } from '../context/cartContext';

const ProductCard = ({ product }) => {
    const productCardRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (productCardRef.current) {
            setWidth(productCardRef.current.offsetWidth);
        }
    }, []);

    const { uuid, name, preview_image, sale_price, unit_price, stock } =
        product;

    const { state, dispatch } = useContext(ProductContext);

    const isInCart = state.cartItems.some((item) => item.id === product.id);

    return (
        <div
            ref={productCardRef}
            className="overflow-hidden rounded-lg product-card"
        >
            {/* <Link
                href={`/product/${uuid}`}
                className="block product-image h-[190px] md:h-[320px] rounded-tl-lg rounded-tr-lg overflow-hidden"
            >
                <Image
                    src={preview_image}
                    alt={name}
                    width={270}
                    height={320}
                    className="object-cover w-full h-full"
                />
            </Link> */}
            <ImageRatio
                src={preview_image ? preview_image : noAvailable}
                initialWidth={width}
                uuid={uuid}
            />
            <div className="product-content p-[10px] md:p-[18px] bg-white">
                <Link
                    href={`/product/${uuid}`}
                    className="block mb-1 text-xs font-medium text-gray-900 md:mb-2 md:text-xl product-title ellipsis-1"
                >
                    {name}
                </Link>
                <p className="product-price text-xs md:text-lg font-semibold text-gray-900 mb-[18px]">
                    মূল্য :{' '}
                    <span
                        className={`inline-block ${
                            sale_price > 0 ? 'line-through md:text-sm' : ''
                        }`}
                    >
                        ৳{unit_price}
                    </span>{' '}
                    {sale_price > 0 && (
                        <span className="text-sm md:text-lg">
                            ৳{sale_price}
                        </span>
                    )}
                </p>
                <Link
                    href={`/product/${uuid}`}
                    className="w-full block text-center py-[10px] px-5 md:py-3 text-[10px] md:text-base font-normal text-white bg-gray-900 rounded-lg product-button"
                >
                    বিস্তারিত দেখুন
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
