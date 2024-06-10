'use client';

import { FaRegStar, FaStar } from 'react-icons/fa6';
import Rating from 'react-rating';

const RatingReadOnly = ({ rating }) => {

    const starClass = 'text-xl text-[#FF9E2C] mx-1';

    return (
        <div>
            <Rating
                initialRating={rating}
                readonly
                fractions={2}
                emptySymbol={
                    <div className={`${starClass}`}>
                        <FaRegStar />
                    </div>
                }
                fullSymbol={
                    <div className={`${starClass}`}>
                        <FaStar />
                    </div>
                }
            />
            {/* <p>Your rating: {rating} stars</p> */}
        </div>
    );
};

export default RatingReadOnly;
