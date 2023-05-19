import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Sponsors.module.css';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { randomize } from '../utils/random';
import { isExpired } from '../utils/isExpired';
import { siteLogos } from '../services/siteLogos';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1201 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1200, min: 993 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 992, min: 481 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

function Sponsors() {
  const router = useRouter();
  const { locale } = router;
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/image')
      .then((response) => response.json())
      .then((data) => {
        let i = 2;
        const images =
          data?.images
            ?.filter((image) => !isExpired(image?.ts))
            ?.map((image) => ({
              src: image?.imageUrl,
              id: i + 1,
              alt: 'some alt',
              width: 80,
              height: 80,
              isExpired: isExpired(image?.ts),
            })) || [];

        const randomImages = randomize(images);
        const finalImages = [...siteLogos, ...randomImages];
        return setImages(finalImages);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h4 className={styles.sponsorHeading}>Sponsors</h4>
      <Carousel
        autoPlay={true}
        autoPlaySpeed={1950}
        responsive={responsive}
        infinite
        slidesToSlide={1}
      >
        {images.map((image) => (
          <div key={image.id} className={styles.carouselItem}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Sponsors;
