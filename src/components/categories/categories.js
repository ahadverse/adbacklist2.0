import categories from "../../../public/category.json";
import cities from "../../../public/countries.json";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";
import { IoIosBriefcase } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import {
  FaHome,
  FaTools,
  FaLaptop,
  FaShoppingCart,
  FaCar,
  FaUtensils,
  FaHeart,
  FaCamera,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Link from "next/link";

const CategoryPage = ({ path }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const city = cities.find(
    (a) => a?.name?.toLowerCase() === path.city?.replace(/-/g, " ")
  );

  const id = city?.parentId?.$oid ? city?.parentId?.$oid : city?.parentId;
  const nearCities = cities.filter((a) => a?.parentId == id);
  const specificObjectsToRemove = [path.city];
  const filteredNearCities = nearCities.filter((city) => {
    return !specificObjectsToRemove.includes(city.slug);
  });

  const toggleExpand = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Pair categories like [1,5], [2,6], ...
  const pairCategories = (arr) => {
    const half = Math.ceil(arr.length / 2);
    const result = [];
    for (let i = 0; i < half; i++) {
      const pair = [arr[i]];
      if (arr[i + half]) pair.push(arr[i + half]);
      result.push(pair);
    }
    return result;
  };

  const groupedCategories = pairCategories(categories);

  // 8 colors and 8 icons
  const categoryColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-orange-400",
  ];
  const categoryIcons = [
    <FaCar />,
    <FaHeart />,
    <GiLovers />,
    <FaHome />,
    <FaUsers />,
    <FaShoppingCart />,
    <IoIosBriefcase />,
    <RiCustomerService2Line />,
  ];

  return (
    <div className='py-0 xl:w-[1280px]  lg:px-5 xl:px-0 lg:w-11/12 w-11/12 m-auto'>
      <div className='bg-gray-200 text-black flex flex-wrap items-center'>
        <p className='text-red-600 font-bold'>Nearest Cities: </p>
        {filteredNearCities?.map((a) => (
          <p className=' ml-2 underline' key={a.name}>
            <Link
              href={`/categories/${a?.name
                ?.toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {a?.name}
            </Link>
          </p>
        ))}
      </div>
      <div className='grid md:grid-cols-2 py-3 grid-cols-1 lg:grid-cols-4 gap-6'>
        {groupedCategories.map((group, idx) => (
          <div key={idx} className='grid grid-cols-1  h-fit gap-5'>
            {group.map((category) => {
              const isExpanded = expandedCategories[category.id] || false;
              const subcategories = isExpanded
                ? category.subcategories
                : category.subcategories.slice(0, 8);

              // Cycle through 8 colors and icons
              const color = categoryColors[category.id % 8];
              const Icon = categoryIcons[category.id % 8];

              return (
                <div
                  key={category.id}
                  className='h-fit bg-white overflow-hidden rounded-lg shadow'
                >
                  {/* Category Name */}
                  <div
                    className={`${color} flex justify-between px-2 py-2 text-lg font-bold  items-center text-white`}
                  >
                    <span className='flex   items-center  gap-2'>
                      {Icon} {category.name}
                    </span>
                    <Link
                      className='hover:bg-red-600 rounded-full p-1'
                      href={`/posts/${category.slug}?city=${path?.city}`}
                    >
                      <IoIosArrowForward />
                    </Link>
                  </div>

                  {/* Subcategories */}
                  <ul className='space-y-2 relative p-2'>
                    {subcategories.map((sub) => (
                      <Link
                        href={`/posts/${category.slug}/${sub.slug}?city=${path?.city}`}
                        key={sub.id}
                        className={`text-black block hover:text-blue-600 cursor-pointer`}
                      >
                        {sub.name}
                      </Link>
                    ))}

                    {/* See More / See Less */}
                    {category.subcategories.length > 8 && (
                      <div
                        onClick={() => toggleExpand(category.id)}
                        className={`${
                          isExpanded
                            ? ""
                            : "absolute xl:mt-3 xl:py-2.5 lg:mt-1 lg:py-1.5 md:mt-1 md:py-1.5  mt-1 py-1.5"
                        } bottom-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,#ffffff_100%)] text-center`}
                      >
                        <button
                          className={`${color} text-white rounded-full px-5 py-1 flex items-center justify-center gap-2 m-auto`}
                        >
                          {isExpanded ? "See Less" : "See More"}
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
