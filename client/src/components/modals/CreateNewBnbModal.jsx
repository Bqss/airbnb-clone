import React, { useState } from "react";
import Modal from "../Modal";
import { HiXMark, HiOutlineHome } from "react-icons/hi2";
import { GiWindmill, GiModernCity, GiVillage } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import Tabs from "../Tabs";
import Button from "../atoms/Button";

import RadioButton from "../atoms/RadioButton";
import { desc } from "../../data";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const CreateNewBnbModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      transition={{
        enter: "transition-all duration-500",
        enterFrom: "opacity-0 translate-y-full",
        enterTo: "opacity-1 translate-y-0",
        leave: "transition-all duration-500",
        leaveFrom: "opacity-1 translate-y-0",
        leaveTo: "opacity-0 translate-y-full",
      }}
    >
      <Modal.Body
        className={
          "w-full bg-white rounded-xl   max-w-5xl h-full max-h-full  flex flex-col divide-gray-200/70 "
        }
      >
        <div className="flex py-5 border-b px-6 ">
          <button className="bg-white mr-auto bg-transparent" onClick={onClose}>
            <HiXMark className="w-5 h-5" />
          </button>
          <span className="mr-auto font-bold text-lg">Air Bnb Your Home</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Tabs
            activeTab={currentStep}
            className="h-full "
          >
            <Tabs.Panels className="">
              <Tabs.Panel value={0} className="py-10 px-12 ">
                <div className="w-full max-w-2xl mx-auto">
                  <h2 className="text-2xl font-medium mt-5">
                    Opsi mana yang terbaik untuk mendeskripsikan tempat anda?{" "}
                  </h2>
                  <span className="text-gray-400 block mt-2">
                    Pilih kategori
                  </span>
                  <div className="grid grid-cols-3 gap-3 mt-8 ">
                    {desc.map(des => <RadioButton value={des.value} className="space-y-2" name="category">
                      <des.icon className="w-8 h-8"/>
                      <span className="block text-sm">{des.label}</span>
                    </RadioButton>)}
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={1}>2</Tabs.Panel>
              <Tabs.Panel value={2}>3</Tabs.Panel>
              <Tabs.Panel value={3}>4</Tabs.Panel>
              <Tabs.Panel value={4}>5</Tabs.Panel>
              <Tabs.Panel value={5}>6</Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        </div>
        <div className="mt-auto flex-shrink-0">
          <div className="w-full bg-gray-200 h-[.35rem] overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500 "
              style={{
                width: `${(currentStep / STEPS.PRICE) * 100}%`,
              }}
            ></div>
          </div>
          <div className="w-full px-5 py-3 flex justify-between">
            <Button
              disabled={currentStep == 0}
              className=" underline"
              onClick={() => setCurrentStep((e) => e - 1)}
            >
              Kembali
            </Button>
            <Button
              className="bg-slate-800 hover:bg-black  rounded-lg px-8 py-3 text-white"
              onClick={() => setCurrentStep((e) => e + 1)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewBnbModal;
