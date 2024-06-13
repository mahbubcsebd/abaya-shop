'use client';

import bkash from "@/app/assets/icons/bkash.svg";
import cod from "@/app/assets/icons/cod.svg";
import nagad from "@/app/assets/icons/nagad.svg";
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RxCross1, RxCrossCircled } from 'react-icons/rx';
import { toast } from 'react-toastify';
import Input from '../components/form/Input';
import PaymentRadio from "../components/form/PaymentRadio";
import RadioButton from '../components/form/RadioButton';
import { ProductContext } from '../context/cartContext';
import { orderPost } from "../utils/orderPost";

const Checkout = () => {
    const [selectedValue, setSelectedValue] = useState('inside_dhaka');
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [shippingCost, setShippingCost] = useState(80);

    const [nameWarningMessage, setNameWarningMessage] = useState(null);
    // const [emailWarningMessage, setEmailWarningMessage] = useState(null);
    const [phoneWarningMessage, setPhoneWarningMessage] = useState(null);
    const [addressWarningMessage, setAddressWarningMessage] = useState(null);

    const { state, dispatch } = useContext(ProductContext);
    const { cartItems, cartTotal } = state;

    const total = cartTotal + shippingCost;

    const orderedProduct = [];
    cartItems.map((product) =>
        orderedProduct.push({
            product_id: product.id,
            quantity: product.quantity,
            price: product.sale_price,
            size_id: product.size_id,
            color_id: product.color_id,
            total: product.quantity * product.sale_price,
        })
    );

    const totalQuantity = cartItems.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.quantity;
    }, 0);

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

    const handleIncrement = (id) => {
        dispatch({
            type: 'INCREMENT_QUANTITY',
            payload: id,
        });
    };
    const handleDecrement = (id) => {
        dispatch({
            type: 'DECREMENT_QUANTITY',
            payload: id,
        });
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

        if (event.target.value === 'inside_dhaka') {
            setShippingCost(80);
        }

        if (event.target.value === 'outside_dhaka') {
            setShippingCost(120);
        }
    };

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const {name, email, address, phone} = data;

        if (name === '' || name === null || name === undefined) {
            setNameWarningMessage('Name is required');
        } else {
            setNameWarningMessage(null);
        }

        if (phone === '' || phone === null || phone === undefined) {
            setPhoneWarningMessage('Phone is required');
        } else {
            setPhoneWarningMessage(null);
        }

        if (address === '' || address === null || address === undefined) {
            setAddressWarningMessage('Address is required');
        } else {
            setAddressWarningMessage(null);
        }

        const orderData = {
            ...data,
            products: orderedProduct,
            delivery_fee: shippingCost,
            total_quantity: totalQuantity,
            total_amount: cartTotal,
        };

        try {
            const response = await orderPost(JSON.stringify(orderData));
            if (response.ok) {
                const responseData = await response.json();

                if (responseData.success) {
                    toast.success(`${responseData.success}`, {
                        position: 'bottom-right',
                    });

                    dispatch({
                        type: 'CLEAR_CART',
                    });
                }

                // else {
                //     toast.error(
                //         `Failed to submit review ${responseData.message}`,
                //         {
                //             position: 'bottom-right',
                //         }
                //     );
                // }

                setSuccessMessage(responseData.success);
            } else {
                throw new Error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };



    return (
        <div
            id="cart-page"
            className="py-20 cart-page"
        >
            <div className="cart-area">
                <div className="container">
                    <form
                        onSubmit={submitHandler}
                        id="cart-form"
                        className="cart-form"
                    >
                        <div className="grid grid-cols-12 gap-[30px]">
                            <div className="col-span-12 lg:col-span-7">
                                <h2 className="text-base lg:text-4xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1">
                                    প্রাপকের ঠিকানা{' '}
                                    <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                </h2>
                                <div className="lg:p-[30px] lg:rounded-[20px] lg:bg-white">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] lg:gap-4 mb-[30px]">
                                        <RadioButton
                                            label="ঢাকার ভিতরে"
                                            value="inside_dhaka"
                                            name="delivery_location"
                                            checked={
                                                selectedValue === 'inside_dhaka'
                                            }
                                            onChange={handleChange}
                                        />
                                        <RadioButton
                                            label="ঢাকার বাহিরে"
                                            value="outside_dhaka"
                                            name="delivery_location"
                                            checked={
                                                selectedValue ===
                                                'outside_dhaka'
                                            }
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-[18px] lg:gap-6">
                                        <Input
                                            label="আপনার নাম"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            warningMessage={
                                                nameWarningMessage
                                                    ? nameWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <Input
                                            label="মোবাইল নাম্বার"
                                            type="number"
                                            name="phone"
                                            placeholder="018xxxxxxxx"
                                            warningMessage={
                                                phoneWarningMessage
                                                    ? phoneWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <Input
                                            label="ইমেইল এড্রেস"
                                            type="email"
                                            name="email"
                                            optional="Optional"
                                            placeholder="demo@gmail.com"
                                            // warningMessage={emailWarningMessage ? emailWarningMessage : null}
                                            required
                                        />
                                        <Input
                                            label="পুরো ঠিকানা"
                                            type="text"
                                            name="address"
                                            placeholder="বাসা নাম্বার, রোড নাম্বার, এলাকার নাম, থানা, জেলা"
                                            warningMessage={
                                                addressWarningMessage
                                                    ? addressWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-5">
                                <div className="mb-10 cart-payment-amount">
                                    <h2 className="text-base lg:text-4xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1">
                                        আপনার অর্ডার
                                        <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                    </h2>
                                    <div className="p-[30px] rounded-[20px] bg-white">
                                        {cartItems.length > 0 ? (
                                            <div>
                                                <ul className="grid gap-3">
                                                    {cartItems.map(
                                                        (
                                                            product,
                                                            index,
                                                            cartArray
                                                        ) => (
                                                            <li
                                                                key={product.id}
                                                            >
                                                                <div
                                                                    className={`flex items-start gap-[14px] ${
                                                                        index ===
                                                                        cartArray.length -
                                                                            1
                                                                            ? 'border-b-0'
                                                                            : 'pb-3 border-b border-gray-400'
                                                                    }`}
                                                                >
                                                                    <div>
                                                                        <div className="w-[84px] h-[90px] lg:w-[110px] lg:h-[120px] rounded-[10px] overflow-hidden">
                                                                            <Image
                                                                                className="object-cover w-full h-full"
                                                                                src={
                                                                                    product.preview_image
                                                                                }
                                                                                alt={
                                                                                    product.name
                                                                                }
                                                                                width={
                                                                                    84
                                                                                }
                                                                                height={
                                                                                    84
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-auto">
                                                                        <h2 className="text-sm lg:text-lg text-gray-900 font-semibold mb-[10px] ellipsis-2 h-[54px]">
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </h2>
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            <div className="flex justify-between items-center w-[90px] h-[30px] border bg-[#EAEAEA] rounded-md px-[3px]">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleDecrement(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    className="flex items-center justify-center w-6 h-6 text-xs text-gray-600 bg-white rounded-md quantity-decrement"
                                                                                >
                                                                                    <FaMinus />
                                                                                </button>
                                                                                <div className="text-xs text-gray-600 quantity">
                                                                                    {
                                                                                        product.quantity
                                                                                    }
                                                                                </div>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleIncrement(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    className="flex items-center justify-center w-6 h-6 text-xs text-gray-600 bg-white rounded-md quantity-increment"
                                                                                >
                                                                                    <FaPlus />
                                                                                </button>
                                                                            </div>
                                                                            <p className="font-semibold text-gray-500 tex-sm lg:text-xl">
                                                                                <RxCross1 />
                                                                            </p>
                                                                            <p className="text-sm lg:text-lg text-[#F93754] font-semibold">
                                                                                ৳
                                                                                {
                                                                                    product.sale_price
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-1">
                                                                                <p className="text-[9px] bg-gray-900 text-white py-[2px] rounded-lg leading-[12px] px-2">
                                                                                    {
                                                                                        product.color_name
                                                                                    }
                                                                                </p>
                                                                                <p className="text-[9px] bg-gray-900 text-white py-[2px] rounded-lg leading-[12px] px-2">
                                                                                    {
                                                                                        product.size_name
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleRemoveFromCart(
                                                                                        product.id
                                                                                    )
                                                                                }
                                                                                type="button"
                                                                                className="text-lg text-gray-400"
                                                                            >
                                                                                <RxCrossCircled />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                                <hr className="mt-3 border-gray-400 lg:mt-5 lg:mb-2" />
                                                <ul className="">
                                                    <li className="flex items-center justify-between py-3 border-b border-gray-400 lg:py-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            মোট :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {cartTotal} টাকা
                                                        </p>
                                                    </li>
                                                    <li className="flex items-center justify-between py-3 border-b border-gray-400 lg:py-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            ডেলিভারি ফি :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {shippingCost} টাকা
                                                        </p>
                                                    </li>
                                                    <li className="flex items-center justify-between pt-3 lg:pt-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            সর্বমোট :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {total} টাকা
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-base font-semibold text-gray-800">
                                                কার্টে কোন প্রডাক্ট নেই
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="cart-payment-option">
                                    <h2 className="text-base lg:text-4xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1">
                                        পেমেন্ট অপশন
                                        <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                    </h2>
                                    <div className="grid gap-3 mb-[30px]">
                                        <PaymentRadio
                                            value="cash"
                                            icon={cod}
                                            name="payment_method"
                                            imgClass="w-[160px] lg:w-auto"
                                            checked={selectedPayment === 'cash'}
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="bkash"
                                            icon={bkash}
                                            name="payment_method"
                                            imgClass="w-[74px] lg:w-auto"
                                            checked={
                                                selectedPayment === 'bkash'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="nagad"
                                            icon={nagad}
                                            name="payment_method"
                                            imgClass="w-[78px] lg:w-auto"
                                            checked={
                                                selectedPayment === 'nagad'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex justify-center items-center text-center gap-2 px-[30px] py-4 text-white bg-gray-900 rounded-md w-full"
                                        >
                                            অর্ডার কনফার্ম করুন
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
