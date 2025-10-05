import React from "react";
import styles from "./cities.module.css";
import usa from "../../../public/usa.json";
import usa2 from "../../../public/usa2.json";
import Link from "next/link";

const Cities = () => {
  return (
    <div className={styles.container}>
      <div className='hidden sm:block'>
        {usa.map((a) => (
          <div id='United%20States' key={a._id}>
            <div>
              {a?.children?.map((b) => (
                <div key={b._id}>
                  <br />
                  <h1 className='font-bold m-auto text-pink-700   sm:w-8/12 px-3'>
                    {b.name}
                  </h1>

                  {b?.children?.map((c) => (
                    <ul key={c._id} className='m-auto sm:w-8/12 px-3'>
                      <li className='item underline mb-2 sm:mb-3'>
                        <Link
                          href={`/categories/${c?.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className='text-decoration-none  mx-2  py-2 visited:text-purple-600 text-gray-700'
                        >
                          {c?.name}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='block sm:hidden'>
        {usa2.map((a) => (
          <div id='United%20States' key={a._id}>
            <div>
              {a?.children?.map((b) => (
                <div key={b._id}>
                  <br />
                  <h1 className='font-bold m-auto text-pink-700   sm:w-8/12 px-3'>
                    {b.name}
                  </h1>

                  {b?.children?.map((c) => (
                    <ul key={c._id} className='m-auto sm:w-8/12 px-3'>
                      <li className='item underline mb-2 sm:mb-3'>
                        <Link
                          href={`/categories/${c?.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className='text-decoration-none  mx-2  py-2 visited:text-purple-600 text-gray-700'
                        >
                          {c?.name}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
