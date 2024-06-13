import Image from 'next/image';
import { getHeroImage } from '../utils/getHeroImage';

const Hero = async () => {
    const heroImg = await getHeroImage()
  return (
      <div
          id="hero"
          className="hero pt-6 pb-[30px] lg:pt-10 lg:pb-20"
      >
          <div className="hero-area">
              <div className="container">
                  <div className="w-full h-[160px] md:h-[520px] overflow-hidden rounded-[20px]">
                      <Image
                          src={heroImg.data.image_url}
                          alt={heroImg.data.title}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                      />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Hero