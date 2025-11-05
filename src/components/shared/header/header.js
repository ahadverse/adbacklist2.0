import { useRouter } from "next/router";
import React from "react";
import cities from "../../../../public/countries.json";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import { useMyContext } from "@/components/user";

const Header = () => {
  const router = useRouter();
  const city = cities.find(
    (a) => a.name?.toLowerCase() === router?.query?.city?.replace(/-/g, " ")
  );
  const id = city?.parentId?.$oid ? city?.parentId?.$oid : city?.parentId;
  const parent = cities?.find((a) => a?._id?.$oid == id);

  const { users } = useMyContext();

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  let ui;
  if (router.asPath === "/dashboard/profile") {
    ui = (
      <>
        <li className='list-none text-pink-700 font-bold px-2'>
          Credits : {users?.credit?.toFixed(2)}
        </li>
        <li
          onClick={() => logout()}
          className='list-none bg-pink-700 text-white font-bold px-2 cursor-pointer'
        >
          Log Out
        </li>
      </>
    );
  } else if (router.asPath === "/recharge-credits") {
    ui = (
      <>
        <li className='list-none text-pink-700 font-bold px-2'>
          Credits : {users?.credit?.toFixed(2)}
        </li>
        <li
          onClick={() => logout()}
          className='list-none bg-pink-700 text-white font-bold px-2 cursor-pointer'
        >
          Log Out
        </li>
      </>
    );
  } else if (router.asPath.includes("/dashboard")) {
    ui = (
      <>
        <li className='list-none text-pink-700 font-bold px-2'>
          Credits : {users?.credit?.toFixed(2)}
        </li>
        <li
          onClick={() => logout()}
          className='list-none bg-pink-700 text-white font-bold px-2 cursor-pointer'
        >
          Log Out
        </li>
      </>
    );
  } else if (router.asPath == "/") {
    ui = (
      <>
        <Link
          href={"https://skipchat.cam"}
          target='_blank'
          className='list-none text-sm sm:text-base'
        >
          Meet & Fuck
        </Link>{" "}
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link href={"/add-post"} className='list-none text-sm sm:text-base'>
          Post Ad
        </Link>
      </>
    );
  } else if (router.asPath == "/blogs") {
    ui = (
      <>
        <Link
          href={"https://skipchat.cam"}
          target='_blank'
          className='list-none text-sm sm:text-base'
        >
          Meet & Fuck
        </Link>{" "}
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link href={"/add-post"} className='list-none text-sm sm:text-base'>
          Post Ad
        </Link>
      </>
    );
  } else if (router.asPath.includes("/blog")) {
    ui = (
      <>
        <Link
          href={"https://skipchat.cam"}
          target='_blank'
          className='list-none text-sm sm:text-base'
        >
          Meet & Fuck
        </Link>{" "}
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link href={"/add-post"} className='list-none text-sm sm:text-base'>
          Post Ad
        </Link>
      </>
    );
  } else if (router.asPath.includes("/login")) {
    ui = (
      <>
        <Link
          href={"https://skipchat.cam"}
          target='_blank'
          className='list-none text-sm sm:text-base'
        >
          Meet & Fuck
        </Link>{" "}
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link href={"/add-post"} className='list-none text-sm sm:text-base'>
          Post Ad
        </Link>
      </>
    );
  } else if (router.asPath.includes("/add-post")) {
    ui = (
      <>
        <Link
          href={"/"}
          className='list-none text-red-600 sm:text-base text-xs'
        >
          Cancel Posting
        </Link>
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link
          href={"/dashboard/profile"}
          className='list-none sm:text-base text-xs'
        >
          My Account
        </Link>
      </>
    );
  } else if (router.asPath.includes("/single-city")) {
    ui = (
      <>
        <li className='list-none text-pink-700 font-bold px-2'>
          Credits : {users?.credit?.toFixed(2)}
        </li>
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link
          href={"/dashboard/profile"}
          className='list-none sm:text-base text-xs'
        >
          My Account
        </Link>
      </>
    );
  } else if (router.asPath.includes("/multiple-cities")) {
    ui = (
      <>
        <li className='list-none text-pink-700 font-bold px-2'>
          Credits : {users?.credit?.toFixed(2)}
        </li>
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <Link
          href={"/dashboard/profile"}
          className='list-none sm:text-base text-xs'
        >
          My Account
        </Link>
      </>
    );
  } else if (router.pathname !== "/") {
    ui = (
      <>
        <FaLocationDot className='text-pink-700' />
        <li className='list-none'>{city?.name}</li>{" "}
        <div className='h-[20px] border border-gray-600 mx-3'></div>{" "}
        <li className='list-none'>{parent?.name}</li>{" "}
      </>
    );
  }

  return (
    <div className='shadow-sm shadow-pink-800'>
      <div className='xl:w-[1280px] lg:w-[1000px] px-3 m-auto flex justify-between items-center h-[80px]'>
        <Link
          href={"/"}
          className='sm:text-5xl text-gray-800 text-2xl font-bold font-serif'
        >
          <img src='/logo.png' className='sm:w-[280px] w-[160px]' />
        </Link>{" "}
        <div className='flex justify-between items-center font-bold'>{ui}</div>
      </div>
    </div>
  );
};

export default Header;
