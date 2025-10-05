import React from "react";
import style from "./blog.module.css";
import Image from "next/image";

const BlogDetails = ({ blog, ads }) => {
  return (
    <div>
      <>
        <div className={style.blogContainer}>
          <div className='bg-white p-3 m-4 sm:m-10'>
            <div className={style.blogImages}>
              <img
                src={
                  blog?.image
                    ? blog?.image.startsWith("http")
                      ? blog?.image
                      : `https://dk3vy6fruyw6l.cloudfront.net/${blog?.image}`
                    : "/default.svg"
                }
                alt='blog image'
              />
            </div>

            <br />
            {blog?.category == "Adult" ? (
              <span className={style.category}> {blog?.category} </span>
            ) : (
              ""
            )}

            {blog?.category == "Dating" ||
            blog?.category == "Community" ||
            blog?.category == "Services" ? (
              <span className={style.category1}> {blog?.category} </span>
            ) : (
              ""
            )}

            {blog?.category == "For Sale" ||
            blog?.category == "Jobs" ||
            blog?.category == "Sport and Fitness" ? (
              <span className={style.category2}> {blog?.category} </span>
            ) : (
              ""
            )}

            {blog?.category == "Housing" ||
            blog?.category == "Electronics and Computer" ||
            blog?.category == "Pets" ? (
              <span className={style.category3}> {blog?.category} </span>
            ) : (
              ""
            )}
            <br />
            <h1 className='text-2xl text-black font-bold'>
              {blog?.title}
              <br className='block sm:hidden ' />
              <span className='text-sm font-normal'></span>
            </h1>
            <br />

            <div
              className={style.desc}
              dangerouslySetInnerHTML={{
                __html: blog?.desc,
              }}
            ></div>
          </div>
          <div className=' p-3 m-4 sm:m-8 h-fit'>
            {/*{ads.map((a) => (
              <div className={style.othersLinkContainer} key={a._id}>
                <a href={`${a.link}`} target="_blank" rel="noreferrer">
                  <Image
                    className={style.othersLinkImage}
                    src={`${a.image}`}
                    width={1000}
                    height={800}
                    alt="image"
                  />
                  <p className="text-blue-400">{a.title}</p>
                </a>
              </div>
            ))}*/}
          </div>
        </div>
      </>
    </div>
  );
};

export default BlogDetails;
