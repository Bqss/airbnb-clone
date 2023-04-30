import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { MdMapsHomeWork } from "react-icons/md";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";

const SelectLocation = ({ value, setValue, onClear, onAutoSearch }) => {

  const {
    data = [],
    mutate: search,
    isLoading,
  } = useMutation(async (q) => {
    try {
      const result = await fetch(
        "https://api.api-ninjas.com/v1/geocoding?city=" + q,
        {
          headers: {
            "X-Api-Key": "bE9H4iA87STTz15LOVjYRA==1zb77iCSWFZDc8ep",
          },
        }
      );
      return await result.json();
    } catch (err) {}
  });



  const searchLocation = debounce((query) => {
    if (query) search(query);
  }, 500);

  return (
    <Combobox value={value} onChange={setValue}>
      <div className="relative">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center">
            <IoLocationSharp className="w-6 h-6" />
          </span>
          <Combobox.Input
            placeholder="Masukkan alamat Anda"
            onChange={(ev) => searchLocation(ev.target.value)}
            displayValue={(value) =>
              value.name &&
              `${value.name ? value.name + "," : null} ${
                value.state ? value.state + "," : null
              } ${value.state ? value.country : null} `
            }
            className={
              "pl-12 px-5 py-4 rounded-full border-2 border-transparent focus:border-black"
            }
          />

          <div
            className={`absolute right-5 bg-transparent inline-flex items-center inset-y-0 `}
          >
            <Combobox.Button className={"hover:bg-white"}>
              <BsChevronExpand className="w-4 h-4" />
            </Combobox.Button>
            <button
              className={`p-2 rounded-full ${!value.name ? "hidden" : ""}`}
              onClick={() => {
                setValue({});
                onClear();
              }}
            >
              <HiXMark className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options
            className={
              "bg-white mt-1 rounded-xl max-h-[20rem] overflow-y-auto pt-5"
            }
          >
            {!isLoading ? (
              data.map((opt, i) => (
                <Combobox.Option
                  key={i}
                  className={({ active }) =>
                    ` flex cursor-pointer gap-3 items-center select-none py-3 px-5  ${
                      active ? "bg-gray-200 " : ""
                    }`
                  }
                  value={opt}
                >
                  {({ selected, active }) => (
                    <>
                      <span className="rounded-full p-3 bg-gray-100/70">
                        <MdMapsHomeWork className="w-5 h-5" />
                      </span>
                      <div>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {opt.name}
                        </span>
                        <p className="text-sm">
                          {`${opt.state ? opt.state + "," : ""} ${
                            opt.state ? opt.country : ""
                          }`}
                        </p>
                      </div>
                      {selected ? (
                        <span
                          className={` ml-auto ${
                            active ? "text-black" : "text-teal-600"
                          }`}
                        >
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            ) : (
              <div className="py-8 inline-flex justify-center  w-full">
                <BeatLoader size={8} />
              </div>
            )}
            {(!isLoading && !data.length> 0) && (
              <button className="w-full inline-flex px-3 peer items-center gap-4 hover:bg-gray-300 py-3" onClick={onAutoSearch}>
                <div className="p-2 rounded-full inline-block bg-gray-100">
                  <TfiLocationArrow className="w-5 h-5" />
                </div>
                <span className="text-sm">Gunakan lokasi anda saat ini</span>
              </button>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SelectLocation;
