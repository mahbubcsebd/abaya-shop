// import products from "@/app/data/products.json";
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import { IoOptions } from 'react-icons/io5';
import ProductCard from './ProductCard';
import { getAllProduct } from "./../utils/getProduct";
import SearchContext from "../reducer/SearchContext";


const ProductList = ({ products, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(products);
    const [productItem, setProductItem] = useState(products.data);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const activeCategories = categories.filter(
        (cat) => cat.is_featured === true
    );
    const { searchQuery } = useContext(SearchContext);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let productData = await getAllProduct(searchQuery);
                setProductItem(productData.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const handleCategoryLoadMoreClick = async (categoryName,page=0) => {
        setLoading(true);
        try {
            setSelectedCategory(categoryName)
            let prevPage = page + 1;
            let productData = await getAllProduct(categoryName,prevPage);
            if (productData.data.length > 0) {
                if (categoryName){
                        setProductItem(productData.data)
                        setLoading(true);
                }else{
                    setProductItem((prevProducts) => [...prevProducts, ...productData.data])
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
                                    <button
                                        onClick={() => handleCategoryLoadMoreClick(category.name)}
                                        type="button"
                                        className={`px-6 py-2 text-base font-normal text-gray-700 border border-gray-700 rounded-md ${selectedCategory == category.name ? "bg-gray-700 text-white" : ""}`}
                                        // className={`px-6 py-2 text-base font-normal text-gray-700 border border-gray-700 rounded-md ${
                                        //     searchParams === 'category.slug' ? "bg-gray-700 text-white" : ""
                                        // }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {productItem.length > 0 ? (
                    <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]" >
                        {productItem.map((product) => {
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                    ) : (
                          <div>No products found</div>
                        )}

                    <div className="flex justify-center pt-10">
                        {hasMore && (
                        <button
                            onClick={() => handleCategoryLoadMoreClick(null,selectedProducts.meta.current_page)}
                            disabled={loading}
                            type="button"
                            className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-4 rounded-lg md:px-[30px] md:py-[20px] hover:bg-gray-900 hover:text-white transition duration-150"
                        >
                            {loading ? 'Loading...' : 'আরো দেখুন'}
                        </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductList;