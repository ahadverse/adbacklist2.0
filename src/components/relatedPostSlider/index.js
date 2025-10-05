import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { useRouter } from "next/router";

const RelatedPostSlider = ({ relatedPosts }) => {
  const router = useRouter();

  return (
    <div className='sm:w-[1200px] m-auto mt-16'>
      <h1 className='text-2xl px-2'>Recent Posts</h1>
      <Carousel
        height={300}
        slideSize={{ base: "60%", sm: "50%", md: "22%" }}
        slideGap={{ base: 0, sm: "md" }}
        align='start'
        loop
        dragFree
      >
        {relatedPosts.map((a) => (
          <Carousel.Slide key={a._id}>
            <Link
              href={`/post/${a?.category}/${a?._id}?city=${router?.query?.city}&sub=${a?.subCategory}`}
            >
              <div>
                <img
                  className='w-full h-[400px] scale-90'
                  src={a?.images?.[0]}
                />
              </div>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedPostSlider;
