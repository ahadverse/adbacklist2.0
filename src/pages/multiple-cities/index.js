import PostForm from "@/components/multiplepostForm/postForm";
import Layout from "@/components/shared/layout/layout";
import React from "react";

const MultipleCityForm = () => {
  return (
    <Layout>
      <div className="my-10 w-[1000px] m-auto p-5 bg-white">
        <PostForm />
      </div>
    </Layout>
  );
};

export default MultipleCityForm;
