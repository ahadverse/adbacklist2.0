import React from "react";

const TransactionList = ({ startIndex, transactions }) => {
  return (
    <div>
      {transactions.length == 0 ? (
        <p>No Transaction History</p>
      ) : (
        <div className='overflow-x-auto text-black'>
          <table className='table table-compact w-full'>
            <thead>
              <tr>
                <th className='bg-black text-white'></th>
                <th className='bg-black text-white'>Date & Time</th>
                <th className='bg-black text-white'>Transaction Id</th>
                <th className='bg-black text-white'>Amount</th>
                <th className='bg-black text-white'>Status</th>
                <th className='bg-black text-white'>Currency</th>
                <th className='bg-black text-white'>Credit Given</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((a, index) => (
                <tr key={index}>
                  <th>{startIndex + index}</th>
                  <td className='w-[220px]'>
                    {new Date(a?.createdAt).toLocaleDateString()}{" "}
                    {new Date(a?.createdAt).toLocaleTimeString()}{" "}
                  </td>
                  <td>{a.trxId}</td>
                  <td>${a.amount}</td>
                  <td className=''>
                    <span
                      className={`font-semibold px-2 py-1 capitalize rounded-full ${
                        a?.status === "pending"
                          ? "bg-blue-600 text-white"
                          : a?.status === "success"
                          ? "bg-green-600 text-white"
                          : a?.status === "failed"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {a?.status}
                    </span>
                  </td>
                  <td>{a.currency}</td>
                  <td>{a.creditGiven == "true" ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
