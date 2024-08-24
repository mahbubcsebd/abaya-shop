// import products from "@/app/data/products.json";
"use client"
import { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { IoOptions } from 'react-icons/io5';
import ScrollContext from '../context/scrollContext';
import SearchContext from "../reducer/SearchContext";
import { getAllProduct } from "./../utils/getProduct";
import ProductCard from './ProductCard';
import SkeletonCard from './skeleton/SkeletonCard';


const ProductList = ({ categories }) => {
    const { productDivRef } = useContext(ScrollContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showProduct, setShowProduct] = useState(12);
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [isSeeMoreClick, setIsSeeMoreClick] = useState(false);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);



      const memoizedProductsArray = useMemo(() => {
          return productItem;
      }, [productItem]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                if (!searchQuery && selectedCategory === 'all') {
                    const productsData = await getAllProduct(
                        null,
                        null,
                        page,
                        showProduct
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    setProductItem([...productItem, ...newProducts]);
                } else if (searchQuery && searchQuery !== '') {
                    setPage(1);
                    const productsData = await getAllProduct(
                        searchQuery,
                        null,
                        page,
                        200
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    setProductItem([...newProducts]);
                } else if (selectedCategory !== 'all') {

                    const productsData = await getAllProduct(
                        null,
                        selectedCategory,
                        page,
                        showProduct
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    // setProductItem([...newProducts]);
                    setProductItem([...productItem, ...newProducts]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchQuery, selectedCategory]);

    const handleCategory = async (categoryName) => {
        setIsSeeMoreClick(false);
        setSearchQuery('');
        setSelectedCategory(categoryName);
        setPage(1);
        setProductItem([]);
    };

    const handleAllFilter = async (categoryName) => {
        setSearchQuery('');
        setPage(1);
        setProductItem([]);
        setSelectedCategory('all');
    };

    const handleSeeMore = () => {
        setPage(page + 1);
        setIsSeeMoreClick(true)
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
                                            handleCategory(category.name)
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
                    <Suspense fallback={<h2>Loading...</h2>}>
                        {loading && !isSeeMoreClick ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        ) : memoizedProductsArray.length > 0 ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                {memoizedProductsArray.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center pt-10 text-gray-600">
                                {searchQuery && (
                                    <h2 className="text-2xl font-normal">
                                        দুঃখিত{' '}
                                        <span className="font-semibold">{`"${searchQuery}"`}</span>{' '}
                                        প্রোডাক্ট টি পাওয়া যায় নি।
                                    </h2>
                                )}
                            </div>
                        )}
                    </Suspense>

                    <div className="flex justify-center md:pt-[70px] mt-6">
                        {memoizedProductsArray.length >= 12 &&
                            memoizedProductsArray.length < totalProduct &&
                            memoizedProductsArray.length !== totalProduct && (
                                <button
                                    onClick={() => handleSeeMore(4)}
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