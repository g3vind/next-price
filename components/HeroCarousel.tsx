"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Image from "next/image"

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  // { imgUrl: "/assets/images/hero-4.svg", alt: "airfryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={1000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            alt={image.alt}
            height={120}
            width={120}
            className="object-contain"
          />
        ))}
      </Carousel>
      <Image
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
        src="/assets/icons/hand-drawn-arrow.svg"
        height={155}
        width={155}
        alt="arrow"
      />
    </div>
  )
}

export default HeroCarousel
