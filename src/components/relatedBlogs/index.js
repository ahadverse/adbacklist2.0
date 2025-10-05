import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";

const RelatedBlogsSlider = ({ relatedPosts }) => {
  return (
    <div className='sm:w-[1200px] m-auto mt-16'>
      <h1 className='text-2xl px-2'>Recent Blogs</h1>
      <Carousel
        height={400}
        slideSize={{ base: "100%", sm: "50%", md: "33.33333%" }}
        slideGap={{ base: 0, sm: "md" }}
        align='start'
        loop
        dragFree
      >
        {relatedPosts.map((a) => (
          <Carousel.Slide key={a._id}>
            <Link href={`/blog/${a?.permalink}`}>
              <div>
                <img
                  className='w-full h-[400px] scale-90'
                  src={
                    a?.image
                      ? a?.image.startsWith("http")
                        ? a?.image
                        : `https://dk3vy6fruyw6l.cloudfront.net/${a?.image}`
                      : "/placeholder.jpg" // optional fallback image
                  }
                />
              </div>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedBlogsSlider;
