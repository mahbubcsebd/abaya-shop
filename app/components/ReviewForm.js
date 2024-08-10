"use client"

import { useState } from 'react';
import { toast } from 'react-toastify';
import { reviewPost } from '../utils/reviewPost';
import Dropbox from './Dropbox';
import Input from './form/Input';
import ProductRating from './form/ProductRating';

const ReviewForm = ({ id, setShowReview }) => {
    const [rating, setRating] = useState(0);
    const [successMessage, setSuccessMessage] = useState([]);
    const [images, setImages] = useState([]);
    const [commentMsg, setCommentMsg] = useState(null);
    const [nameMsg, setNameMsg] = useState(null);
    const [emailMsg, setEmailMsg] = useState(null);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const [formData, setFormData] = useState({
        review: '',
        name: '',
        email: '',
    });

    const handlePhotoUpload = (uploadedPhotos) => {
        // setFormData({ ...formData, images: uploadedPhotos });
        // console.log("hello");
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const { name, email, review } = data;

        if (name === '' || name === null || name === undefined) {
            setNameMsg('Name is required');
        } else {
            setNameMsg(null);
        }

        if (email === '' || email === null || email === undefined) {
            setEmailMsg('Email is required');
        } else {
            setEmailMsg(null);
        }

        if (review === '' || review === null || review === undefined) {
            setCommentMsg('Comment is required');
        } else {
            setCommentMsg(null);
        }

        const reviewData = { ...data, rating, product_id: id, images };
        // console.log(reviewData);

        try {
            const response = await reviewPost(JSON.stringify(reviewData));

            // Check for successful response
            if (response.ok) {
                const responseData = await response.json();

                if (responseData.success) {
                    setShowReview(false)
                    toast.success(`${responseData.success}`, {
                        position: 'bottom-right',
                    });
                }
            } else {
                throw new Error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="pb-20 review-form-section">
            <form
                id="review-form"
                onSubmit={submitHandler}
            >
                <div className="grid gap-6">
                    <div className="review-rating-box bg-white border border-[#D0D5DD] rounded-lg">
                        <div className="grid justify-center text-center p-[27px]">
                            <p className="mb-3 text-sm font-semibold text-gray-700">
                                আপনার রেটিং :
                            </p>
                            <ProductRating
                                handleRatingChange={handleRatingChange}
                                rating={rating}
                                value={formData.rating}
                                onChange={handleRatingChange}
                            />
                        </div>
                    </div>
                    <div className="">
                        <label
                            htmlFor="review-comment"
                            className="block text-gray-700 text-sm font-semibold mb-[6px]"
                        >
                            আপনার মন্তব্য
                        </label>
                        <textarea
                            name="review"
                            id="review-comment"
                            rows="5"
                            required
                            className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                        />
                        {commentMsg && (
                            <small className="mt-1 text-red-500">
                                {commentMsg}
                            </small>
                        )}
                    </div>

                    {/* Photo Upload */}
                    <div className="flex flex-col gap-[6px] md:gap-4 md:items-center md:flex-row">
                        <div>
                            <label
                                htmlFor="review-image"
                                className="block text-gray-700 text-sm font-semibold mb-[6px] min-w-[170px]"
                            >
                                ফটো আপলোড করুন :
                            </label>
                        </div>
                        <Dropbox setImages={(images) => setImages(images)} />
                    </div>
                    <div className="grid gap-6 mb-6">
                        <Input
                            label="আপনার নাম"
                            type="text"
                            name="name"
                            warningMessage={nameMsg ? nameMsg : null}
                            value={formData.name}
                        />
                        <Input
                            label="আপনার ইমেইল / ফোন নম্বর দিন"
                            type="email"
                            name="email"
                            warningMessage={emailMsg ? emailMsg : null}
                            value={formData.email}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex justify-center items-center gap-[6px] text-base text-white font-medium px-6 py-4 bg-black rounded-md w-full text-center sm:w-auto"
                >
                    রিভিউ সাবমিট করুন
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
