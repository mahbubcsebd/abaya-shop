// import products from "@/app/data/products.json";
"use client"
import { useContext, useEffect, useState } from 'react';
import { IoOptions } from 'react-icons/io5';
import ScrollContext from '../context/scrollContext';
import SearchContext from "../reducer/SearchContext";
import { getAllProduct } from "./../utils/getProduct";
import ProductCard from './ProductCard';


const ProductList = ({ products, categories }) => {
    const { productDivRef } = useContext(ScrollContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
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

    const handleAllFilter = () => {
        setSelectedCategory('all');
        setProductItem(products.data);
    }

    const handleCategoryLoadMoreClick = async (categoryName, page=0) => {
        setLoading(true);
        try {
            setSelectedCategory(categoryName)
            let prevPage = page + 1;
            let productData = await getAllProduct(null, categoryName, prevPage);
            if (productData.data.length > 4) {
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
            ref={productDivRef}
            className="mb-20 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <div className="flex justify-center md:mb-[70px] mb-6">
                        <h2 className="hidden text-2xl font-semibold text-gray-800 md:block md:text-5xl product-title">
                            আমাদের পণ্য সমূহ
                        </h2>
                    </div>
                    <div className="product-filter items-start flex lg:items-center gap-4 sm:gap-5 mb-[30px]">
                        <div className="flex items-center gap-2 mt-2 lg:mt-0 text-lg md:text-[20px] font-normal text-gray-800">
                            <IoOptions />
                        </div>
                        <ul className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-[18px]">
                            <li>
                                <button
                                    onClick={handleAllFilter}
                                    type="button"
                                    className={`px-3 py-1 md:px-6 md:py-[6px] text-xs sm:text-base font-normal text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition duration-150 ${
                                        selectedCategory == 'all'
                                            ? 'bg-gray-700 text-white'
                                            : ''
                                    }`}
                                >
                                    সবগুলো
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() =>
                                            handleCategoryLoadMoreClick(
                                                category.name
                                            )
                                        }
                                        type="button"
                                        className={`px-3 py-1 md:px-6 md:py-[6px] text-xs sm:text-base font-normal text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition duration-150 ${
                                            selectedCategory == category.name
                                                ? 'bg-gray-700 text-white'
                                                : ''
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {productItem.length > 0 ? (
                        <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
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

                    <div className="flex justify-center md:pt-[70px] mt-6">
                        {hasMore && (
                            <button
                                onClick={() =>
                                    handleCategoryLoadMoreClick(
                                        null,
                                        selectedProducts.meta.current_page
                                    )
                                }
                                disabled={loading}
                                type="button"
                                className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 hover:bg-gray-900 hover:text-white transition duration-150"
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