import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const DashboardNav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div>
      <div className='bg-black text-white my-5 p-2 flex gap-2 justify-between flex-col sm:flex-row rounded  shadow-lg shadow-blue-500/50'>
        <span className='flex gap-5 justify-between'>
          <Link
            href={"/dashboard/profile"}
            className={` ${
              router?.asPath == "/dashboard/profile"
                ? "text-pink-700 hover:text-blue-400 hover:underline font-bold  mt-1"
                : "hover:text-blue-400 hover:underline  mt-1"
            }`}
          >
            My Profile
          </Link>
          <Link
            href={"/dashboard/posts"}
            className={` ${
              router?.asPath == "/dashboard/posts"
                ? "text-pink-700 hover:text-blue-400 hover:underline  font-bold  mt-1"
                : "hover:text-blue-400 hover:underline  mt-1"
            }`}
          >
            My Posts
          </Link>
          <Link
            href={"/dashboard/recharge"}
            className={` ${
              router?.asPath == "/dashboard/recharge"
                ? "text-pink-700 hover:text-blue-400 hover:underline  font-bold  mt-1"
                : "hover:text-blue-400 hover:underline mt-1"
            }`}
          >
            My Recharges
          </Link>
        </span>
        <div className='flex gap-x-5'>
          <Link
            className='text-sm sm:text-xl text-center sm:text-start p-1 px-4 bg-green-600 font-bold text-white'
            href={"/add-post"}
          >
            Post Now
          </Link>
          <Link
            className='text-sm sm:text-xl text-center sm:text-start px-4 p-1 bg-red-600 font-bold text-white'
            href={`/recharge-credits`}
          >
            Buy Credit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
