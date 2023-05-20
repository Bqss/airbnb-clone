import React, { useState } from "react";
import { DateRange } from "react-date-range";
import WithFade from "./../templates/WithFade";
import useClickOutside from "../../hooks/useClickOutside";

const DatePicker = ({
  isOpen,
  onClose,
  onChange,
  ranges,
  onReset,
  disabledDates =[],
  ...d
}) => {
  const ref = useClickOutside(onClose);


  return (
    <WithFade show={isOpen}>
      <div
        className="absolute right-0 top-14 shadow-xl rounded-xl overflow-hidden"
        ref={ref}
      >
        <div className="bg-white gap-5 p-6 ">
          <div className="flex justify-between">
            <div className="flex-1">
              <h2 className="font-medium text-xl">Pilih tanggal</h2>
              <span className="text-gray-500 text-sm">
                Durasi menginap minimum 3 malam
              </span>
            </div>
            <div className="flex-1 flex border-2 border-gray-500 rounded-xl overflow-hidden divide-x-2 divide-gray-500">
              <div className="flex-1  rounded-xl px-3 py-2 flex flex-col items-start">
              
                  <span className="font-medium text-[.7rem]">CHECK-IN</span>
                  <span className="text-sm">
                    {ranges[0].startDate.getTime() != ranges[0].endDate.getTime() ? ranges[0].startDate.toDateString(): "Tambahkan tanggal"}
                  </span>
              
              </div>
              <div className="flex-1 rounded-xl px-3 py-2 flex flex-col items-start">
                <span className="font-medium text-[.7rem]">CHECK-OUT</span>
                <span className="text-sm">
                  {ranges[0].startDate.getTime() != ranges[0].endDate.getTime() ? ranges[0].endDate.toDateString(): "Tambahkan tanggal"}
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <DateRange
              showMonthAndYearPickers={false}
              editableDateInputs={true}
              ranges={ranges}
              showDateDisplay={false}
              minDate={new Date()}
              onChange={onChange}
              months={2}
              disabledDates={disabledDates}
              direction="horizontal"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-5 py-2 text-sm rounded-xl underline" onClick={onReset}>
              Hapus tanggal
            </button>
            <button
              className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-black hover:text-white"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </WithFade>
  );
};

export default DatePicker;
