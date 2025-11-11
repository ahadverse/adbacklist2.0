import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, Notification } from "@mantine/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import { MyContextProvider } from "@/components/user";
import "@mantine/carousel/styles.css";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { Bounce, ToastContainer } from "react-toastify";

export const MyContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [links, setLinks] = useState([]);
  async function getUser() {
    try {
      const response = await axios.get(
        `https://adbacklist-backend2-0-vb3d.vercel.app/api/header-ads`,
        {
          method: "GET",
        }
      );
      const data = response.data.response.links;
      setLinks(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <MantineProvider>
      <SessionProvider session={session}>
        <MyContextProvider>
          <MyContext.Provider value={{ links }}>
            <Component {...pageProps} />
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
              transition={Bounce}
            />
          </MyContext.Provider>
        </MyContextProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
