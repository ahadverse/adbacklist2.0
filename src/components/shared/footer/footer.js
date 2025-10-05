import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <br />
      <ul className='flex gap-3 sm:w-[1000px] flex-wrap px-10 sm:px-0 justify-center items-center m-auto'>
        <Link
          href={"/dashboard/profile"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          My Account{" "}
        </Link>
        <div className='h-[20px] border border-gray-600'></div>{" "}
        <Link
          href={"/blogs"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          Blogs
        </Link>
        <div className='h-[20px] border border-gray-600'></div>{" "}
        <Link
          href={"/recharge-credits"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          Buy Credits
        </Link>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <Link
          href={"/contact-us"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          Contact
        </Link>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <Link
          href={"/privacy-policy"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          Privacy
        </Link>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <Link
          href={"/terms"}
          className='underline cursor-pointer hover:text-blue-600 hover:font-bold font-bold'
        >
          Terms
        </Link>
      </ul>
      <br />
      <ul className='flex gap-3 sm:w-[1000px] flex-wrap px-3 sm:px-0 justify-center items-center m-auto'>
        <li className='underline cursor-pointer text-blue-600 hover:font-bold capitalize font-bold'>
          craigslist alternative
        </li>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <li className='underline cursor-pointer text-blue-600 hover:font-bold font-bold  capitalize'>
          mega personal classified
        </li>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <li className='underline cursor-pointer text-blue-600 hover:font-bold font-bold capitalize'>
          free posting ads
        </li>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <li className='underline cursor-pointer text-blue-600 hover:font-bold font-bold capitalize'>
          backpage alternatives 2025
        </li>
        <div className='h-[20px] border border-gray-600 '></div>{" "}
        <li className='underline cursor-pointer text-blue-600 hover:font-bold font-bold capitalize'>
          local sales network
        </li>
      </ul>
      <br />
      <br />
      <div className='flex justify-between items-center w-[200px] m-auto'>
        <FaFacebook className='text-2xl text-blue-600' />
        <div className='h-[20px] border border-gray-600'></div>
        <FaInstagramSquare className='text-2xl text-purple-500' />
        <div className='h-[20px] border border-gray-600'></div>
        <BsTwitterX className='text-2xl' />
        <div className='h-[20px] border border-gray-600'></div>
        <FaPinterest className='text-2xl text-red-600' />
      </div>
      <br />
      <div className='bg-gray-200 py-5'>
        <p className='text-center'>
          {" "}
          Copyright © {new Date().getFullYear()}{" "}
          <b className='uppercase'>adbacklist.com</b>
        </p>
      </div>
    </div>
  );
};

export default Footer;
