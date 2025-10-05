import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OnlyTextList = ({ products }) => {
  const router = useRouter();

  if (!products || products.length === 0) return null;

  // Separate premium and free ads
  const premiumAds = products.filter((p) => p.isPremium);
  const freeAds = products.filter((p) => !p.isPremium);

  return (
    <div className='space-y-6'>
      {/* Premium Ads Section */}
      {premiumAds.length > 0 && (
        <div>
          <h1 className='bg-gradient-to-r from-red-500 to-white w-8/12 px-1 text-xl text-black font-bold py-1 mb-3'>
            Premium Ads
          </h1>
          <ul className='space-y-2'>
            {premiumAds.map((b) => (
              <li key={b._id}>
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`/post/${router?.query?.category?.[0]}/${b._id}?city=${router.query.city}&sub=${router.query.category?.[1]}`}
                  className='text-xl m-1 block visited:text-purple-600 text-blue-600 hover:underline cursor-pointer'
                >
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Free Ads Section */}
      {freeAds.length > 0 && (
        <div>
          <h1 className='bg-gradient-to-r from-yellow-500 to-white w-8/12 px-1 text-xl text-black font-bold py-1 mb-3'>
            Ads
          </h1>
          <ul className='space-y-2'>
            {freeAds.map((b) => (
              <li key={b._id}>
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`/post/${router?.query?.category?.[0]}/${b._id}?city=${router.query.city}&sub=${router.query.category?.[1]}`}
                  className='text-xl m-1 block visited:text-purple-600 text-blue-600 hover:underline cursor-pointer'
                >
                  {b.title} - <span className='text-black'>{b.age}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OnlyTextList;
