import PostsList from "@/components/postsList/postsList";
import Layout from "@/components/shared/layout/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Posts = () => {
  const router = useRouter();
  return (
    <Layout>
      {" "}
      <Head>
        {/*<title>{meta?.title}</title>
        <link rel="icon" href="/logo.png" />
        <meta name="title" content={`${meta?.title}`} />
        <meta name="description" content={`${meta?.description}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={`${meta?.keywords}`} />*/}
      </Head>
      <PostsList paths={router.query} />
    </Layout>
  );
};

export default Posts;
