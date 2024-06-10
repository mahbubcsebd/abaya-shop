import facebook from '@/app/assets/icons/facebook.svg';
import footerLogo from '@/app/assets/icons/footer-logo.svg';
import instagram from '@/app/assets/icons/instagram.svg';
import youtube from '@/app/assets/icons/youtube.svg';
import bkash from '@/app/assets/images/bkash.png';
import cod from '@/app/assets/images/cod.png';
import nagad from '@/app/assets/images/nagad.png';
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
  return (
      <footer
          id="footer"
          className="footer bg-gray-900"
      >
          <div className="footer-area">
              <div className="container">
                  <div className="py-10 lg:py-[100px]">
                      <div className="flex justify-center mb-6 lg:mb-16">
                          <Link href="/">
                              <Image
                                  src={footerLogo}
                                  alt="footer logo"
                                  className="w-[115px] md:w-auto"
                              />
                          </Link>
                      </div>
                      <div>
                          <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center mb-3 lg:hidden">
                              যোগাযোগ :{' '}
                              <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
                          </p>
                          <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4">
                              <div className="flex items-center gap-2 text-gray-300 text-base lg:text-lg font-normal">
                                  <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                      <FiPhoneCall />
                                  </span>
                                  01896-088855
                              </div>
                              <div className="flex items-center gap-2 text-gray-300 text-base lg:text-lg font-normal">
                                  <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                      <CiMail />
                                  </span>
                                  abayaavenues@gmail.com
                              </div>
                              <div className="flex items-center gap-2 text-gray-300 text-base lg:text-lg font-normal">
                                  {' '}
                                  <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                      <CiLocationOn />
                                  </span>{' '}
                                  South Banasree, Dhaka, Bangladesh
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
              <div className="lg:hidden">
                  <div className="border-b border-gray-600 py-[18px]">
                      <div className="flex flex-col lg:flex-row items-center gap-4">
                          <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center lg:hidden">
                              পেমেন্ট মাধ্যম :
                              <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
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
                  </div>
                  <div className="py-5">
                      <div className="container">
                          <div className="flex justify-center items-center gap-2">
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
                  <div className="bg-gray-700 flex justify-center">
                      <p className="text-lg font-normal text-white lg:hidden py-5">
                          © All rights reserved Abaya Avenue.
                      </p>
                  </div>
              </div>
          </div>
      </footer>
  );
}

export default Footer