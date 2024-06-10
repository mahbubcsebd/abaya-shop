"use client"

import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/cartContext';
import ProductCounter from './ProductCounter';

const ProductOrder = ({ product }) => {
    const { attributes } = product;

    const { state, dispatch } = useContext(ProductContext);

    const isInCart = state.cartItems.some((item) => item.id === product.id);

    const colors = attributes.find(
        (attr) => attr.attribute_group.name === 'Color'
    ).attributes;

    const sizes = attributes.find(
        (attr) => attr.attribute_group.name === 'Size'
    ).attributes;

    const [selectedSize, setSelectedSize] = useState(sizes.name);
    const [selectedColor, setSelectedColor] = useState(colors.name);
    const [productCount, setProductCount] = useState(1);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleAddToCart = (event) => {
        event.preventDefault();

        const selectedProduct = {
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity: productCount, // Use 'quantity' for consistency
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

    const isFormValid = selectedSize && selectedColor;

    return (
        <form onSubmit={handleAddToCart}>
            <div className="flex items-center mb-5">
                <div className="min-w-[90px]">
                    <p className="text-base font-semibold text-gray-700 ">
                        Size :
                    </p>
                </div>
                <ul className="flex items-center gap-[18px]">
                    {sizes.map((size) => (
                        <li key={size.id}>
                            <input
                                type="radio"
                                name="size"
                                id={size.name}
                                value={size.name}
                                className="hidden"
                                checked={selectedSize === size.name}
                                onChange={handleSizeChange}
                                required
                            />
                            <label
                                htmlFor={size.name}
                                className={`px-6 py-4 text-base font-medium border rounded-md size-varient block cursor-pointer ${
                                    selectedSize === size.name
                                        ? 'bg-gray-600 text-white'
                                        : 'text-gray-600 border-gray-600 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {size.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center">
                <div className="min-w-[90px]">
                    <p className="text-base font-semibold text-gray-700 ">
                        Color :
                    </p>
                </div>
                <ul className="flex items-center gap-[18px]">
                    {colors.map((color, index) => (
                        <li key={color.id}>
                            <input
                                type="radio"
                                name="color"
                                id={color.name}
                                value={color.name}
                                className="hidden"
                                checked={selectedColor === color.name}
                                onChange={handleColorChange}
                                defaultChecked={index == 1}
                            />
                            <label
                                htmlFor={color.name}
                                className={`px-6 py-4 text-base font-medium border rounded-md color-varient block cursor-pointer ${
                                    selectedColor === color.name
                                        ? 'bg-gray-600 text-white'
                                        : 'text-gray-600 border-gray-600 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {color.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="my-6 border-gray-400" />
            <div className="flex items-center gap-[18px] mb-[30px]">
                <ProductCounter
                    id={product.id}
                    productCount={productCount}
                    setProductCount={setProductCount}
                />
                <Link
                    href="/cart"
                    className="flex items-center gap-2 px-[30px] py-4 text-white bg-gray-900 rounded-md"
                >
                    অর্ডার করুন
                </Link>
                <button
                    type="submit"
                    className={`flex items-center gap-2 px-[30px] py-4 text-gray-900 border border-gray-900 hover:text-white hover:bg-gray-900 transition duration-150 rounded-md ${isFormValid ? '' : 'cursor-not-allowed'}`}
                >
                    কার্ট করুন
                </button>
            </div>
        </form>
    );
};

export default ProductOrder;
