"use client"

import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
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

    const [selectedSize, setSelectedSize] = useState(sizes[0].name);
    const [selectedColor, setSelectedColor] = useState(colors[0].name);
    const [productCount, setProductCount] = useState(1);


    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const getSelectedSizeId = (sizeName) => {
        return sizes.find((size) => size.name === sizeName)?.id;
    };
    const getSelectedColorId = (colorName) => {
        return colors.find((color) => color.name === colorName)?.id;
    };

    const handleAddToCart = (event) => {
        if(event.type === "submit"){
            event.preventDefault();
        }
        const selectedProduct = {
            ...product,
            size_id: getSelectedSizeId(selectedSize),
            color_id: getSelectedColorId(selectedColor),
            quantity: productCount,
            color_name: selectedColor,
            size_name: selectedSize,
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
            <div className="flex items-center gap-[10px] md:gap-0 mb-5">
                <div className="md:min-w-[90px]">
                    <p className="text-base font-semibold text-gray-700 ">
                        Size :
                    </p>
                </div>
                <ul className="flex items-center gap-2 lg:gap-[18px] flex-wrap">
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
                                className={`px-4 py-3 lg:px-6 lg:py-4 text-base font-medium border rounded-md size-varient block cursor-pointer ${
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
            <div className="flex items-center gap-[10px] md:gap-0 mb-5">
                <div className="md:min-w-[90px]">
                    <p className="text-base font-semibold text-gray-700 ">
                        Color :
                    </p>
                </div>
                <ul className="flex items-center gap-2 lg:gap-[18px]">
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
                            />
                            <label
                                htmlFor={color.name}
                                className={`px-4 py-3 lg:px-6 lg:py-4 text-base font-medium border rounded-md size-varient block cursor-pointer ${
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
                <button
                    type="submit"
                    className={`hidden md:flex items-center gap-2 px-[30px] py-4 text-gray-900 border border-gray-900 hover:text-white hover:bg-gray-900 transition duration-150 rounded-md ${
                        isFormValid ? '' : 'cursor-not-allowed'
                    }`}
                >
                    <BsCart3 />
                    কার্টে যোগ করুন
                </button>
                <Link
                    href="/checkout"
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-[30px] py-4 text-white bg-gray-900 rounded-md"
                >
                    অর্ডার করুন
                </Link>
            </div>
        </form>
    );
};

export default ProductOrder;
