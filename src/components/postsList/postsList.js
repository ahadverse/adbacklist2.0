import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Gallery from "../gallery/gallery";
import OnlyTextList from "../onlyTextList/OnlyTextList";
import List from "../list/list";
import Link from "next/link";
import { Pagination } from "@mantine/core";

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .replace(/-/g, " ") // replace hyphens with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PostsList = ({ paths }) => {
  const [layout, setLayout] = useState("list");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [current, setCurrent] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [age, setAge] = useState("");
  const [reload, setReload] = useState(false);

  async function getPosts() {
    try {
      const category =
        paths?.category?.length < 2
          ? paths.category?.[0]
          : paths?.category?.[1];
      const endpoint = paths?.category?.length < 2 ? "all-category" : "all";
      const url = `https://adbacklist-backend2-0-vb3d.vercel.app/api/posts/${endpoint}?page=${current}&category=${category}&state=${paths.city}&cat=${paths?.category?.[0]}`;
      const response = await axios.get(url);

      setPage(response.data.pages);
      setTotal(response.data.total);
      setProducts(response.data.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (!paths.city) {
      return;
    } else {
      getPosts();
    }
  }, [paths.city, current, reload]);

  const onChange = (e) => {
    window.scrollTo({
      top: 0,
    });
    setCurrent(e);
  };

  let content;
  if (layout == "list") {
    content = <List products={products} />;
  }
  if (layout == "text") {
    content = <OnlyTextList products={products} />;
  }
  if (layout == "gallery") {
    content = <Gallery data1={products} />;
  }

  const setAdult = (e) => {
    Cookies.set("age", e);
    setReload(!reload);
  };

  useEffect(() => {
    const useOld = Cookies.get("age");
    setAge(useOld);
  }, [reload]);
  return (
    <div className=''>
      <div className='sm:w-9/12 m-auto gap-5 flex sm:justify-start justify-center   my-3'>
        <button
          className={`border-pink-700 px-3  border-2 ${
            layout == "list" ? "bg-pink-700 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("list")}
        >
          Ads List
        </button>
        <button
          className={`border-pink-700 px-3  border-2 ${
            layout == "text" ? "bg-pink-700 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("text")}
        >
          Only Text
        </button>
        <button
          className={`border-pink-700 px-3  border-2 ${
            layout == "gallery" ? "bg-pink-700 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("gallery")}
        >
          Gallery
        </button>
      </div>
      <div>
        {loading ? (
          <div
            style={{ height: "300px" }}
            className='flex justify-center items-center'
          >
            <img className='' width={100} src='/loader.gif' />
          </div>
        ) : (
          <div className='sm:w-9/12 m-auto my-5 bg-white p-3 rounded text-black'>
            {paths?.category?.[0] == "Adult" && age == undefined ? (
              <div className=''>
                <h1 className='text-3xl font-bold'>Disclaimer</h1>
                <p className='text-xl'>
                  This section contains sexual containt.including pictorial
                  nudity adult language. It is to be accessed only by persons
                  who are 21 years of age or older (and is not considered to be
                  a minor in his/her state of residence) and who live in a
                  community or local jurisdiction where nude pictures and
                  explicit adult materials are not prohibited by law. By
                  accessing this website, you are representing to us that you
                  meet the above qualifications.
                </p>
                <div>
                  <button
                    className='bg-green-600 text-white px-3 py-2 mt-5'
                    onClick={() => setAdult("Adult")}
                  >
                    I am over 18
                  </button>
                  <Link href={"/"}>
                    <button className='bg-red-600 ml-5 text-white px-3 py-2 mt-5'>
                      Exit
                    </button>
                  </Link>
                </div>
              </div>
            ) : error ? (
              <div className='text-red-600 font-bold text-center'>{error}</div>
            ) : (
              <>
                <ul className='flex gap-2'>
                  <li className='hover:text-blue-600'>
                    <Link href={`/`}>Home</Link>
                  </li>
                  &#62;
                  <li className='hover:text-blue-600'>
                    <Link href={`/categories/${paths.city}`}>
                      {toTitleCase(paths.city)}
                    </Link>
                  </li>
                  &#62;
                  <li className='hover:text-blue-600'>
                    <Link href={`/categories/${paths.city}`}>
                      {toTitleCase(paths?.category?.[0])}
                    </Link>
                  </li>
                  &#62;
                  <li className='hover:text-blue-600 font-bold'>
                    {toTitleCase(paths?.category?.[1])} ({total} results)
                  </li>
                </ul>

                {content}
                {total > 35 && (
                  <div className='mt-10 flex justify-center'>
                    <Pagination
                      total={Math.ceil(total / 35)}
                      onChange={onChange}
                      value={current}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
