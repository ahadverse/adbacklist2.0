import Head from "next/head";
import Layout from "@/components/shared/layout/layout";
import DashboardNav from "@/components/shared/dashboardNav/nav";
import { useMyContext } from "@/components/user";
import { ImSpinner10 } from "react-icons/im";

const Dashboards = () => {
  const { users, loading } = useMyContext();
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>My Profile</title>
      </Head>
      <Layout>
        <div className='bg-white m-1 sm:m-5 py-2'>
          <div className='m-0 sm:m-10'>
            <DashboardNav />
            {loading ? (
              <ImSpinner10 className='animate-spin text-6xl text-pink-800 text-center m-auto' />
            ) : (
              <div className='flex items-center sm:flex-row flex-col gap-10 m-auto sm:w-[560px]'>
                <div>
                  <img className='w-[150px]' src={users.avater} />
                  <h1 className='text-center text-xl'>
                    Credit :{" "}
                    <span className='text-pink-700 font-bold'>
                      ${users?.credit}
                    </span>
                  </h1>
                </div>
                <div className='flex flex-col justify-center sm:justify-start items-start gap-4 sm:text-xl px-5'>
                  <h1 className=''>
                    First Name :{" "}
                    <span className='text-pink-700 font-bold capitalize'>
                      {users?.firstName}
                    </span>
                  </h1>
                  <h1 className=''>
                    Last Name :{" "}
                    <span className='text-pink-700 font-bold capitalize'>
                      {users?.lastName}
                    </span>
                  </h1>
                  <h1 className=''>
                    Email :{" "}
                    <span className='text-pink-700 font-bold'>
                      {users?.email}
                    </span>
                  </h1>
                  <h1 className=''>
                    Joined :{" "}
                    <span className='text-pink-700 font-bold capitalize'>
                      {new Date(users?.createdAt).toDateString()}
                    </span>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboards;
