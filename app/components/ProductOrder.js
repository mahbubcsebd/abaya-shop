'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/cartContext';
import { getProductStock } from '../utils/getProductStock';
import ProductCounter from './ProductCounter';

const ProductOrder = ({ product }) => {
    const [showStockMsg, setShowStockMsg] = useState(false);
    const { id, variants, stock } = product;
    const [productStock, setProductStock] = useState(0);
    const [buttonActive, setButtonActive] = useState(false);
    const [showStock, setShowStock] = useState(false);
    const [requiredMsg, setRequiredMsg] = useState(false);
    const [incrementDisable, setIncrementDisable] = useState(false);
    const [selectedValues, setSelectedValues] = useState({});
    const [availableSizeOptions, setAvailableSizeOptions] = useState(variants);
    const [productCount, setProductCount] = useState(1);
    const [attributes, setAttributes] = useState('');

    const router = useRouter();

    const { state, dispatch } = useContext(ProductContext);

    const isInCart = state.cartItems.some((item) => item.id === product.id);


    const handleChange = async (key,variantIndex, value) => {
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [key]: value,
        }));

        setRequiredMsg(false);
        setIncrementDisable(false);

        let newAttributes = '';

        if (variantIndex === 0) {
            newAttributes = `attribute_one=${value}`;
        }

        if (variantIndex === 1) {
            if (attributes) {
                newAttributes = `${attributes}&attribute_two=${value}`;
            } else {
                newAttributes = `attribute_two=${value}`;
            }
        }

        setAttributes(newAttributes);
        setTimeout(()=>{
            setShowStock(true);
        },2000)

        let productStock = await getProductStock(id, newAttributes);
        setProductStock(productStock.stock);
    };

    useEffect(() => {
        const requiredFields = variants.map((variant) => Object.keys(variant)[0]);
        const allRequiredFieldsSelected = requiredFields.every((field) => selectedValues[field]);
        setButtonActive(allRequiredFieldsSelected);
    }, [selectedValues, variants]);


    const handleAddToCart = (event) => {
        if (event.type === 'submit') {
            event.preventDefault();
        }

        if(!buttonActive){
            setRequiredMsg(true);
            return;
        }


        const selectedProduct = {
            ...product,
            quantity: productCount,
            attributes: selectedValues,
        };

        if (!isInCart) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: selectedProduct,
            });
            toast.success(`Added ${product.name} to Cart!`, {
                position: 'bottom-right',
            });
        } else {
            toast.error(
                `The product ${product.name} has already been added to the cart`,
                {
                    position: 'bottom-right',
                }
            );
        }
    };

    const isFormValid = true;

    return (
        <form onSubmit={handleAddToCart}>
            <div>
                {variants.map((variant, variantIndex) => {
                    const key = Object.keys(variant)[0];
                    const values = variant[key];

                    return (
                        <div
                            key={variantIndex}
                            className="flex items-center gap-[10px] md:gap-0 mb-8 lg:mb-12"
                        >
                            <div className="md:min-w-[90px]">
                                <p className="text-base font-semibold text-gray-700 capitalize">
                                    {key}:
                                </p>
                            </div>
                            <ul className="flex items-center gap-2 lg:gap-[18px] flex-wrap">
                                {values.map((value, index) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            name={key}
                                            id={`${key}-${value}`}
                                            value={value}
                                            className="hidden"
                                            checked={
                                                selectedValues[key] === value
                                            }
                                            onChange={() =>
                                                handleChange(
                                                    key,
                                                    variantIndex,
                                                    value
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`${key}-${value}`}
                                            className={`px-4 py-[10px] lg:px-4 lg:py-2 text-base font-medium border rounded-md block cursor-pointer ${
                                                selectedValues[key] === value
                                                    ? 'bg-gray-600 text-white'
                                                    : 'text-gray-600 border border-gray-600 hover:text-white hover:bg-gray-700'
                                            }`}
                                        >
                                            {value}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            {/* {productStock > 0 ? (
                <p>Stock: {productStock}</p>
            ) : (
                <p>Out of Stock</p>
            )} */}

            {productStock < 1 && showStock && (
                <p className="text-red-500">
                    দুঃখিত! প্রোডাক্টের এই ভ্যারিয়েন্ট টি স্টকে নেই। অন্য
                    ভ্যারিয়েন্ট সিলেক্ট করুন।
                </p>
            )}

            {requiredMsg && (
                <p className="text-red-500">
                    প্রোডাক্টের ভ্যারিয়েন্ট সিলেক্ট করুন
                </p>
            )}

            <hr className="my-6 border-gray-400" />
            <div className="flex items-center gap-[12px] mb-[30px]">
                <ProductCounter
                    id={product.id}
                    productCount={productCount}
                    setProductCount={setProductCount}
                    stock={productStock}
                    setShowStockMsg={setShowStockMsg}
                    buttonActive={buttonActive}
                    showStock={showStock}
                    productStock={productStock}
                    incrementDisable={incrementDisable}
                    setIncrementDisable={setIncrementDisable}
                />
                <button
                    type="submit"
                    className={`flex items-center gap-2 px-[19px] md:px-[30px] py-[19px] md:py-4 text-gray-900 border border-gray-900 hover:text-white hover:bg-gray-900 transition duration-150 rounded-md ${
                        isFormValid ? '' : 'cursor-not-allowed'
                    }`}
                    disabled={stock < 1 || (productStock < 1 && showStock)}
                >
                    <BsCart3 />
                    <span className="hidden md:inline-block">
                        কার্টে যোগ করুন
                    </span>
                </button>
                <button
                    type="submit"
                    onClick={() => {
                        if (productStock >= 1 && buttonActive) {
                            router.push('/checkout');
                        }
                    }}
                    className={`flex items-center gap-2 px-[30px] py-4 text-white bg-gray-900 border border-gray-900 rounded-md hover:bg-transparent hover:text-gray-900 transition duration-150 ${
                        stock < 1 ? 'cursor-not-allowed' : ''
                    }`}
                    disabled={stock < 1 || (productStock < 1 && showStock)}
                >
                    অর্ডার করুন
                </button>
            </div>
            {showStockMsg && stock >= 1 && (
                <p className="text-red-500">
                    {' '}
                    আপনি সর্বোচ্চ {productStock} টি প্রোডাক্ট অর্ডার করতে
                    পারবেন। এর বেশি স্টকে নেই।{' '}
                </p>
            )}
        </form>
    );
};

export default ProductOrder;
