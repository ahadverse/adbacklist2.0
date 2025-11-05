import Details from "@/components/details/Details";
import RelatedPostSlider from "@/components/relatedPostSlider";
import Layout from "@/components/shared/layout/layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";

const PostDetail = () => {
  const router = useRouter();
  const [postDetails, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!router.query.id) {
      return;
    } else {
      axios
        .get(
          `https://adbacklist-backend2-0-vb3d.vercel.app/api/posts/${router?.query?.id}`
        )
        .then((e) => {
          setPost(e.data.data.product[0]);

          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>{postDetails?.name?.slice(0, 64)}</title>
      </Head>
      <Layout>
        <div className='bg-white  p-5 sm:w-[1200px] m-auto'>
          {loading ? (
            <ImSpinner10 className='animate-spin sm:text-[100px] text-6xl text-pink-800 text-center m-auto' />
          ) : (
            <Details data={postDetails} page='user-post' />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default PostDetail;
