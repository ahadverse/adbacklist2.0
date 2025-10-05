import Layout from "@/components/shared/layout/layout";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Recharge = () => {
  const { data: session } = useSession();
  const [method , setMethod] = useState("")
  return (
    <Layout>
      <div className="my-5">
        <div className=" sm:w-[1200px] m-auto  bg-white  p-5">
          <h1 className="text-pink-700 font-bold text-3xl font-mono">
            Recharge Now
          </h1>
          <hr className="my-5 border-2 border-pink-600" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 m-auto ">
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer" onClick={()=>setMethod("btc")}>
              <img className="w-[100px] m-auto" src="/currency/btc.png" />
              <h2 className="font-bold font-serif text-center  text-xl">BTC</h2>
            </div>
            <div className="w-[200px]  m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/usdt.png" />
              <h2 className="font-bold font-serif text-center text-xl">USDT</h2>
            </div>
            <div className="w-[200px] m-auto  p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/trx.png" />
              <h2 className="font-bold font-serif text-center  text-xl">TRX</h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800  hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/doge.svg" />
              <h2 className="font-bold font-serif text-center  text-xl">
                DOGE
              </h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/ltc.png" />
              <h2 className="font-bold font-serif text-center  text-xl">LTC</h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/eth.png" />
              <h2 className="font-bold font-serif text-center  text-xl">ETH</h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/bnb.png" />
              <h2 className="font-bold font-serif text-center  text-xl">BNB</h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/usdc.png" />
              <h2 className="font-bold font-serif text-center  text-xl">
                USDC
              </h2>
            </div>
          </div>
          <div className="flex justify-center sm:flex-row flex-col  sm:w-6/12 m-auto gap-3 mt-5">
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/xrp.png" />
              <h2 className="font-bold font-serif text-center  text-xl">XRP</h2>
            </div>
            <div className="w-[200px] m-auto p-3 border-dotted border-2 border-pink-800 hover:bg-pink-800 text-pink-700 hover:text-white cursor-pointer">
              <img className="w-[100px] m-auto" src="/currency/sol.png" />
              <h2 className="font-bold font-serif text-center text-xl">SOL</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recharge;
