'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';

const ReviewSlider = () => {
    return (
        <div className="mb-20 review-section">
            <div className="review-area">
                <div className="container">
                    <div className="review-slider-wrapper">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={4}
                            freeMode={true}
                            navigation={true}
                            watchSlidesProgress={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[
                                EffectFade,
                                Navigation,
                                Pagination,
                                Autoplay,
                                Thumbs,
                            ]}
                            className="mySwiper"
                        >
                            {images.map((img) => (
                                <SwiperSlide key={img.id}>

                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSlider;
