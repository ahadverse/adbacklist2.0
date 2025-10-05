import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push(router.query.callbackUrl || "/");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8'>
        <div className='flex justify-center mb-6'>
          <Link href='/'>
            <img src='/logo.png' alt='Logo' className='h-16' />
          </Link>
        </div>

        <h1 className='text-2xl sm:text-3xl font-bold text-center text-pink-700 mb-6'>
          Login / Sign Up
        </h1>

        {/* Email/Password */}
        <form onSubmit={handleEmailLogin} className='flex flex-col gap-4 mb-6'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500'
          />
          <button
            type='submit'
            className='bg-pink-700 hover:bg-pink-600 text-white font-bold p-3 rounded transition duration-200'
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>
        <Link href={"/sign-up"} className='hover:text-pink-800'>
          Create New Account
        </Link>
        <div className='flex items-center my-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='mx-2 text-gray-400'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        {/* Google Login */}
        <button
          className='flex items-center justify-center border border-gray-300 p-3 rounded hover:bg-gray-50 transition duration-200 gap-3 w-full'
          onClick={() => {
            setIsLoading(true);
            signIn("google", {
              callbackUrl: router.query.callbackUrl || "/",
            });
          }}
        >
          <FcGoogle className='text-2xl' />
          <span className='text-gray-700 font-semibold'>
            {isLoading ? "Authenticating..." : "Sign In With Google"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
