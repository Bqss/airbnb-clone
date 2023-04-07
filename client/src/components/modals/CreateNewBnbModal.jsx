import React, { useState } from "react";
import Modal from "../Modal";
import { HiXMark, HiOutlineHome } from "react-icons/hi2";

import Tabs from "../Tabs";
import Button from "../atoms/Button";

import RadioButton from "../atoms/RadioButton";
import { desc } from "../../data";
import { GrRestroomMen } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import Stepper from "../atoms/Stepper";

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
          <Tabs activeTab={currentStep} className="h-full ">
            <Tabs.Panels className="h-full">
              <Tabs.Panel value={0} className="py-10 px-12 ">
                <div className="w-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-2xl font-medium mt-5">
                    Opsi mana yang terbaik untuk mendeskripsikan tempat anda?{" "}
                  </h2>
                  <span className="text-gray-400 block mt-2">
                    Pilih kategori
                  </span>
                  <div className="grid grid-cols-3 gap-3 mt-8 ">
                    {desc.map((des) => (
                      <RadioButton
                        value={des.value}
                        className="space-y-2"
                        name="category"
                      >
                        <des.icon className="w-8 h-8" />
                        <span className="block text-sm">{des.label}</span>
                      </RadioButton>
                    ))}
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={1}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-2xl font-medium mt-5">
                    Apa tipe tempat yang bisa digunakan tamu ?
                  </h2>
                  <span className="text-gray-400 block mt-2">Pilih tipe</span>
                  <div className="flex flex-col gap-3 mt-8 ">
                    <RadioButton
                      value={"seluruhrumah"}
                      className="p-5 flex rounded-xl justify-between items-center"
                      name="tipe"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-xl">Seluruh rumah</h3>
                        <p className="text-gray-400">
                          Tamu bisa menggunakan seluruh tempat
                        </p>
                      </div>
                      <HiOutlineHome className="w-10 h-10" />
                    </RadioButton>
                    <RadioButton
                      value={"kamarpribadi"}
                      className="p-6 flex justify-between items-center"
                      name="tipe"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-xl">Kamar pribadi</h3>
                        <p className="text-gray-400">
                        Tamu akan tidur di kamar pribadi, namun sebagian area mungkin akan digunakan anda atau orang lain
                        </p>
                      </div>
                      <GrRestroomMen className="w-10 h-10 flex-shrink-0" />
                    </RadioButton>
                    <RadioButton
                      value={"kamarbersama"}
                      className="p-6 flex justify-between items-center"
                      name="tipe"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-xl">Kamar bersama</h3>
                        <p className="text-gray-400">
                          Tamu akan tidur di salah satu kamar atau area umum yang mungkin akan digunakan bersama anda atau orang lain
                        </p>
                      </div>
                      <IoPeopleSharp className="w-10 h-10 flex flex-shrink-0" />
                    </RadioButton>
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={2}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-2xl font-medium">Di mana lokasi tempat Anda ?</h2>  
                  <p>Alamat Anda hanya akan diberitahukan kepada tamu setelah anda melakukan reservasi</p>
                  <div className="w-full aspect-square  bg-gray-100 mt-4 rounded-lg">

                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={3}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-2xl font-medium ">Sampaikan informasi dasar mengenai tempat Anda</h2>
                  <p className="text-gray-400">Anda akan menambahkan detail lainnya nanti, seperti tempat tidur.</p>
                  <div className="mt-7 divide-y-2 divide-gray-200/60">
                    <div className="flex items-center justify-between py-6">
                      <span className="text-gray-600">Tamu</span>
                      <Stepper/>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Kamar</span>
                      <Stepper/>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Tempat tidur</span>
                      <Stepper/>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Kamar Mandi</span>
                      <Stepper/>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={4}>5</Tabs.Panel>
              <Tabs.Panel value={5}>6</Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        </div>
        <div className="mt-auto flex-shrink-0">
          <div className="w-full bg-gray-200 h-[.35rem] overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-700 "
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
