import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import PrivateLinks from "@/components/Links/PrivateLinks";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  let link;
  if (router.asPath.includes("/categories")) {
    link = <PrivateLinks />;
  } else if (router.asPath.includes("/posts")) {
    link = <PrivateLinks />;
  } else if (router.asPath.includes("/post")) {
    link = <PrivateLinks />;
  } else if (router.asPath.includes("/blog")) {
    link = <PrivateLinks />;
  }

  return (
    <div>
      <Header />
      {link}
      <hr className='border border-gray-300' />
      <div className='py-3 bg-gray-200'>{children}</div>
      <hr className='border border-gray-300' />
      <Footer />
    </div>
  );
};

export default Layout;
