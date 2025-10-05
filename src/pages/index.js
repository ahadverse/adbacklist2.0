import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/shared/layout/layout";
import Cities from "@/components/cities/cities";
import Search from "@/components/search/search";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <Search />
      <div>
        <h1
          className={`py-1 uppercase font-bold sm:w-[1000px] m-auto bg-pink-700 text-white px-2 text-2xl`}
        >
          United States
        </h1>
        <Cities />
      </div>
    </Layout>
  );
}
