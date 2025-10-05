import Layout from "@/components/shared/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import Categories from "@/components/categories/categories";
import Head from "next/head";

const CategoryPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>
          {router.query.city
            ? `${router.query.city
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")} Classified Ads – Adbacklist local sales network`
            : "Classified Ads – Adbacklist local sales network"}
        </title>

        <meta name='title' content={router.query.city} />
        <meta name='keywords' content='' />
        <meta name='site_name' content='' />
        <meta
          name='description'
          content={`${router.query?.city
            ?.split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(
              " "
            )} Craigslist alternative for free posting ads for Housing, for sale, vehicles, mega personal classifieds, create your local sales network on adbacklist `}
        />
        <link
          name='canonical'
          rel='canonical'
          href={`https://adbacklist.com${router?.asPath}`}
        />
      </Head>
      <Layout>
        <Categories path={router.query} />
      </Layout>
    </div>
  );
};

export default CategoryPage;
