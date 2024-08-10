"use client"

import bkash from '@/app/assets/icons/bkash.svg';
import cod from '@/app/assets/icons/cod.svg';
import facebook from '@/app/assets/icons/facebook.svg';
import logo from '@/app/assets/icons/footer-logo.svg';
import instagram from '@/app/assets/icons/instagram.svg';
import nagad from '@/app/assets/icons/nagad.svg';
import youtube from '@/app/assets/icons/youtube.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import { getSiteSettings } from '../utils/getSiteSettings';

const Footer = () => {
    const [siteSetting, setSiteSetting] = useState('')

    useEffect(()=>{
        const fetchSiteSettings = async () => {
            let siteSettings = await getSiteSettings();
            setSiteSetting(siteSettings.data);
        };

        fetchSiteSettings();
    },[])

    const {
        footer_logo,
        phone,
        email,
        footer_address,
        facebook_url,
        instagram_url,
        youtube_url,
    } = siteSetting;

    return (
        <footer
            id="footer"
            className="bg-gray-900 footer"
        >
            <div className="footer-area">
                <div className="container">
                    <div className="py-10 lg:py-[100px]">
                        <div className="flex justify-center mb-6 lg:mb-16">
                            <Link href="/">
                                <Image
                                    src={footer_logo ? footer_logo : logo}
                                    alt="footer logo"
                                    height={115}
                                    width={115}
                                    className="w-[115px] md:w-auto h-auto"
                                />
                            </Link>
                        </div>
                        <div>
                            <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center mb-3 lg:hidden">
                                যোগাযোগ :{' '}
                                <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
                            </p>
                            <div className="grid items-center justify-between gap-3 lg:grid-cols-3 lg:flex-row lg:gap-4">
                                <div>
                                    <ul className='grid gap-3'>
                                        <li>
                                            <Link
                                                href="/terms-and-conditions"
                                                className="text-base font-normal text-gray-300 lg:text-lg"
                                            >
                                                টার্মস এন্ড কন্ডিশনস
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/privacy-policy"
                                                className="text-base font-normal text-gray-300 lg:text-lg"
                                            >
                                                প্রাইভেসি পলিসি
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                        <p>
                                            <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                                <FiPhoneCall />
                                            </span>
                                        </p>
                                        {phone ? phone : '01896-088855'}
                                    </div>
                                    <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                        <p>
                                            <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                                <CiMail />
                                            </span>
                                        </p>
                                        {email ? email : 'info@abaya.com'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                    {' '}
                                    <p>
                                        <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                            <CiLocationOn />
                                        </span>{' '}
                                    </p>
                                    {footer_address
                                        ? footer_address
                                        : 'Block #K, Road #18, House #195, Floor #2nd (lift), South Banasree, Rampura, Dhaka'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-600" />
                <div className="container">
                    <div className="lg:flex justify-between items-center py-[30px] hidden">
                        <p className="text-lg font-normal text-gray-400">
                            © All rights reserved Abaya Avenue.
                        </p>
                        <div className="flex items-center gap-4">
                            <p className="text-[20px] font-normal text-gray-400 relative">
                                পেমেন্ট মাধ্যম :
                            </p>
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Image
                                        src={nagad}
                                        alt="nagad"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={bkash}
                                        alt="bkash"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={cod}
                                        alt="cash on delivery"
                                    />
                                </li>
                            </ul>
                        </div>
                        <ul className="flex items-center gap-[18px]">
                            <li>
                                <Link
                                    href={`${
                                        facebook_url
                                            ? facebook_url
                                            : 'https://facebook.com'
                                    }`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Image
                                        src={facebook}
                                        alt="facebook"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`${
                                        instagram_url
                                            ? instagram_url
                                            : 'https://instagram.com'
                                    }`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Image
                                        src={instagram}
                                        alt="instagram"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`${
                                        youtube_url
                                            ? youtube_url
                                            : 'https://youtube.com'
                                    }`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Image
                                        src={youtube}
                                        alt="youtube"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="lg:hidden">
                    <div className="border-b border-gray-600 py-[18px]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                            <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center lg:hidden">
                                পেমেন্ট মাধ্যম :
                                <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
                            </p>
                            <ul className="flex items-center gap-2 w-[300px] overflow-hidden">
                                <li>
                                    <Image
                                        src={nagad}
                                        alt="nagad"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={bkash}
                                        alt="bkash"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={cod}
                                        alt="cash on delivery"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="container">
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-base font-medium text-[#F4F4F4] lg:hidden">
                                    সোশ্যাল মিডিয়া :
                                </p>
                                <ul className="flex items-center gap-[18px]">
                                    <li>
                                        <Link href="https://facebook.com">
                                            <Image
                                                src={facebook}
                                                alt="facebook"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://instagram.com">
                                            <Image
                                                src={instagram}
                                                alt="instagram"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://youtube.com">
                                            <Image
                                                src={youtube}
                                                alt="youtube"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center bg-gray-700">
                        <p className="py-5 text-lg font-normal text-white lg:hidden">
                            © All rights reserved Abaya Avenue.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
