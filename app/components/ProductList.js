// import products from "@/app/data/products.json";
"use client"
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoOptions } from 'react-icons/io5';
import ProductCard from './ProductCard';

const ProductList = ({ products, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const activeCategories = categories.filter(
        (cat) => cat.is_featured === true
    );

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    console.log('activeCategories--------------------------------' + activeCategories);


    return (
        <div
            id="product-section"
            className="mb-20 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <div className="flex justify-center md:mb-[70px] mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 md:text-5xl product-title">
                            আমাদের পণ্য সমূহ
                        </h2>
                    </div>
                    <div className="product-filter md:flex items-center gap-[20px] mb-[30px] hidden">
                        <div className="flex items-center gap-2 text-[20px] font-normal text-gray-800">
                            <IoOptions /> ফিল্টার করুন
                        </div>
                        <ul className="flex items-center flex-wrap gap-[18px]">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`?search=${category.slug}`}
                                        type="button"
                                        className={`px-6 py-2 text-base font-normal text-gray-700 border border-gray-700 rounded-md ${
                                            searchParams === 'category.slug' ? "bg-gray-700 text-white" : ""
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center pt-10">
                        <button
                            type="button"
                            className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-4 rounded-lg md:px-[30px] md:py-[20px] hover:bg-gray-900 hover:text-white transition duration-150"
                        >
                            আরো দেখুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;