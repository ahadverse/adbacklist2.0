import Link from "next/link";
import React from "react";
import style from "./blogs.module.css";
import { FaArrowRight } from "react-icons/fa";

const BlogsList = ({ blogs }) => {
  return (
    <div>
      <div>
        <Link href={`/blog/${blogs?.[0]?.permalink}`}>
          <div className='bg-white sm:w-[1200px] w-11/12 sm:h-[400px] m-auto sm:p-5 p-2 flex  flex-col-reverse sm:flex-row sm:justify-between'>
            <div className='sm:w-6/12'>
              <p className='sm:text-4xl text-2xl  font-bold'>
                {blogs?.[0]?.title}
              </p>
              <br />
              <span className='text-xl text-pink-800 border-pink-800 border-2 px-6 py-[3px] font-bold'>
                {" "}
                {blogs?.[0]?.category}{" "}
              </span>
              <br />
              <br />

              <p>{blogs?.[0]?.metaDesc}</p>
              <br />
              <br className='hidden sm:block' />
              <button className='text-xl text-pink-600 flex items-center gap-2'>
                Read More <FaArrowRight className='arrow' />
              </button>
            </div>
            <div className='sm:w-5/12'>
              <img
                className='h-full w-full'
                src={
                  blogs?.[0]?.image
                    ? blogs[0].image.startsWith("http")
                      ? blogs[0].image
                      : `https://dk3vy6fruyw6l.cloudfront.net/${blogs[0].image}`
                    : "/placeholder.jpg" // optional fallback image
                }
                alt={blogs?.[0]?.title || "Blog image"}
              />
            </div>
          </div>
        </Link>
      </div>
      <br />
      <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 sm:w-[1200px] m-auto px-4 sm:px-0'>
        {blogs?.slice(1, 7).map((a) => (
          <Link href={`/blog/${a.permalink}`} key={a._id}>
            <div className={style.card}>
              <img
                className={style.blogImage}
                src={
                  a?.image
                    ? a?.image.startsWith("http")
                      ? a?.image
                      : `https://dk3vy6fruyw6l.cloudfront.net/${a?.image}`
                    : "/placeholder.jpg" // optional fallback image
                }
                alt={blogs?.[0]?.title || "Blog image"}
              />

              <div className='p-2'>
                <div className='flex  items-center text-pink-800 font-semibold '>
                  {a?.category == "Adult" ? (
                    <span className=''> {a?.category} </span>
                  ) : (
                    ""
                  )}

                  {a?.category == "Dating" ||
                  a?.category == "Jobs" ||
                  a?.category == "Services" ? (
                    <span className={style.category1}> {a?.category} </span>
                  ) : (
                    ""
                  )}

                  {a?.category == "For Sell" ||
                  a?.category == "Community" ||
                  a?.category == "Sport and Fitness" ? (
                    <span className={style.category2}> {a?.category} </span>
                  ) : (
                    ""
                  )}

                  {a?.category == "Real Estate" ||
                  a?.category == "Housing" ||
                  a?.category == "Pets" ||
                  a?.category == "Electronics and Computer" ? (
                    <span className={style.category3}> {a?.category} </span>
                  ) : (
                    ""
                  )}
                </div>
                <h1 className='sm:text-xl font-bold text-black'>{a?.title}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
