'use client';

import bkash from '@/app/assets/icons/checkout-bkash.svg';
import cod from '@/app/assets/icons/checkout-cod.svg';
import nagad from '@/app/assets/icons/checkout-nagad.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import Input from '../components/form/Input';
import PaymentRadio from '../components/form/PaymentRadio';
import { ProductContext } from '../context/cartContext';
import { getCoupon } from '../utils/getCoupon';
import { orderPost } from '../utils/orderPost';

const CheckoutPage = ({ siteSettings }) => {
    const [total, setTotal] = useState(0)
    const [couponApply, setCouponApply] = useState(true);
    const [couponCode, setCouponCode] = useState('');

    const handleCodeChange = (event) => {
        setCouponCode(event.target.value);
    };

    const { inside_dhaka, outside_dhaka } = siteSettings;

    const insideDhakaDC = inside_dhaka ? Number(inside_dhaka) : 0;
    const outsideDhakaDC = outside_dhaka ? Number(outside_dhaka) : 0;

    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('inside_dhaka');
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [shippingCost, setShippingCost] = useState(insideDhakaDC);

    const [nameWarningMessage, setNameWarningMessage] = useState(null);
    // const [emailWarningMessage, setEmailWarningMessage] = useState(null);
    const [phoneWarningMessage, setPhoneWarningMessage] = useState(null);
    const [addressWarningMessage, setAddressWarningMessage] = useState(null);

    const { state, dispatch } = useContext(ProductContext);
    const { cartItems, cartTotal } = state;

    useEffect(() => {
        setTotal(cartTotal + shippingCost);
    }, [cartTotal, shippingCost]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        if (value === 'inside_dhaka') {
            setShippingCost(insideDhakaDC);
        } else if (value === 'outside_dhaka') {
            setShippingCost(outsideDhakaDC);
        }
    };

    const handleApply = async () => {
        try {
            if(couponCode === "") {
                toast.error(`কুপন কোড দিন`, {
                    position: 'bottom-right',
                });
            }

            let couponData = await getCoupon(couponCode);
            if (couponData.success && couponCode) {
                if (!couponApply) {
                    toast.error(`আপনি কুপন ব্যবহার করে ফেলেছেন`, {
                        position: 'bottom-right',
                    });
                }
                const { type, discount } = couponData.data;

                if (type === 'Flat' && couponApply) {
                    setTotal(total - discount);
                    setCouponApply(false);
                    toast.success(`"কুপন সফল হয়েছে"`, {
                        position: 'bottom-right',
                    });
                }

                if (type === 'Percentage' && couponApply) {
                    const discountAmount = total * (discount / 100);
                    setTotal(total - discountAmount);
                    setCouponApply(false);
                    toast.success(`"কুপন সফল হয়েছে"`, {
                        position: 'bottom-right',
                    });
                }
            } else {
                if(couponCode) {
                    toast.error(`"কুপন সফল হয়নি"`, {
                        position: 'bottom-right',
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching coupon:', error);
        }
    };

    const handleCategoryLoadMoreClick = async (categoryName, page = 0) => {
        setLoading(true);
        try {
            setSelectedCategory(categoryName);
            let prevPage = page + 1;
            let productData = await getAllProduct(null, categoryName, prevPage);
            if (productData.data.length > 4) {
                if (categoryName) {
                    setProductItem(productData.data);
                    setLoading(true);
                } else {
                    setProductItem((prevProducts) => [
                        ...prevProducts,
                        ...productData.data,
                    ]);
                }
                setSelectedProducts(productData);
            } else {
                //setProductItem([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const orderedProduct = [];
    cartItems.map((product) =>
        orderedProduct.push({
            product_id: product.id,
            quantity: product.quantity,
            price:
                product.sale_price > 0
                    ? product.sale_price
                    : product.unit_price,
            size: product.size_name,
            color: product.color_name,
            total:
                product.quantity *
                (product.sale_price > 0
                    ? product.sale_price
                    : product.unit_price),
            attributes: product.attributes,
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

    // const handleChange = (event) => {
    //     setSelectedValue(event.target.value);

    //     if (event.target.value === 'inside_dhaka') {
    //         setShippingCost(80);
    //     }

    //     if (event.target.value === 'outside_dhaka') {
    //         setShippingCost(120);
    //     }
    // };

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const {
            name,
            address,
            phone,
            spacial_instruction,
        } = data;

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
            total_amount: total,
            delivery_location: selectedValue,
            spacial_instruction: spacial_instruction,
        };

        try {
            const response = await orderPost(JSON.stringify(orderData));
            if (response.ok) {
                const responseData = await response.json();

                if (responseData.success) {
                    router.push('/order-successfull');
                    toast.success(`${responseData.success}`, {
                        position: 'bottom-right',
                    });

                    dispatch({
                        type: 'CLEAR_CART',
                    });
                }
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
            className="pb-20 pt-28 lg:pt-[175px] mb:py-20 cart-page"
        >
            <div className="cart-area">
                <div className="container">
                    <form
                        onSubmit={submitHandler}
                        id="cart-form"
                        className="cart-form"
                    >
                        <div className="grid grid-cols-12 gap-[30px]">
                            <div className="col-span-12 lg:col-span-6 xxl:col-span-7">
                                <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px]">
                                    অর্ডারটি সম্পন্ন করতে আপনার নাম, মোবাইল
                                    নম্বর ও ঠিকানা নিচে লিখুন
                                    <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                </h2>
                                <div className="lg:p-[30px] lg:rounded-[20px] lg:bg-white">
                                    {/* <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] lg:gap-4 mb-[30px]">
                                        <RadioButton
                                            label="ঢাকার ভিতরে"
                                            value="inside_dhaka"
                                            name="delivery_location"
                                            checked={
                                                selectedValue === 'inside_dhaka'
                                            }
                                            onChange={handleChange}
                                            deliveryCharge="৮০"
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
                                            deliveryCharge="১২০"
                                        />
                                    </div> */}
                                    <div className="grid gap-[18px] lg:gap-6">
                                        <Input
                                            label="আপনার নাম লিখুন"
                                            type="text"
                                            name="name"
                                            placeholder="সম্পূর্ণ নামটি লিখুন"
                                            warningMessage={
                                                nameWarningMessage
                                                    ? nameWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <Input
                                            label="আপনার মোবাইল নম্বরটি লিখুন"
                                            type="number"
                                            name="phone"
                                            placeholder="১১ ডিজিটের মোবাইল নম্বরটি লিখুন"
                                            warningMessage={
                                                phoneWarningMessage
                                                    ? phoneWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <div className="delivary-area">
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                এলাকা সিলেক্ট করুন
                                            </label>
                                            <select
                                                className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white cursor-pointer"
                                                value={selectedValue}
                                                onChange={handleSelectChange}
                                            >
                                                <option
                                                    select
                                                    value="inside_dhaka"
                                                >
                                                    Inside Dhaka -{' '}
                                                    {insideDhakaDC > 0
                                                        ? `${insideDhakaDC} Taka`
                                                        : 'ফ্রি ডেলিভারি'}
                                                </option>
                                                <option value="outside_dhaka">
                                                    Outside Dhaka -{' '}
                                                    {outsideDhakaDC > 0
                                                        ? `${outsideDhakaDC} Taka`
                                                        : 'ফ্রি ডেলিভারি'}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                সম্পূর্ন ঠিকানা
                                            </label>
                                            <textarea
                                                type="text"
                                                name="address"
                                                placeholder="হাউজ নম্বর, রোড, ইউনিয়ন, উপজেলা, জেলা"
                                                warningMessage={
                                                    addressWarningMessage
                                                        ? addressWarningMessage
                                                        : null
                                                }
                                                rows="3"
                                                required
                                                className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                                            />
                                            <small
                                                className={`mt-1 text-red-500 ${
                                                    addressWarningMessage ===
                                                        '' ||
                                                    addressWarningMessage ===
                                                        null ||
                                                    addressWarningMessage
                                                        ? ''
                                                        : 'hidden'
                                                }`}
                                            >
                                                {addressWarningMessage}
                                            </small>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                নোট
                                                <span className="text-gray-600">
                                                    (অপশনাল)
                                                </span>
                                            </label>
                                            <textarea
                                                type="text"
                                                name="spacial_instruction"
                                                placeholder="আপনার স্পেশাল কোন রিকোয়ারমেন্ট থাকলে এখানে লিখুন"
                                                rows="3"
                                                className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                                            />
                                        </div>
                                        {/* <Input
                                            label="পুরো ঠিকানা"
                                            type="text"
                                            name="address"
                                            placeholder="বাসা নম্বর, রোড নম্বর, এলাকার নাম, থানা, জেলা"
                                            warningMessage={
                                                addressWarningMessage
                                                    ? addressWarningMessage
                                                    : null
                                            }
                                            required
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-6 xxl:col-span-5">
                                <div className="mb-10 cart-payment-amount">
                                    <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px]">
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
                                                                        <div className="w-[90px] h-[104px] sm:w-[95px] sm:h-[112px] md:w-[110px] md:h-[118px] lg:w-[84px] lg:h-[90px] xl:w-[110px] xl:h-[120px] rounded-[10px] overflow-hidden">
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
                                                                        <div className="flex justify-between gap-2 mb-[10px]">
                                                                            <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold ellipsis-2 h-10 sm:h-12 md:h-[54px]">
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </h2>
                                                                            <div>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleRemoveFromCart(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    type="button"
                                                                                    className="pt-[2px] text-xl text-gray-400"
                                                                                >
                                                                                    <RxCross2 />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-6 mb-2">
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
                                                                            <p className="text-sm lg:text-lg text-[#F93754] font-semibold">
                                                                                ৳
                                                                                {product.sale_price >
                                                                                0
                                                                                    ? ' ' +
                                                                                      product.sale_price
                                                                                    : ' ' +
                                                                                      product.unit_price}
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-1">
                                                                                {Object.entries(
                                                                                    product.attributes
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => (
                                                                                        <p
                                                                                            key={
                                                                                                key
                                                                                            }
                                                                                            className="text-[9px] bg-gray-900 text-white py-[2px] rounded-lg leading-[12px] px-2"
                                                                                        >
                                                                                            {
                                                                                                value
                                                                                            }
                                                                                        </p>
                                                                                    )
                                                                                )}
                                                                            </div>
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
                                                            সাবটোটাল :
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
                                                    <li className="py-3 border-b border-gray-400 lg:py-5">
                                                        <div class="flex justify-between items-center relative">
                                                            <input
                                                                type="text"
                                                                placeholder="কুপন কোড থাকলে দিন"
                                                                value={
                                                                    couponCode
                                                                }
                                                                onChange={
                                                                    handleCodeChange
                                                                }
                                                                class="border-0 w-full px-0 focus:outline-none focus:ring-0 active:outline-none text-sm font-normal text-gray-700 lg:text-lg"
                                                            />
                                                            <button
                                                                onClick={
                                                                    handleApply
                                                                }
                                                                type="button"
                                                                className="absolute right-0 text-sm font-semibold text-gray-700 lg:text-lg"
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
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
                                    <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px]">
                                        পেমেন্ট অপশন
                                        <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                    </h2>
                                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
                                        <PaymentRadio
                                            value="cash"
                                            icon={cod}
                                            name="payment_method"
                                            imgClass="w-[160px]"
                                            checked={selectedPayment === 'cash'}
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="bkash"
                                            icon={bkash}
                                            name="payment_method"
                                            imgClass="w-[74px]"
                                            checked={
                                                selectedPayment === 'bkash'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="nagad"
                                            icon={nagad}
                                            name="payment_method"
                                            imgClass="w-[78px]"
                                            checked={
                                                selectedPayment === 'nagad'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                    </div>
                                    {(selectedPayment === 'bkash' ||
                                        selectedPayment === 'nagad') && (
                                        <div>
                                            {selectedPayment === 'bkash' ? (
                                                <p className="pt-[30px] text-base text-gray-700 font-normal">
                                                    বিকাশ এ{' '}
                                                    <span className="inline-block font-semibold">
                                                        পেমেন্ট
                                                    </span>{' '}
                                                    অপশন থেকে{' '}
                                                    <span className="inline-block font-semibold">
                                                        01896088855
                                                    </span>{' '}
                                                    এই নম্বর এ অর্ডার এমাউন্টটি
                                                    পেমেন্ট করুন এবং নিচে আপনার
                                                    বিকাশ একাউন্ট নম্বর এবং
                                                    ট্রানজেকশন আইডি টি দিন।
                                                </p>
                                            ) : (
                                                <p className="pt-[30px] text-base text-gray-700 font-normal">
                                                    নগদ এ{' '}
                                                    <span className="inline-block font-semibold">
                                                        সেন্ড মানি
                                                    </span>{' '}
                                                    অপশন থেকে{' '}
                                                    <span className="inline-block font-semibold">
                                                        01952345231
                                                    </span>{' '}
                                                    এই নম্বর এ অর্ডার এমাউন্টটি
                                                    সেন্ড করুন এবং নিচে আপনার
                                                    নগদ একাউন্ট নম্বর এবং
                                                    ট্রানজেকশন আইডি টি দিন।
                                                </p>
                                            )}
                                            <div className="grid sm:grid-cols-2 gap-[18px] lg:gap-6 pt-6">
                                                <div className="">
                                                    <label
                                                        htmlFor="phoneNumber"
                                                        className="block text-gray-700 text-sm font-semibold mb-[6px]"
                                                    >
                                                        {selectedPayment ===
                                                        'bkash'
                                                            ? 'বিকাশ নম্বর দিন'
                                                            : 'নগদ নম্বর দিন'}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone_number"
                                                        placeholder="017XXXXXXXX"
                                                        className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="transactionId"
                                                        className="block text-gray-700 text-sm font-semibold mb-[6px]"
                                                    >
                                                        {selectedPayment ===
                                                        'bkash'
                                                            ? 'বিকাশ ট্রানজেকশন আইডি দিন'
                                                            : 'নগদ ট্রানজেকশন আইডি দিন'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="transaction_id"
                                                        placeholder="7XP59GS33F"
                                                        className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className=" mt-[30px]">
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

export default CheckoutPage;
