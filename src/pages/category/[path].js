import Layout from "@/components/shared/layout/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import categories from "../../../public/category.json";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import categoryMeta from "@/components/meta/category-meta-handler";

const categoryColors = [
  "bg-blue-400", // adult
  "bg-green-400", // dating
  "bg-yellow-400", // housing
  "bg-purple-400", // community
  "bg-pink-400", // for sale
  "bg-indigo-400", // job
  "bg-orange-400", // service
  "bg-red-400", // vehicles
];

const Category = () => {
  const router = useRouter();
  const category = categories.find((a) => a.slug === router.query.path);

  const colorIndex = categories.findIndex((a) => a.slug === router.query.path);
  const color =
    categoryColors[colorIndex >= 0 ? colorIndex % categoryColors.length : 0];

  const { path, city } = router.query;
  const meta = categoryMeta(city, path)[path] || {};

  const formattedCity =
    router.query.city &&
    router.query.city
      .toString()
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name='title' content={formattedCity || ""} />
        <meta name='keywords' content={meta.keywords} />
        <meta name='site_name' content='Adbacklist' />
        <meta name='description' content={meta.description} />
        <link
          rel='canonical'
          href={`https://adbacklist.com${router?.asPath}`}
        />
      </Head>

      <Layout>
        <div className='py-6 bg-white xl:w-[1280px] lg:px-5 rounded lg:w-11/12 w-11/12 m-auto'>
          {category ? (
            <>
              {/* Main Page Heading */}
              <h1
                className={`${color} text-white text-3xl font-bold px-4 py-2 rounded-md mb-6`}
              >
                {category.name} {formattedCity ? `in ${formattedCity}` : ""}
              </h1>

              {/* Subcategories Section Heading */}
              <h2 className='text-xl font-semibold mb-3'>
                Explore {category.name} Subcategories
              </h2>

              {/* Subcategories Grid */}
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {category.subcategories?.map((a) => (
                  <Link
                    key={a.id}
                    href={`/posts/${category?.slug}/${a?.slug}?city=${router?.query?.city}`}
                    className='relative group flex h-[60px] justify-between border px-3 py-2 text-base font-semibold items-center bg-white rounded-md overflow-hidden transition duration-300'
                  >
                    {/* Hover background color */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${color} transition-opacity duration-300`}
                    ></div>

                    {/* Foreground content */}
                    <h3 className='relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300'>
                      {a.name}
                    </h3>
                    <IoIosArrowForward className='relative z-10 text-gray-500 group-hover:text-white transition-colors duration-300' />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <h4 className='text-center text-gray-600 py-10'>
              Category not found.
            </h4>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Category;
