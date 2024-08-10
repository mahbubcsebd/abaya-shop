'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { RxCross1, RxCrossCircled } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/cartContext';



const HeaderCart = () => {
    const { state, dispatch } = useContext(ProductContext);
    const { cartItems, cartTotal } = state;

      const shippingCost = 5.0;
      const total = cartTotal + shippingCost;


    const handleRemoveFromCart = (id) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id,
        });
        const product = cartItems.find((item) => item.id === id);
        toast.success(`Removed ${product.name} from Cart!`, {
            position: 'bottom-right',
        });
    };



    const [show, setShow] = useState(false);
    const cartRef = useRef(null);

    const handleShow = () => {
        setShow(!show);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <div
            className="relative"
            ref={cartRef}
        >
            <button
                type="button"
                className="relative flex items-center gap-1 text-2xl text-white"
                onClick={handleShow}
            >
                <BsCart3 />
                <span className="text-[18px] text-white font-medium">
                    কার্ট
                </span>
                {state.cartItems.length > 0 && (
                    <span className="w-[10px] h-[10px] rounded-full bg-[#FF2848] text-[8px] text-white flex justify-center items-center absolute top-1 left-4">
                        {state.cartItems.length}
                    </span>
                )}
            </button>
            {show && (
                <div className="absolute right-0 top-10 bg-white rounded-lg px-5 py-6 min-w-[300px] lg:min-w-[370px] z-50">
                    {cartItems.length === 0 ? (
                        <p className="text-xl text-center">
                            কার্টে কোন প্রোডাক্ট নেই।
                        </p>
                    ) : (
                        <div>
                            <p className="text-xl font-semibold text-gray-700">
                                {state.cartItems.length} টি আইটেম{' '}
                            </p>
                            <hr className="my-5 border-gray-400" />
                            <div className="grid gap-4">
                                {cartItems.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-start gap-[14px] border-b border-gray-400 pb-4"
                                    >
                                        <div>
                                            <div className="w-[84px] h-[90px] rounded-md overflow-hidden">
                                                <Image
                                                    className="object-cover w-full h-full"
                                                    src={product.preview_image}
                                                    alt={product.name}
                                                    width={84}
                                                    height={84}
                                                />
                                            </div>
                                        </div>
                                        <div className="">
                                            <h2 className="text-sm lg:text-lg text-gray-900 font-medium mb-2 lg:mb-[14px]">
                                                {product.name}
                                            </h2>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <p>{product.quantity}</p>
                                                    <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                        <RxCross1 />
                                                    </p>
                                                    <p className="text-sm lg:text-lg text-[#F93754] font-semibold">
                                                        {product.sale_price > 0
                                                            ? product.sale_price
                                                            : product.unit_price}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            product.id
                                                        )
                                                    }
                                                    type="button"
                                                    className="text-2xl text-gray-400"
                                                >
                                                    <RxCrossCircled />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-5">
                                <p className="text-lg font-semibold text-gray-700">
                                    সর্বমোট :
                                </p>
                                <p className="text-lg font-semibold text-gray-700">
                                    {cartTotal} টাকা
                                </p>
                            </div>
                            <div className="pt-5">
                                <Link
                                    href="/checkout"
                                    className="flex justify-center items-center text-center gap-2 px-[30px] py-4 text-base text-white bg-gray-900 rounded-md w-full"
                                    onClick={handleShow}
                                >
                                    অর্ডার করুন
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderCart;
