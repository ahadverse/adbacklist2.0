import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import Link from "next/link";
import React from "react";

const Support = () => {
  return (
    <div className='bg-gray-200 h-screen'>
      <Header></Header>
      <div className='bg-black mx-auto text-white w-4/5 mt-10 p-2 rounded  shadow-lg shadow-blue-500/50 flex justify-between'>
        <span className='m-auto'>
          <Link
            href={`/recharge-credits`}
            className='hover:text-blue-400 font-bold hover:underline'
          >
            Buy Credits
          </Link>
          <Link
            href={"/dashboard/profile"}
            className='ml-5 sm:ml-16 hover:text-blue-400 font-bold hover:underline'
          >
            My Account
          </Link>
          <li className='ml-5 sm:ml-16 text-gray-300  hover:text-blue-400  font-bold hover:underline list-none inline'>
            Support
          </li>
          <Link
            href={"/verify"}
            className='ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline'
          >
            Verify
          </Link>
        </span>
      </div>
      <p className='mx-auto w-4/5 h-[250px] flex justify-center items-center font-bold text-3xl mt-10'>
        Mail us :{" "}
        <a href='mailto:adbacklist@gmail.com' className='text-red-400 ml-2'>
          {" "}
          adbacklist@gmail.com
        </a>
      </p>
      <Footer></Footer>
    </div>
  );
};

export default Support;
