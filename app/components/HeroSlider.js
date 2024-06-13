'use client'

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const HeroSlider = ({images}) => {
    return (
        <div
            id="hero"
            className="hero pt-6 pb-[30px] lg:pt-10 lg:pb-20"
        >
            <div className="hero-area">
                <div className="container">
                    <div className="w-full h-[160px] md:h-[520px] overflow-hidden rounded-[20px]">
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            effect={'fade'}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[
                                EffectFade,
                                Navigation,
                                Pagination,
                                Autoplay,
                            ]}
                            className="mySwiper"
                        >
                            {images.map((img) => (
                                <SwiperSlide key={img.id}>
                                    <Image
                                        src={img.image_url}
                                        alt={img.title}
                                        width={100}
                                        height={100}
                                        className="object-cover w-full h-full"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;