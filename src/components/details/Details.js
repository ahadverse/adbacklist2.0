import Link from "next/link";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import style from "./details.module.css";
import ImageContainer from "../ImageContainer/ImageContainer";
import { FaEdit } from "react-icons/fa";

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .replace(/-/g, " ") // replace hyphens with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Details = ({ data, paths, rainbow, page }) => {
  const words = rainbow?.text?.split(" ");

  return (
    <div>
      {paths && (
        <ul className='flex flex-wrap gap-2 text-xs sm:text-base'>
          <li className='hover:text-blue-600'>
            <Link href={`/`}>Home</Link>
          </li>
          &#62;
          <li className='hover:text-blue-600'>
            <Link href={`/categories/${paths.city}`}>
              {toTitleCase(paths.city)}
            </Link>
          </li>
          &#62;
          <li className='hover:text-blue-600'>
            <Link href={`/categories/${paths.city}`}>
              {toTitleCase(paths?.id?.[0])}
            </Link>
          </li>
          &#62;
          <li className='hover:text-blue-600 truncate'>
            <Link href={`/categories/${paths.city}`}>
              {toTitleCase(paths?.sub)}
            </Link>
          </li>
          &#62;
          <li className='hover:text-blue-600 font-bold truncate'>
            {toTitleCase(data?.name)}
          </li>
        </ul>
      )}

      <hr className='my-5 border-pink-700' />

      <h1 className='text-2xl font-bold  text-center my-10'>{data?.name}</h1>

      <div className='border-4 rounded border-dashed border-green-600 mt-10 w-full m-auto sm:w-3/5'>
        <h1 className='text-red-600 font-bold text-center sm:text-3xl text-base '>
          SCAM Alert !!!!!
        </h1>
        <p className='font-bold text-center sm:text-base text-xs'>
          If ad poster asks for money, credit card info, cashapp, gift card or
          tell you to verify in another website, consider its a SCAM !
          <br />
          Don&apos;t pay anything before meet the Provider!
        </p>
      </div>
      <div className='bg-blue-200 mt-2 text-center py-2 mb-10  w-full m-auto sm:w-3/5 sm:text-base text-xs '>
        When you call, tell me that you saw my ad on Adbacklist
      </div>

      <ImageContainer data={data} />

      {data?.age && (
        <h1 className='text-2xl font-bold  text-center my-4'>
          {" "}
          Age : {data?.age}
        </h1>
      )}

      <div className='flex flex-col my-6 justify-center gap-3 sm:flex-row'>
        {data?.email ? (
          <a
            href={`mailto:${data?.email}`}
            className='flex items-center justify-center bg-pink-700 text-white px-2 font-bold border rounded'
          >
            {" "}
            <AiOutlineMail className='text-2xl mr-2 cursor-pointer' />{" "}
            {data?.email}
          </a>
        ) : (
          ""
        )}
        {data?.phone ? (
          <a
            href={`tel:${data?.phone}`}
            className='flex items-center justify-center bg-orange-600 text-white px-2 font-bold border rounded'
          >
            {" "}
            <BsTelephone className='text-2xl mr-2 p-1 cursor-pointer' />{" "}
            {data?.phone}
          </a>
        ) : (
          ""
        )}{" "}
      </div>
      <div
        className={style.desc}
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
      ></div>

      <div className='text-center my-14'>
        <Link href={rainbow?.link ?? "/"}>
          {words?.map((word, index) => (
            <span
              key={index}
              style={{ color: `hsl(${index * 80}, 100%, 40%)` }}
              className='text-3xl font-bold'
            >
              {word}{" "}
            </span>
          ))}
        </Link>
      </div>

      {page === "user-post" ? (
        <Link className='mt-10' href={`/dashboard/my-post/update/${data?._id}`}>
          <button className='flex items-center justify-center bg-red-600 text-white px-2 py-1 font-bold border rounded'>
            <FaEdit className='text-xl mr-2 cursor-pointer' />
            Update Post
          </button>
        </Link>
      ) : (
        <Link className='mt-10' href={`/report/${data?._id}`}>
          <button className='flex items-center justify-center bg-red-500 text-white px-2 font-bold border rounded'>
            <ImBlocked className='text-xl mr-2 cursor-pointer' />
            Report Ad
          </button>
        </Link>
      )}
    </div>
  );
};

export default Details;
