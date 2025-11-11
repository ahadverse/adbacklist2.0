"use client";
import React, { useState } from "react";
import { Modal, Button, Tooltip, TextInput } from "@mantine/core";
import QRCode from "react-qr-code";
import { FaCopy } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

const Deposit = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [address, setAddress] = useState("");
  const { data: session } = useSession();

  const showModal = (e) => {
    setCurrency(e.currency);
    setAddress(e.address);
    setOpened(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Copied to clipboard",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trxId = e.target.trxid.value;
    const amount = e.target.amount.value;

    const data = {
      email: session?.user?.email,
      trxId,
      amount,
      exactAmount: amount,
      currency,
      userId: session?.user?.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transaction",
        data
      );
      if (response.data.status === "success") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title:
            "Your deposit will be verified and credit will be added to your wallet.",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => router.reload());
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const currencies = [
    {
      currency: "BTC",
      address: "1AiPH2VyJ6JyUXUfPBHg7hqz2XDRLTiD89",
      img: "/currency/btc.png",
    },
    {
      currency: "USDT",
      address: "TP3xGcnf29NxJiKDpDDEw3dn8eDz3nwNid",
      img: "/currency/usdt.png",
    },
    {
      currency: "LTC",
      address: "LW5MBAv7RwkzBtR4xRpSSRLkEZJzFwf2pr",
      img: "/currency/ltc.png",
    },
    {
      currency: "DOGE",
      address: "DLEuuZNKUYrzJSEsHoYY4BvfkaUBzFcSp3",
      img: "/currency/doge.svg",
    },
    {
      currency: "ETH",
      address: "0xaff02721266f38707d4d5864cb232be356d7b7fb",
      img: "/currency/eth.png",
    },
    {
      currency: "TRX",
      address: "TP3xGcnf29NxJiKDpDDEw3dn8eDz3nwNid",
      img: "/currency/trx.png",
    },
  ];

  return (
    <div>
      <div className='bg-white p-3 sm:w-[800px] m-auto my-10 rounded-xl shadow-md'>
        <h1 className='text-2xl p-3 font-bold text-green-500 text-center'>
          Choose Deposit Option
        </h1>

        <div className='grid sm:grid-cols-3 grid-cols-1 gap-5'>
          {currencies.map((item) => (
            <div
              key={item.currency}
              className='border-2 rounded-lg cursor-pointer hover:shadow-lg transition-all p-3'
              onClick={() => showModal(item)}
            >
              <img
                className='w-[100px] h-[100px] m-auto'
                src={item.img}
                alt={item.currency}
              />
              <h2 className='text-center text-black font-semibold'>
                {item.currency}
              </h2>
            </div>
          ))}
        </div>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`Deposit ${currency}`}
          overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
        >
          <div className='bg-white p-3'>
            <div className='m-auto bg-white p-2 rounded-md'>
              <p className='flex gap-2 items-center justify-center break-all'>
                {address}
                <Tooltip label='Copy' withArrow>
                  <FaCopy
                    className='text-xl cursor-pointer'
                    onClick={() => handleCopy(address)}
                  />
                </Tooltip>
              </p>
              <div className='flex justify-center my-3'>
                <QRCode value={address} size={160} />
              </div>
            </div>

            <hr className='my-5' />
            <small>
              After completing the payment, please send us the transaction ID
              and the amount you have sent.
            </small>
            <hr className='my-5' />

            <form onSubmit={handleSubmit}>
              <TextInput
                name='trxid'
                label='Transaction ID'
                placeholder='Transaction ID'
                required
                className='mb-3'
              />

              <TextInput
                name='amount'
                label='Amount'
                placeholder='Amount you added'
                required
              />

              <Button
                type='submit'
                fullWidth
                color='green'
                radius='md'
                mt='md'
                loading={loading}
              >
                Submit
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Deposit;
