"use client"

import logo from '@/app/assets/icons/logo.svg';
import successImg from "@/app/assets/icons/success.svg";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OrderSuccess = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 7000);
    }, [router]);

  return (
      <>
          <header
              id="header"
              className="header py-[17px] bg-gray-900 fixed top-0 left-0 w-full"
          >
              <div className="header-area">
                  <div className="container">
                      <div className="flex items-center justify-center header-content">
                          <Link href="/">
                              <Image
                                  src={logo}
                                  alt="logo"
                                  className="w-[82px] lg:w-auto"
                              />
                          </Link>
                      </div>
                  </div>
              </div>
          </header>
          <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-6 md:pt-20 xxl:pt-0">
                  <div className="w-[150px] sm:w-[200px] md:w-auto">
                      <Image
                          src={successImg}
                          alt="success image"
                          className="flex justify-center mx-auto text-center"
                      />
                  </div>
                  <h2 className="text-xl font-semibold text-center text-gray-700 sm:text-2xl lg:text-3xl">
                      অভিনন্দন! অর্ডারটি সম্পন্ন হয়েছে!
                  </h2>
                  <p className="text-base font-normal text-gray-700">
                      আবায়া এভিনিউ তে শপিং করার জন্য আপনাকে ধন্যবাদ!!
                  </p>
                  <Link
                      href="/"
                      className="flex justify-center items-center gap-[6px] text-base text-white font-medium px-6 py-4 bg-black rounded-md"
                  >
                      আরও শপিং করুন
                  </Link>
              </div>
          </div>
      </>
  );
}

export default OrderSuccess