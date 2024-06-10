import logo from '@/app/assets/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import HeaderCart from './HeaderCart';

const Header = () => {

  return (
      <header
          id="header"
          className="header py-[17px] bg-gray-300"
      >
          <div className="header-area">
              <div className="container">
                  <div className="flex items-center justify-between header-content">
                      <div className="lg:hidden">
                          <button className="text-2xl">
                              <FiSearch />
                          </button>
                      </div>
                      <div className="header-logo">
                          <Link href="/">
                              <Image
                                  src={logo}
                                  alt="logo"
                                  className="w-[82px] lg:w-auto"
                              />
                          </Link>
                      </div>
                      <div className="header-search relative w-[500px] h-14 hidden lg:block">
                          <input
                              type="text"
                              name="header-search"
                              id="header-search"
                              className="w-full h-full block pl-[18px] pr-[120px] py-3 bg-white rounded-lg border-0 text-gray-600  placeholder:text-gray-500 placeholder:text-base outline-none"
                              placeholder="পণ্যের নাম লিখুন"
                          />
                          <button
                              type="button"
                              className="absolute top-1 right-1 px-5 py-[10px] bg-gray-900 text-gray-200 rounded-lg text-lg font-normal flex items-center gap-[10px]"
                          >
                              <IoSearchOutline />
                              Search
                          </button>
                      </div>
                      <div>
                          <HeaderCart />
                      </div>
                  </div>
              </div>
          </div>
      </header>
  );
}

export default Header