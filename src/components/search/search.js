import Link from "next/link";
import React, { useEffect, useState } from "react";
import usa from "../../../public/countries.json";

const Search = () => {
  const [keyword, setKeyword] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    const data = usa.filter(
      (a) =>
        a.name.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
        e.target.value.length >= 3
    );
    function removeDuplicateCities(array) {
      const uniqueCities = [];
      const cityNames = new Set();
      for (const city of array) {
        const cityName = city.name.toLowerCase();

        if (!cityNames.has(cityName)) {
          uniqueCities.push(city);
          cityNames.add(cityName);
        }
      }
      return uniqueCities;
    }
    const uniqueCities = removeDuplicateCities(data);
    setKeyword(uniqueCities);
  };

  return (
    <div>
      <div className='my-5 sm:w-[1000px] w-11/12 m-auto'>
        <p className='font-bold'>Choose a location : </p>
        <input
          placeholder='City Name (3 letters)'
          className='w-full p-2 bg-gray-50'
          name='keyword'
          onChange={(e) => onSearch(e)}
        />

        {keyword?.length !== 0 && (
          <div className='w-full mt-5 block m-auto text-decoration-none  text-pink-800 hover:underline'>
            {keyword?.map((a) => (
              <li key={a._id} className='list-none'>
                <Link href={`/categories/${a?.name}`}>{a?.name}</Link>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
