import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const List = ({ products }) => {
  const router = useRouter();

  if (!products || products.length === 0) return null;

  // Separate premium and free ads
  const premiumAds = products.filter((p) => p.isPremium);
  const freeAds = products.filter((p) => !p.isPremium);

  console.log(products);
  console.log(router?.query?.category?.[0]);

  return (
    <div className='space-y-6'>
      {/* Premium Ads Section */}
      {premiumAds.length > 0 && (
        <div>
          <h1 className='bg-gradient-to-r from-red-500 to-white w-8/12 px-1 text-xl text-black font-bold py-1 mb-3'>
            Premium Ads
          </h1>
          {premiumAds.map((b) => (
            <Link
              key={b._id}
              target='_blank'
              rel='noopener noreferrer'
              href={`/post/${router?.query?.category?.[0]}/${b._id}?city=${router.query.city}&sub=${router.query.category?.[1]}`}
              className='border flex gap-3  visited:text-purple-600 text-blue-600'
            >
              <img
                className='w-[100px] h-[100px] object-cover'
                src={
                  b.imgOne ??
                  (["adult", "dating"].includes(router?.query?.category?.[0])
                    ? "/not-found.jpg"
                    : "/not-found2.png")
                }
                alt={b.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = ["adult", "dating"].includes(
                    router?.query?.category?.[0]
                  )
                    ? "/not-found.jpg"
                    : "/not-found2.png";
                }}
              />

              <div className='flex flex-col justify-center'>
                <li className='list-none text-xl m-1 hover:underline cursor-pointer'>
                  {b.title}
                </li>
                <li className='list-none text-xl m-1 text-black cursor-pointer'>
                  {b.age}
                </li>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Free Ads Section */}
      {freeAds.length > 0 && (
        <div>
          <h1 className='bg-gradient-to-r from-yellow-500 to-white w-8/12 px-1 text-xl text-black font-bold py-1 mb-3'>
            Ads
          </h1>
          {freeAds.map((b) => (
            <Link
              key={b._id}
              target='_blank'
              rel='noopener noreferrer'
              href={`/post/${router?.query?.category?.[0]}/${b._id}?city=${router.query.city}&sub=${router.query.category?.[1]}`}
              className='border flex gap-3 mb-2 visited:text-purple-600 text-blue-600'
            >
              <img
                className='w-[100px] h-[100px] object-cover'
                src={
                  b.imgOne ??
                  (["adult", "dating"].includes(router?.query?.category?.[0])
                    ? "/not-found.jpg"
                    : "/not-found2.png")
                }
                alt={b.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = ["adult", "dating"].includes(
                    router?.query?.category?.[0]
                  )
                    ? "/not-found.jpg"
                    : "/not-found2.png";
                }}
              />
              <div className='flex flex-col justify-center'>
                <li className='list-none text-xl m-1 hover:underline cursor-pointer'>
                  {b.title}
                </li>
                <li className='list-none text-xl m-1 text-black cursor-pointer'>
                  {b.age}
                </li>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
