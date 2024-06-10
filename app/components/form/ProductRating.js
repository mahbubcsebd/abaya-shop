'use client';

import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import Rating from 'react-rating';

const ProductRating = () => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const starClass = 'text-4xl text-[#FF9E2C] mx-3';

    return (
        <div>
            <Rating
                initialRating={rating}
                onChange={handleRatingChange}
                fractions={1}
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

export default ProductRating;
