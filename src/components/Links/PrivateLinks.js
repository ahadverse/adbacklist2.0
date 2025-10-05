import { MyContext } from "@/pages/_app";
import Link from "next/link";
import React, { useContext } from "react";

const PrivateLinks = () => {
  const { links } = useContext(MyContext);

  return (
    <div>
      {" "}
      {links ? (
        <div className="flex justify-around sm:text-xl p-2 text-pink-700 border-t-2 border-pink-700">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.shemale}`}
          >
            Shemale Escorts
          </Link>{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.meet}`}
          >
            Meet & Fuck
          </Link>{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.live}`}
          >
            Live Escorts
          </Link>{" "}
        </div>
      ) : (
        <div className="flex justify-around text-xl p-2 text-blue-600">
          <Link href={`#`}>Shemale Escorts</Link>{" "}
          <Link href={`#`}>Meet & Fuck</Link>{" "}
          <Link href={`#`}>Live Escorts</Link>{" "}
        </div>
      )}
    </div>
  );
};

export default PrivateLinks;
