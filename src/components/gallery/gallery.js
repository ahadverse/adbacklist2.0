import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Gallery = ({ data1 }) => {
  const router = useRouter();
  return (
    <div>
      {data1?.length > 0 && (
        <div className='flex flex-wrap justify-center gap-2'>
          {data1.map((a, index) => (
            <Link
              key={index}
              target='_blank'
              rel='noopener noreferrer'
              href={`/post/${router?.query?.category?.[0]}/${a._id}?city=${router.query.city}&sub=${router.query.category?.[1]}`}
            >
              <img className='h-[300px] flex-1 object-cover' src={a.imgOne} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
