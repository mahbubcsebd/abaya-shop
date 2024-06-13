import circle from '@/app/assets/icons/circle-tick.svg';
import Image from 'next/image';
import RatingReadOnly from './RatingReadOnly';

const ClientFeedback = ({ reviews }) => {

    return (
        <div className='container'>
            <div className="grid gap-[30px]">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="single-review border-b border-gray-400 pb-[30px]"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-6">
                                <RatingReadOnly rating={review.rating} />
                                <p className="text-lg text-gray-600 font-medium flex items-center gap-[6px] capitalize">
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
            {/* <div className="flex justify-end pt-6">
                <Pagination />
            </div> */}
        </div>
    );
};

export default ClientFeedback