import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/shared/layout/layout";
import DashboardNav from "@/components/shared/dashboardNav/nav";
import axios from "axios";
import PostsList from "@/components/tables/postsList";
import { ImSpinner10 } from "react-icons/im";
import { Pagination } from "@mantine/core";

const Dashboards = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [posts, setPost] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [reload, setReload] = useState(1);

  async function getPosts() {
    const uri = `https://adbacklist-backend2-0-vb3d.vercel.app/api/posts/posterid/${session?.user?.id}?page=${pagination?.page}&searchText=${searchText}&status=${status}&category=${category}&sort=${sort}`;

    try {
      const response = await axios.get(uri, {
        method: "GET",
      });
      setPost(response.data.data.posts);
      setPagination(response.data?.pagination);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPost([]);
      setPage(0);
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (session?.user?.email) {
      getPosts();
    } else {
      return;
    }
  }, [
    pagination?.page,
    category,
    status,
    searchText,
    session?.user?.email,
    sort,
    reload,
  ]);

  const setPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>My Posts</title>
      </Head>
      <Layout>
        <div className='bg-white  m-1 sm:m-5 py-2'>
          <div className='m-0 sm:m-10'>
            <DashboardNav />

            {loading ? (
              <ImSpinner10 className='animate-spin text-6xl text-pink-800 text-center m-auto' />
            ) : (
              <PostsList
                posts={posts}
                setCategory={setCategory}
                setSearchText={setSearchText}
                setStatus={setStatus}
                setSort={setSort}
                sort={sort}
                searchText={searchText}
                category={category}
                status={status}
                setReload={setReload}
                reload={reload}
              />
            )}
            <Pagination
              total={Math.ceil(pagination.total / pagination.limit)}
              value={pagination?.page}
              onChange={setPage}
              mt='sm'
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboards;
