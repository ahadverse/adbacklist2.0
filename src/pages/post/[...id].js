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
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState({});
  const [rainbow, setRainbow] = useState({});

  useEffect(() => {
    setLoading(true);
    if (!router.query.id?.[1]) {
      return;
    } else {
      axios
        .get(
          `https://adbacklist-backend2-0-vb3d.vercel.app/api/posts/${router?.query?.id?.[1]}`
        )
        .then((e) => {
          setPost(e.data.data.product[0]);
          setRelatedPosts(e.data.relatedPosts);
          setAds(e.data.responsiveads);
          setRainbow(e.data.rainbow);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [router.query]);

  function formatUSPhoneNumber(number) {
    const cleaned = ("" + number).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  }

  const formattedPhoneNumber = formatUSPhoneNumber(postDetails?.phone);

  return (
    <div>
      <Head>
        <title>{postDetails?.name?.slice(0, 64)}</title>
        <meta name='title' content={postDetails?.name?.slice(0, 64)} />
        <meta name='keywords' content='' />
        <meta name='site_name' content='Bed Page' />
        <meta
          name='description'
          content={`${
            formattedPhoneNumber ? `${formattedPhoneNumber}.` : ""
          }  ${postDetails?.name?.slice(0, 155)}. `}
        />
        <link
          name='canonical'
          rel='canonical'
          href={`https://adbacklist.com${router?.asPath}`}
        />
      </Head>
      <Layout>
        <div className='bg-white  p-5 sm:w-[1200px] m-auto'>
          {" "}
          {loading ? (
            <ImSpinner10 className='animate-spin sm:text-[100px] text-6xl text-pink-800 text-center m-auto' />
          ) : (
            <Details
              paths={router.query}
              data={postDetails}
              rainbow={rainbow}
            />
          )}
        </div>
        <div>
          <Link href={ads?.link ?? "/"}>
            <img className='sm:w-[600px]  m-auto mt-10' src={ads?.image} />
          </Link>
        </div>

        <RelatedPostSlider relatedPosts={relatedPosts} />
      </Layout>
    </div>
  );
};

export default PostDetail;
