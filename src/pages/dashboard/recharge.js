import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/shared/layout/layout";
import DashboardNav from "@/components/shared/dashboardNav/nav";
import axios from "axios";
import TransactionList from "@/components/tables/transactionList";
import { ImSpinner10 } from "react-icons/im";

const Dashboards = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [history, setRechargeHistory] = useState([]);

  async function transactions() {
    if (session?.user?.id) {
      try {
        const response = await axios.get(
          `https://adbacklist-backend2-0-vb3d.vercel.app/api/transaction/${session?.user?.id}`,
          {
            method: "GET",
          }
        );
        const trans = response.data?.data?.transactions;
        setRechargeHistory(trans);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setRechargeHistory([]);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    if (session?.user?.email) {
      transactions();
    } else {
      return;
    }
  }, [session?.user?.email]);

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>My Recharge</title>
      </Head>
      <Layout>
        <div className='bg-white  m-1 sm:m-5 py-2'>
          <div className='m-0 sm:m-10'>
            <DashboardNav />
            {loading ? (
              <ImSpinner10 className='animate-spin text-6xl text-pink-800 text-center m-auto' />
            ) : (
              <TransactionList startIndex={1} transactions={history} />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboards;
