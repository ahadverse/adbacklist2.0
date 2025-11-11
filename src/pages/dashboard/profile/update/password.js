import Layout from "@/components/shared/layout/layout";
import { useMyContext } from "@/components/user";
import { PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const { users, loading } = useMyContext();
  const router = useRouter();
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [passData, setPassData] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setUpdateProfileLoading(true);
    if (passData.newPass !== passData.confirm) {
      setUpdateProfileLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.put(
        `https://adbacklist-backend2-0-vb3d.vercel.app/api/users/password/${users?._id}`,
        {
          password: passData.newPass,
          oldPassword: passData.current,
        }
      );
      setUpdateProfileLoading(false);
      if (res.data.status === "success") {
        toast.success("Password updated successfully!");
        router.push("/dashboard/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setUpdateProfileLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className=''>
      <Head>
        <title>My Profile</title>
      </Head>
      <Layout>
        <div className='m-1 sm:m-2 py-2'>
          <div className='m-0  sm:m-10'>
            {loading ? (
              <ImSpinner10 className='animate-spin text-6xl text-pink-800 text-center m-auto' />
            ) : (
              <form
                onSubmit={handlePasswordSubmit}
                className='max-w-xl m-auto bg-white p-6 rounded'
              >
                <h2 className='text-2xl font-semibold mb-5 text-center text-pink-700'>
                  Change Password
                </h2>

                <PasswordInput
                  type='password'
                  className=' p-2 w-full rounded mb-3'
                  placeholder='Current Password'
                  value={passData.current}
                  onChange={(e) =>
                    setPassData({ ...passData, current: e.target.value })
                  }
                />
                <PasswordInput
                  type='password'
                  className=' p-2 w-full rounded mb-3'
                  placeholder='New Password'
                  value={passData.newPass}
                  onChange={(e) =>
                    setPassData({ ...passData, newPass: e.target.value })
                  }
                />
                <PasswordInput
                  type='password'
                  className=' p-2 w-full rounded mb-3'
                  placeholder='Confirm New Password'
                  value={passData.confirm}
                  onChange={(e) =>
                    setPassData({ ...passData, confirm: e.target.value })
                  }
                />

                <button
                  type='submit'
                  className='mt-5 w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-800'
                >
                  {updateProfileLoading ? (
                    <ImSpinner10 className='animate-spin text-2xl text-white text-center m-auto' />
                  ) : (
                    "Change Password"
                  )}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    router.push("/dashboard/profile");
                  }}
                  className='mt-5 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800'
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UpdatePassword;
