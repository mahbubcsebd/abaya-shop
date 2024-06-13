import logo from '@/app/assets/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import HeaderCart from './HeaderCart';
import HeaderSearch from './HeaderSearch';

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
                      <HeaderSearch />
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