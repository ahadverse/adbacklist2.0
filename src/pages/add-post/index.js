import Layout from "@/components/shared/layout/layout";
import Link from "next/link";
import React from "react";

const AddPost = () => {
  return (
    <Layout>
      {" "}
      <div className={"sm:w-[800px] bg-white my-5  mx-auto p-10"}>
        <h1 className="capitalize">Select post type</h1>
        <hr className="my-5 border border-pink-700" />
        <Link
          href={"/add-post/single-city"}
          className="visited:text-purple-500 text-2xl underline text-gray-800 font-bold"
        >
          Post in single city
        </Link>
        <br />
        <br />

        <Link
          href={"/add-post/multiple-cities"}
          className="visited:text-purple-500 underline text-2xl text-gray-800 font-bold"
        >
          Post in multiple cities
        </Link>
      </div>
    </Layout>
  );
};

export default AddPost;
