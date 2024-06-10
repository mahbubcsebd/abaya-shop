import circle from "@/app/assets/icons/circle-tick.svg";
import Image from "next/image";
import Pagination from "./Pagination";
import RatingReadOnly from "./RatingReadOnly";
import ReviewForm from "./ReviewForm";

const Review = ({ reviews }) => {
    return (
        <div
            id="product-review"
            className="pt-20 product-review"
        >
            <div className="product-review-area">
                <div className="container">
                    <div className="flex items-center justify-between mb-16">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            পণ্যের রিভিউ
                        </h3>
                        <div className="flex items-center gap-2">
                            <p className="text-base font-normal text-gray-800">
                                ক্রমানুসারে :
                            </p>
                            <div className="">
                                <select className="py-[7px] px-[10px] text-base text-gray-500 border-0 rounded-md focus:outline-none focus:ring-0 mr-4">
                                    <option value="new">নতুন</option>
                                    <option value="popular">জনপ্রিয়</option>
                                    <option value="rating">রেটিং</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[670px]">
                        <ReviewForm />
                    </div>
                    <div className="grid gap-[30px]">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="single-review border-b border-gray-400 pb-[30px]"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-6">
                                        <RatingReadOnly
                                            rating={review.rating}
                                        />
                                        <p className="text-lg text-gray-600 font-medium flex items-center gap-[6px]">
                                            <span>
                                                <Image
                                                    src={circle}
                                                    alt="circle"
                                                />
                                            </span>{' '}
                                            {review.name}
                                        </p>
                                    </div>
                                    <p className="flex items-center gap-2 text-lg font-medium text-gray-500">
                                        <span className="inline-block w-[6px] h-[6px] rounded-full bg-gray-500"></span>{' '}
                                        ১ দিন আগে
                                    </p>
                                </div>
                                <div className="max-w-[800px]">
                                    <p className="text-lg font-medium text-gray-700">
                                        {review.review}
                                    </p>
                                    <div className="grid grid-cols-5 gap-5 pt-6">
                                        {review.images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="w-full h-[145px]"
                                            >
                                                <Image
                                                    src={img}
                                                    alt="review img"
                                                    width={100}
                                                    height={100}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end pt-6">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review