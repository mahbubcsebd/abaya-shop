"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
<<<<<<< HEAD
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
=======
import {useContext, useState} from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import SearchContext from "../reducer/SearchContext";
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7

const HeaderSearch = () => {
const [search, setSearch] = useState('');
const searchParams = useSearchParams();
const pathname = usePathname();
const { replace } = useRouter();

<<<<<<< HEAD
const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log('Updated search term:', event.target.value);
};

    const submitHandler = (e) => {
        e.preventDefault();

        replace(`${pathname}?search=${search}`);
    }
=======
    const contextValue = useContext(SearchContext);
    console.log('Context Value in Header:', contextValue); // Add this line

    const { setSearchQuery } = contextValue;

    const handleInputChange = (event) => {
        setSearch(event.target.value);
        console.log('Updated search term:', event.target.value);
    };
    const handleSearch = (event) => {
        event.preventDefault(); // Prevent default form submission
        setSearchQuery(search);
    };
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7

    return (
        <form className="header-search relative w-[500px] h-14 hidden lg:block">
            <input
                type="text"
                name="header-search"
                id="header-search"
                value={search}
<<<<<<< HEAD
                onChange={handleSearch}
=======
                onChange={handleInputChange}
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
                className="w-full h-full block pl-[18px] pr-[120px] py-3 bg-white rounded-lg border-0 text-gray-600  placeholder:text-gray-500 placeholder:text-base outline-none"
                placeholder="পণ্যের নাম লিখুন"
            />
            <button
                type="submit"
<<<<<<< HEAD
                onClick={submitHandler}
=======
                onClick={handleSearch}
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
                //   onClick={() => updateSearchParams()}
                className="absolute top-1 right-1 px-5 py-[10px] bg-gray-900 text-gray-200 rounded-lg text-lg font-normal flex items-center gap-[10px]"
            >
                <IoSearchOutline />
                Search
            </button>
        </form>
    );
};

export default HeaderSearch