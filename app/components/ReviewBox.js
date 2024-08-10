"use client"

import { useState } from 'react';
import ClientFeedback from './ClientFeedback';
import Ratings from './Ratings';
import Review from './Review';

const ReviewBox = ({ id, reviews, ratings }) => {
    const [showReview, setShowReview] = useState(false);

    const handleShowReview = () => {
        setShowReview(true);
    };
    return (
        <div>
            <Ratings
                reviewHandler={handleShowReview}
                ratings={ratings}
            />
            <Review
                showReview={showReview}
                setShowReview={setShowReview}
                id={id}
            />
            <ClientFeedback reviews={reviews} />
        </div>
    );
};

export default ReviewBox