import BlogDetails from "@/components/blogDetails/BlogDetails";
import RelatedBlogsSlider from "@/components/relatedBlogs";
import Layout from "@/components/shared/layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";

const DetailsBlog = () => {
  const router = useRouter();
  const id = router.query.permalink;
  const [blog, setBlogs] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  async function getUser() {
    try {
      const response = await axios.get(
        `https://adbacklist-backend2-0-vb3d.vercel.app/api/blogs/single?q=${id}`
      );

      const data = response.data.data.blog;
      setRelatedBlogs(response.data.relatedBlogs);
      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        getUser();
      }
    }, 500);
  }, [id]);

  return (
    <Layout>
      <div className='sm:w-[1200px] m-auto'>
        {" "}
        {isloading ? (
          <ImSpinner10 className='animate-spin sm:text-[100px] text-6xl text-pink-800 text-center m-auto' />
        ) : (
          <div>
            <BlogDetails blog={blog} />
            <RelatedBlogsSlider relatedPosts={relatedBlogs} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailsBlog;
