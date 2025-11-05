import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Paper,
  TextInput,
  Button,
  Stack,
  Text,
  PasswordInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { RiImageAddFill } from "react-icons/ri";

const Signup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avater: null,
  });
  const [avaterPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarDrop = (files) => {
    const file = files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        // 100 KB
        toast.error("Avatar must be less than 100KB");
        return;
      }
      setForm({ ...form, avater: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      let avaterUrl = "";

      // Upload avater if selected
      if (avaterPreview) {
        const avaterForm = new FormData();
        avaterForm.append("images", form?.avater);

        const uploadRes = await fetch(
          "https://adbacklist-backend2-0-vb3d.vercel.app/api/files2/files",
          {
            method: "POST",
            body: avaterForm,
          }
        );

        const uploadResult = await uploadRes.json();
        avaterUrl = uploadResult?.[0] || ""; // adjust based on your API response
      }

      // Send user signup request
      const res = await axios.post(
        "https://adbacklist-backend2-0-vb3d.vercel.app/api/users",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          avater: avaterUrl,
          isManual: true,
        }
      );

      if (res.data.message === "success") {
        toast.success("Sign up successful! Please login.");
        router.push("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='max-w-md  bg-white w-full space-y-6 p-5'>
        {/* Logo */}
        <div className='flex justify-center'>
          <Link href='/'>
            <img src='/logo.png' alt='Logo' className='h-16 w-auto' />
          </Link>
        </div>

        {/* Title */}
        <Text align='center' weight={700} size='xl' color='pink'>
          Sign Up
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing='md'>
            {/* Name Fields */}
            <div className='flex gap-4'>
              <TextInput
                placeholder='First Name'
                name='firstName'
                value={form.firstName}
                onChange={handleChange}
                required
                radius='md'
                className='flex-1'
              />
              <TextInput
                placeholder='Last Name'
                name='lastName'
                value={form.lastName}
                onChange={handleChange}
                required
                radius='md'
                className='flex-1'
              />
            </div>

            {/* Email */}
            <TextInput
              placeholder='Email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              radius='md'
            />

            {/* Password */}
            <PasswordInput
              placeholder='Password'
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
              radius='md'
            />

            <PasswordInput
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChange}
              required
              radius='md'
            />

            {/* Avatar Dropzone */}
            <div>
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
                      setForm({ ...form, avater: null });
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

            {/* Submit Button */}
            <Button type='submit' color='pink' radius='md' fullWidth>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </Stack>
        </form>

        {/* Login Link */}
        <Text align='center' size='sm' color='dimmed'>
          Already have an account?{" "}
          <Link href='/login' className='text-pink-600 font-semibold'>
            Login
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Signup;
