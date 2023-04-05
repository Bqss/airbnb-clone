import React, { useState } from "react";
import Modal from "../Modal";
import { HiXMark } from "react-icons/hi2";
import Tabs from "../Tabs";
import Button from "../atoms/Button";

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
          "w-full bg-white rounded-xl   max-w-5xl h-full  flex flex-col divide-gray-200/70"
        }
      >
        <div className="flex py-5 border-b px-6 ">
          <button className="bg-white mr-auto bg-transparent" onClick={onClose}>
            <HiXMark className="w-5 h-5" />
          </button>
          <span className="mr-auto font-bold text-lg">Air Bnb Your Home</span>
        </div>
        <div className=" flex-1">
          <Tabs activeTab={currentStep} className="flex flex-col h-full">
            <Tabs.Panels className="flex-1">
              <Tabs.Panel value={0} className="py-10 px-12">
                <h2 className="text-xl font-medium">Opsi mana yang terbaik untuk mendeskripsikan tempat anda? </h2>
              </Tabs.Panel>
              <Tabs.Panel value={1}>
                2
              </Tabs.Panel>
              <Tabs.Panel value={2}>
                3
              </Tabs.Panel>
              <Tabs.Panel value={3}>
                4
              </Tabs.Panel>
              <Tabs.Panel value={4}>
                5
              </Tabs.Panel>
              <Tabs.Panel value={5}>
                6
              </Tabs.Panel>
            </Tabs.Panels>
            <Tabs.TabList className="">
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
                <Button className="bg-slate-800 hover:bg-black  rounded-lg px-8 py-3 text-white" onClick={() => setCurrentStep((e) => e + 1)}>
                  Berikutnya 
                </Button>
              </div>
            </Tabs.TabList>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewBnbModal;
