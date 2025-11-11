import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, createContext, useContext } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [users, setUser] = useState({});
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${session?.user?.id}`
      );
      const data = response.data.data.user;
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (session) {
      getUser();
    }
  }, [session?.user?.email]);

  return (
    <MyContext.Provider value={{ users, setUser, loading }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
