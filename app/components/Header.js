"use client"

import logo from '@/app/assets/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { getSiteSettings } from '../utils/getSiteSettings';
import HeaderCart from './HeaderCart';
import HeaderSearch from './HeaderSearch';

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [siteSetting, setSiteSetting] = useState('');


    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);

    }

        useEffect(() => {
            const fetchSiteSettings = async () => {
                let siteSettings = await getSiteSettings();
                setSiteSetting(siteSettings.data);
            };

            fetchSiteSettings();
        }, []);

        const { header_logo } = siteSetting;

  return (
      <header
          id="header"
          className="header py-[17px] bg-gray-900 fixed top-0 left-0 w-full z-[99999999]"
      >
          <div className="header-area">
              <div className="container">
                  <div className="flex items-center justify-between header-content">
                      <div className="relative lg:hidden">
                          <button
                              onClick={handleSearch}
                              className="absolute left-0 text-2xl text-white -translate-y-1/2 top-1/2 "
                          >
                              {showSearchModal ? <RxCross1 /> : <FiSearch />}
                          </button>
                      </div>
                      <div
                          className={`header-logo ${
                              showSearchModal ? 'hidden' : 'block'
                          }`}
                      >
                          <Link href="/">
                              <Image
                                  src={header_logo ? header_logo : logo}
                                  alt="logo"
                                  width={82}
                                  height={30}
                                  className="w-[82px] lg:w-auto h-auto"
                              />
                          </Link>
                      </div>
                      <HeaderSearch
                          showSearchModal={showSearchModal}
                          setShowSearchModal={setShowSearchModal}
                      />
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