import PostForm from "@/components/singlepostForm/postForm";
import Layout from "@/components/shared/layout/layout";
import React from "react";

const SingleCityForm = () => {
  return (
    <Layout>
      <div className='my-10 sm:w-[1000px] m-auto p-5 bg-white'>
        <PostForm />
      </div>
    </Layout>
  );
};

export default SingleCityForm;
