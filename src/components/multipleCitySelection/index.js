import React, { useState } from "react";
import cities from "../../../public/usa.json";
import { useRouter } from "next/router";
import { FaCircleArrowRight } from "react-icons/fa6";
import { ImSpinner10 } from "react-icons/im";

const MultipleCitiesSelection = () => {
  const router = useRouter();
  const [state, setState] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCountrySelected, setisCountrySelected] = useState({});

  const seleceCountry = (e) => {
    const { checked } = e.target;
    const q = e.target.value;

    if (checked) {
      const selectedRegion = cities?.find((a) => a?._id == q);
      setisCountrySelected(selectedRegion);

      const regions = selectedRegion?.children?.map((a) =>
        a.children.map((a) => {
          const data = a.name ? { ...a, isChecked: true } : a;

          const findData = state.find((s) => s._id == a._id);

          if (findData) {
            return;
          }
          state.push(data);
        })
      );
    } else if (checked == false) {
      const selectedRegion = cities?.find((a) => a?._id == q);
      setisCountrySelected({});
      state.pop(selectedRegion);
      const regions = selectedRegion?.children?.map((a) =>
        a.children.map((p) => {
          const data = p.name ? { ...p, isChecked: false } : p;

          state.pop(data);
        })
      );
    }

    setReload(!reload);
  };

  const selectAll = (e) => {
    const { checked } = e.target;
    const q = e.target.value.split(",");

    if (checked) {
      const selectedRegion = cities?.find((a) => a?._id == q[0]);
      const regions = selectedRegion?.children?.find((a) => a?._id == q[1]);

      const checkData = state.filter((a) => a.parentId == q[1]);

      if (checkData) {
        const removeOld = checkData.map((a) => state.pop(a));
      }

      const localCities = regions?.children?.filter((a) => a.parentId == q[1]);
      const city = localCities?.map((a) =>
        a.name ? { ...a, isChecked: true } : a
      );
      const res = city.map((a) => state.push(a));
    } else if (checked == false) {
      const selectedRegion = cities?.find((a) => a?._id == q[0]);
      const regions = selectedRegion?.children?.find((a) => a?._id == q[1]);

      const checkData = state.filter((a) => a.parentId !== q[1]);
      setState(checkData);
    }

    setReload(!reload);
  };

  const seletectedCity = (d) => {
    const seleted = state.find((a) => a._id == d._id);

    if (seleted) {
      const newState = state.filter((a) => a._id !== d._id);
      setState(newState);
    } else {
      const New = { ...d, isChecked: true };
      setState([...state, New]);
    }
  };

  const citiesName = () => {
    setIsLoading(true);
    const data = state.map((a) => a.name.toLowerCase().replace(/\s+/g, "-"));
    localStorage.setItem("cities", JSON.stringify(data));
    setTimeout(() => {
      router.push("/multiple-cities");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className='sm:w-[800px]  my-5  mx-auto px-10 pb-10 rounded'>
      {" "}
      <div className='bg-white flex px-1 justify-between items-center'>
        <h1 className='capitalize  py-3 '>
          Select cities :{" "}
          <span className='font-bold text-pink-800'>{state.length} </span>{" "}
          Cities are selected
        </h1>
        <div>
          {state.length ? (
            <button
              onClick={() => citiesName()}
              className='bg-pink-800 text-white font-bold px-5 rounded-sm flex items-center gap-2'
            >
              Next{" "}
              {isLoading ? (
                <ImSpinner10 className='animate-spin' />
              ) : (
                <FaCircleArrowRight />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr className='my-3 border border-pink-700' />
      <label className='font-bold text-lg'>
        <input
          type='checkbox'
          className='checkbox checkbox-xs border-pink-800 checked:border-pink-800 [--chkbg:theme(colors.pink.800)] [--chkfg:white] mr-1'
          value={["63d4d4c23f5c38ce5f287cd1"]}
          onClick={seleceCountry}
        ></input>{" "}
        Select All
      </label>
      <br />
      {cities?.[0]?.children?.map((c) => (
        <div className='collapse collapse-arrow' key={c._id}>
          <input type='checkbox' className='peer' />
          <div className='collapse-title bg-white rounded-lg text-pink-800   peer-checked:bg-white peer-checked:text-pink-800'>
            {c?.name}
          </div>
          <div className='collapse-content border rounded-2xl my-1 border-pink-800 bg-white text-primary-content peer-checked:bg-white peer-checked:text-black'>
            <div>
              <label className='font-bold text-lg'>
                <input
                  type='checkbox'
                  //  className="checkbox checkbox-xs checkbox-secondary mr-1"
                  className='checkbox checkbox-xs border-pink-800 checked:border-pink-800 [--chkbg:theme(colors.pink.800)] [--chkfg:white] mr-1'
                  disabled={isCountrySelected?.children?.find((a) =>
                    a.name == c.name ? true : false
                  )}
                  checked={isCountrySelected?.children?.find((a) =>
                    a.name == c.name ? true : false
                  )}
                  value={[cities?.[0]._id, c?._id]}
                  onClick={selectAll}
                ></input>
                Select all
              </label>
              <br></br>
              <hr className='my-1' />

              <div className='grid sm:grid-cols-4 grid-cols-2 gap-3'>
                {c?.children?.map((d) => (
                  <>
                    <label key={d._id}>
                      <input
                        type='checkbox'
                        className='checkbox checkbox-xs border-pink-800 checked:border-pink-800 [--chkbg:theme(colors.pink.800)] [--chkfg:white] mr-1'
                        checked={state.find((a) =>
                          a.name == d.name ? true : false
                        )}
                        onChange={() => seletectedCity(d)}
                      ></input>
                      {d.name}
                    </label>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleCitiesSelection;
