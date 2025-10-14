import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/shared/layout/layout";
import Cities from "@/components/cities/cities";
import Search from "@/components/search/search";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Local sales network – free Classified ads on adbacklist</title>

        <meta
          name='title'
          content='Local sales network – free Classified ads on adbacklist'
        />
        <meta
          name='keywords'
          content='craigslist alternative,
                  mega personal classified,
                  free posting ads,
                  backpage alternatives 2025,
                  local sales network,
                  product listing ad,
                  best internet advertising,
                  classified submission sites'
        />
        <meta name='site_name' content='Adbacklist' />
        <meta name='publisher' content='Adbacklist' />
        <meta
          name='description'
          content={`craigslist alternative for free posting ads for Housing, for sale, vehicles, mega personal classifieds, create your local sales network on adbacklist`}
        />
        <link rel='canonical' href={`https://adbacklist.com/`} />
        <meta name='robots' content='index, follow' />
      </Head>

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
    </div>
  );
}
