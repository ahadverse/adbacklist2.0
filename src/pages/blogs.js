import Layout from "@/components/shared/layout/layout";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import categories from "../../public/category.json";
import axios from "axios";
import BlogsList from "@/components/blogs/BlogsList";
import { ImSpinner10 } from "react-icons/im";
import { Pagination } from "@mantine/core";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [catKey, setCatKey] = useState("");
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  async function getBlogs() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/blogs?page=${current}&q=${keyword}&cat=${catKey}`
      );
      const data = response.data;

      setBlogs(data?.data);
      setPagination(data?.pagination);
      setIsLoading(false);
    } catch (error) {
      setBlogs([]);
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getBlogs();
  }, [catKey, keyword, current]);

  const handleCategory = (e) => {
    setCatKey(e);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.text.value;
    setKeyword(searchKeyword);
  };
  const setPage = (e) => {
    setCurrent(e);
  };

  return (
    <div>
      <Layout>
        <div className='bg-white py-5 mt-5'>
          <div className='flex justify-between sm:flex-row flex-col gap-6 sm:w-[1200px] m-auto px-3 sm:px-0'>
            <h1 className='text-2xl font-bold'>
              Blogs{" "}
              <span className='text-sm font-semibold'>
                (Showing {blogs?.length ?? 0} post of {pagination?.total})
              </span>
            </h1>
            <div className='flex sm:flex-row flex-col justify-end items-end gap-2'>
              <select
                onClick={(e) => handleCategory(e.target.value)}
                className='px-3 py-1 sm:w-[200px] w-[250px] rounded-full text-pink-800 border border-pink-800'
              >
                <option value={""} selected>
                  -- Select Category --
                </option>
                {categories.map((a) => (
                  <option key={a.name} value={a?.name}>
                    {a.name}
                  </option>
                ))}
              </select>
              <div className='relative'>
                <form onSubmit={handleSearch}>
                  <input
                    className='px-3 py-1 w-[250px] text-pink-800 border border-pink-800 rounded-full'
                    placeholder='search by title'
                    name='text'
                  />
                  {isLoading ? (
                    <ImSpinner10 className='animate-spin text-2xl absolute top-1 right-2 text-pink-800' />
                  ) : (
                    <IoSearch className='text-2xl absolute top-1 right-2 text-pink-800' />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='my-10'>
          {isLoading ? (
            <ImSpinner10 className='animate-spin sm:text-[100px] text-6xl text-pink-800 text-center m-auto' />
          ) : (
            <>
              {blogs?.length < 1 ? (
                <div>
                  <p className='text-center text-pink-800 text-3xl uppercase'>
                    No Blog Found
                  </p>
                </div>
              ) : (
                <BlogsList blogs={blogs} />
              )}
            </>
          )}
          <br />
          <Pagination
            total={Math.ceil(pagination?.total / pagination.limit)}
            value={pagination.page}
            onChange={setPage}
            mt='sm'
            className='flex justify-center'
          />
        </div>
      </Layout>
    </div>
  );
};

export default Blogs;
