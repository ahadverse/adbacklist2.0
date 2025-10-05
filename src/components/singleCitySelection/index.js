import React from "react";
import cities from "../../../public/usa.json";
import Link from "next/link";

const SingleCitySelection = () => {
  return (
    <div>
      <div className="sm:w-[800px]  my-5  mx-auto px-10 pb-10 rounded">
        <h1 className="capitalize bg-white py-3 px-1">Select a city</h1>

        <hr className="my-5 border border-pink-700" />
        {cities?.[0].children?.map((c) => (
          <div className="collapse collapse-arrow" key={c._id}>
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-white rounded-lg text-pink-800   peer-checked:bg-white peer-checked:text-pink-800">
              {c.name}
            </div>
            <div className="collapse-content border rounded-2xl my-1 border-pink-800 bg-white text-primary-content peer-checked:bg-white peer-checked:text-black">
              <div className="grid sm:grid-cols-4 grid-cols-2 py-3 gap-3">
                {c?.children?.map((d) => (
                  <Link
                    key={d._id}
                    href={`/single-city/${d.name.toLowerCase()}`}
                    className="visited:text-purple-600"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCitySelection;
