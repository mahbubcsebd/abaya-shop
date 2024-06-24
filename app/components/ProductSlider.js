'use client';

import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productSlider.css';

// import required modules
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {product_images} = product;
    return (
        <div className="product-slider">
            <div className="w-full h-[335px] lg:h-[570px] lg:rounded-[30px] overflow-hidden mb-4">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full h-full"
                >
                    {product_images.map((orginalImg, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={orginalImg.original_url}
                                alt="hero slider"
                                width={100}
                                height={100}
                                className="w-full h-full"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="slider-thumb">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {product_images.map((thumbImg, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={thumbImg.preview_url}
                                alt="hero slider"
                                width={150}
                                height={150}
                                className="w-full h-full"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSlider