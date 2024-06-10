import borderImg from "@/app/assets/icons/border.svg";
import Image from 'next/image';
import { BiEditAlt } from 'react-icons/bi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = () => {
    const rating5 = 80;
    const rating4 = 40;
    const rating3 = 30;
    const rating2 = 20;
    const rating1 = 5;
  return (
      <div
          id="ratings"
          className="pt-20 ratings"
      >
          <div className="ratings-area">
              <div className="container">
                  <div className="flex items-center justify-between mb-10">
                      <div className="relative">
                          <h3 className="pb-2 text-3xl font-semibold text-gray-800">
                              পণ্যের রেটিং এবং রিভিউ
                          </h3>
                          <Image
                              className="absolute bottom-0 left-0"
                              src={borderImg}
                              alt="border img"
                          />
                      </div>
                      <button className="flex justify-center items-center gap-[6px] text-base text-white font-medium px-6 py-4 bg-black rounded-md">
                          <span className="inline-block text-xl">
                              <BiEditAlt />
                          </span>
                          রিভিউ লিখুন
                      </button>
                  </div>
                  <div className="flex items-center gap-10">
                      <div>
                          <h2 className="text-[64px] text-gray-800 font-semibold mb-1">
                              4.5
                          </h2>
                            <ul className="flex items-center gap-2 mb-1">
                                <li>
                                    <button className="text-xl text-[#FF9E2C]">
                                        <FaStar />
                                    </button>
                                </li>
                                <li>
                                    <button className="text-xl text-[#FF9E2C]">
                                        <FaStar />
                                    </button>
                                </li>
                                <li>
                                    <button className="text-xl text-[#FF9E2C]">
                                        <FaStar />
                                    </button>
                                </li>
                                <li>
                                    <button className="text-xl text-[#FF9E2C]">
                                        <FaStar />
                                    </button>
                                </li>
                                <li>
                                    <button className="text-xl text-[#FF9E2C]">
                                        <FaStarHalfAlt />
                                    </button>
                                </li>
                            </ul>
                            <p className="text-xl font-normal text-gray-600">
                                256 মোট রেটিং
                            </p>
                      </div>
                      <div className="w-[392px]">
                          <ul className="grid gap-4">
                              <li className="flex items-center gap-3 single-rating">
                                  <p className="flex items-center gap-1 text-xl font-medium text-gray-800">
                                      <span className="pt-[1px] w-3">5</span>
                                      <span className="inline-block text-base text-[#05C168]">
                                          <FaStar />
                                      </span>
                                  </p>
                                  <div className="w-full h-[10px] bg-[#D9D9D9] rounded-full">
                                      <div
                                          className="h-[10px] bg-[#05C168] rounded-full"
                                          style={{ width: `${rating5}%` }}
                                      ></div>
                                  </div>
                                  <p className="text-lg font-medium text-gray-600">
                                      180
                                  </p>
                              </li>
                              <li className="flex items-center gap-3 single-rating">
                                  <p className="flex items-center gap-1 text-xl font-medium text-gray-800">
                                      <span className="pt-[1px] w-3">4</span>
                                      <span className="inline-block text-base text-[#FF9E2C]">
                                          <FaStar />
                                      </span>
                                  </p>
                                  <div className="w-full h-[10px] bg-[#D9D9D9] rounded-full">
                                      <div
                                          className="h-[10px] bg-[#FF9E2C] rounded-full"
                                          style={{ width: `${rating4}%` }}
                                      ></div>
                                  </div>
                                  <p className="text-lg font-medium text-gray-600">
                                      120
                                  </p>
                              </li>
                              <li className="flex items-center gap-3 single-rating">
                                  <p className="flex items-center gap-1 text-xl font-medium text-gray-800">
                                      <span className="pt-[1px] w-3">3</span>
                                      <span className="inline-block text-base text-[#FF9E2C]">
                                          <FaStar />
                                      </span>
                                  </p>
                                  <div className="w-full h-[10px] bg-[#D9D9D9] rounded-full">
                                      <div
                                          className="h-[10px] bg-[#FF9E2C] rounded-full"
                                          style={{ width: `${rating3}%` }}
                                      ></div>
                                  </div>
                                  <p className="text-lg font-medium text-gray-600">
                                      80
                                  </p>
                              </li>
                              <li className="flex items-center gap-3 single-rating">
                                  <p className="flex items-center gap-1 text-xl font-medium text-gray-800">
                                      <span className="pt-[1px] w-3">2</span>
                                      <span className="inline-block text-base text-[#FF9E2C]">
                                          <FaStar />
                                      </span>
                                  </p>
                                  <div className="w-full h-[10px] bg-[#D9D9D9] rounded-full">
                                      <div
                                          className="h-[10px] bg-[#FF9E2C] rounded-full"
                                          style={{ width: `${rating2}%` }}
                                      ></div>
                                  </div>
                                  <p className="text-lg font-medium text-gray-600">
                                      50
                                  </p>
                              </li>
                              <li className="flex items-center gap-3 single-rating">
                                  <p className="flex items-center gap-1 text-xl font-medium text-gray-800">
                                      <span className="pt-[1px] w-3">1</span>
                                      <span className="inline-block text-base text-[#DC2B2B]">
                                          <FaStar />
                                      </span>
                                  </p>
                                  <div className="w-full h-[10px] bg-[#D9D9D9] rounded-full">
                                      <div
                                          className="h-[10px] bg-[#DC2B2B] rounded-full"
                                          style={{ width: `${rating1}%` }}
                                      ></div>
                                  </div>
                                  <p className="text-lg font-medium text-gray-600">
                                      5
                                  </p>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Ratings