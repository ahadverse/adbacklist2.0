import Head from "next/head";
import Layout from "@/components/shared/layout/layout";
import DashboardNav from "@/components/shared/dashboardNav/nav";
import { ImSpinner10 } from "react-icons/im";
import { useEffect, useState } from "react";
import { useMyContext } from "@/components/user";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

const Dashboards = () => {
  const { users, loading } = useMyContext();
  const router = useRouter();
  const [profileData, setProfileData] = useState({});
  const [avaterPreview, setAvatarPreview] = useState(null);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

  useEffect(() => {
    if (users) {
      setProfileData({
        firstName: users.firstName || "",
        lastName: users.lastName || "",
        avater: users.avater || "",
      });
      setAvatarPreview(users?.avater);
    }
  }, [users]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdateProfileLoading(true);
    let avaterUrl = profileData.avater;

    if (!avaterPreview.startsWith("https")) {
      const avaterForm = new FormData();
      avaterForm.append("images", profileData?.avater);

      const uploadRes = await fetch("http://localhost:5000/api/files2/files", {
        method: "POST",
        body: avaterForm,
      });

      const uploadResult = await uploadRes.json();
      avaterUrl = uploadResult?.[0] || "";
    }
    const res = await axios.put(
      `http://localhost:5000/api/users/${users?._id}`,
      {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        avater: avaterUrl,
      }
    );
    setUpdateProfileLoading(false);
    if (res.data.status === "success") {
      toast.success("Profile updated successfully!");
      router.push("/dashboard/profile?rld=true");
    } else {
      toast.error(res.data.message);
    }
  };

  const handleAvatarDrop = (files) => {
    const file = files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        // 100 KB
        toast.error("Avatar must be less than 100KB");
        return;
      }
      setProfileData({ ...profileData, avater: file });
      setAvatarPreview(URL.createObjectURL(file));
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
              <>
                {/* Update Profile Form */}
                <form
                  onSubmit={handleProfileSubmit}
                  className='max-w-xl m-auto bg-white p-6 rounded'
                >
                  <h2 className='text-2xl font-semibold mb-5 text-center text-pink-700'>
                    Update Profile
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input
                      type='text'
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      className='border p-2 rounded'
                      placeholder='First Name'
                    />
                    <input
                      type='text'
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      className='border p-2 rounded'
                      placeholder='Last Name'
                    />
                  </div>
                  <div className='w-full'>
                    <input
                      type='text'
                      value={users.email}
                      disabled
                      className='border p-2 rounded w-full mt-5'
                      placeholder='Last Name'
                    />
                  </div>

                  <div className='mt-6'>
                    {/* Avatar Preview with Remove Button */}
                    {avaterPreview ? (
                      <div className='mt-3 relative w-24 h-24'>
                        <img
                          src={avaterPreview}
                          alt='Avatar Preview'
                          className='w-24 h-24 rounded-full object-cover shadow-md'
                        />
                        <button
                          type='button'
                          onClick={() => {
                            setProfileData({ ...profileData, avater: null });
                            setAvatarPreview(null);
                          }}
                          className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <Dropzone
                        onDrop={handleAvatarDrop}
                        onReject={(files) =>
                          toast.error("File are rejected. Max size 100kb.")
                        }
                        maxSize={100000}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                        className='border border-pink-800 border-dashed w-[100px] rounded-md p-4 flex items-center justify-center'
                      >
                        <div className='flex gap-2 items-center'>
                          <RiImageAddFill size={30} />
                          <p
                            className='text-xs cursor-pointer'
                            size='sm'
                            color='dimmed'
                          >
                            Drag or click to upload
                          </p>
                        </div>
                      </Dropzone>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='mt-5 w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-800'
                  >
                    {updateProfileLoading ? (
                      <ImSpinner10 className='animate-spin text-2xl text-white text-center m-auto' />
                    ) : (
                      "Update Profile"
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
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboards;
