import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import { HiXMark, HiOutlineHome } from "react-icons/hi2";
import Tabs from "../Tabs";
import Button from "../atoms/Button";
import RadioButton from "../atoms/RadioButton";
import { desc, fasility } from "../../data";
import { GrRestroomMen } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import Stepper from "../atoms/Stepper";
import toaster from "react-hot-toast";
import CheckBox from "../atoms/CheckBox";
import ImageUpload from "../atoms/MainImageUpload";
import TextArea from "../atoms/TextArea";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {useMutation} from "@tanstack/react-query";
import GetLocation from "../molecules/GetLocation";
import AvenueApi from "../../api/services/avenueApi";

const STEPS = {
  CATEGORY: 0,
  Tipe: 1,
  LOCATION: 2,
  INFO: 3,
  FASILITAS: 4,
  IMAGES: 5,
  JUDUL: 6,
  DESCRIPTION: 7,
  PRICE: 8,
};

const CreateNewBnbModal = ({ isOpen, onClose }) => {

  const { mutate ,isLoading } = useMutation({
    mutationFn : AvenueApi.createBnb,
  })

  const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState("")
  const [tipeRumah, setTipeRumah] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState([]);
  const [lokasi, setLokasi] = useState({});
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [fasilitas, setFasilitas] = useState(fasility.map(e => ({[e.value] :  false})).reduce((p,c) => ({...p,...c}),{}));
  const [infoDasar, setInfoDasar] = useState({
    tamu: 1,
    kamar: 1,
    tempatTidur: 1,
    kamarMandi: 1,
  });

  useEffect(() => {
    switch (currentStep) {
      case STEPS.CATEGORY:
        setTimeout(() => {
          setIsValid(() => category == "");
        }, 0);

        break;
      case STEPS.Tipe:
        setTimeout(() => {
          setIsValid(() => tipeRumah == "");
        }, 0);
        break;
      case STEPS.LOCATION:
        setTimeout(() => {
          setIsValid(() => !lokasi.name);
        }, 0);
        break;
      case STEPS.IMAGES:
        setTimeout(() => {
          setIsValid(
            () => [...images].filter((e) => e.uploadedImage?.url).length < 5
          );
        }, 0);
        break;
      case STEPS.JUDUL:
        setTimeout(() => {
          setIsValid(() => title == "");
        }, 0);
        break;
      case STEPS.DESCRIPTION:
        setTimeout(() => {
          setIsValid(() => description == "");
        }, 0);
        break;
      case STEPS.PRICE:
        setTimeout(() => {
          setIsValid(() => price == "");
        }, 0);
        break;
    }
  }, [
    category,
    tipeRumah,
    lokasi,
    images,
    title,
    description,
    price,
    currentStep,
  ]);

  const next = () => {
    if(currentStep == STEPS.PRICE){

      mutate({
        alamat : lokasi,
        available : tipeRumah,
        deskripsi : description,
        fasilitas,
        foto: images.map(img => ({url: img.uploadedImage.url, name: img.uploadedImage.original_filename})),
        harga : parseInt(price.slice(3)),
        infoDasar,
        judul : title,
        kategori: category,
        tag : category
      },{
        
        onSuccess(data){
          setCurrentStep(STEPS.CATEGORY);
          setCategory("");
          setIsValid(false);
          setImages([]);
          setLokasi([])
          setPrice("");
          setDescription("")
          setTitle("")
          setFasilitas(fasility.map(e => ({[e.value] :  false})).reduce((p,c) => ({...p,...c}),{}))
          setInfoDasar({
            tamu : 1,
            kamar : 1,
            tempatTidur : 1,
            kamarMandi: 1
          });
          toaster("success creating new bnb");
          onClose();
        }
      })
      return ;
    }
    setCurrentStep((e) => e + 1);
  };

  const prev = () => {
    setCurrentStep((e) => e - 1);
  };

  const increment = () => {
    setPrice((e) => {
      const crr = e.slice(3);
      if(crr!=""){
        return `Rp.${(parseInt(crr) + 1000)}`
      }
      return e;
    });
  };

  const decrement = () => {
    setPrice((e) => {
      const crr = e.slice(3);
      if(crr!="" && parseInt(crr)>=1000){
        return `Rp.${(parseInt(crr) - 1000)}`
      }
      return e;
    });
  };

  const onPriceChange = ({ target }) => {
    const value = target.value;
    const crr = target.value.slice(3);
    setPrice((e) => {
      if ((value.length ?? 0) < (e.length ?? 0)) {
        if (crr) return value;
        return "";
      }
      if (crr) return `Rp.${crr}`;
      return `Rp.${value}`;
    });
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnClickOutside ={false}
      transition={{
        enter: "transition-all  duration-500",
        enterFrom: "opacity-0 translate-y-full",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition-all  duration-500",
        leaveFrom: "opacity-100 translate-y-0",
        leaveTo: "opacity-0 translate-y-full",
      }}
    >
      <Modal.Body
        className={
          "w-full bg-white rounded-xl  max-w-5xl h-full   flex flex-col divide-gray-200/70 "
        }
      >
        <div className="flex py-5 border-b px-6 ">
          <button className="bg-white mr-auto bg-transparent p-1 rounded-lg" onClick={onClose}>
            <HiXMark className="w-5 h-5" />
          </button>
          <span className="mr-auto font-bold text-lg">Air Bnb Your Home</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Tabs activeTab={currentStep} className="h-full ">
            <Tabs.Panels className="h-full ">
              <Tabs.Panel value={STEPS.CATEGORY} key={STEPS.CATEGORY}>
                <div className="w-full max-w-2xl mx-auto flex flex-col ">
                  <h2 className="text-3xl font-medium mt-5">
                    Opsi mana yang terbaik untuk mendeskripsikan tempat anda?{" "}
                  </h2>
                  <span className="text-gray-400 block mt-2">
                    Pilih kategori
                  </span>
                  <div className="grid grid-cols-3 gap-3 mt-8 ">
                    {desc.map((des, i) => (
                      <RadioButton
                        value={des.value}
                        className="space-y-2"
                        name="category"
                        key={i}
                        selected={category === des.value}
                        setSelected={setCategory}
                      >
                        <des.icon className="w-8 h-8" />
                        <span className="block text-sm">{des.label}</span>
                      </RadioButton>
                    ))}
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.Tipe} key={STEPS.Tipe}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium mt-5">
                    Apa tipe tempat yang bisa digunakan tamu ?
                  </h2>
                  <span className="text-gray-400 block mt-2">
                    Pilih tipe ruangan yang bisa digunakan oleh tamu
                  </span>
                  <div className="flex flex-col gap-3 mt-8 ">
                    <RadioButton
                      value={"seluruhrumah"}
                      className="p-5 flex rounded-xl justify-between items-center"
                      name="tipe"
                      selected={tipeRumah == "seluruhrumah"}
                      setSelected={setTipeRumah}
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
                      selected={tipeRumah == "kamarpribadi"}
                      setSelected={setTipeRumah}
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-xl">Kamar pribadi</h3>
                        <p className="text-gray-400">
                          Tamu akan tidur di kamar pribadi, namun sebagian area
                          mungkin akan digunakan anda atau orang lain
                        </p>
                      </div>
                      <GrRestroomMen className="w-10 h-10 flex-shrink-0" />
                    </RadioButton>
                    <RadioButton
                      value={"kamarbersama"}
                      className="p-6 flex justify-between items-center"
                      name="tipe"
                      selected={tipeRumah == "kamarbersama"}
                      setSelected={setTipeRumah}
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-xl">Kamar bersama</h3>
                        <p className="text-gray-400">
                          Tamu akan tidur di salah satu kamar atau area umum
                          yang mungkin akan digunakan bersama anda atau orang
                          lain
                        </p>
                      </div>
                      <IoPeopleSharp className="w-10 h-10 flex flex-shrink-0" />
                    </RadioButton>
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.LOCATION}>
                <div className="w-full h-full  max-w-2xl mx-auto flex flex-col justify-center ">
                  <h2 className="text-3xl font-medium">
                    Di mana lokasi tempat Anda ?
                  </h2>
                  <p>
                    Alamat Anda hanya akan diberitahukan kepada tamu setelah
                    anda melakukan reservasi
                  </p>
                  <GetLocation lokasi={lokasi} setLokasi={setLokasi} />
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.INFO} key={STEPS.INFO}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium ">
                    Sampaikan informasi dasar mengenai tempat Anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Anda akan menambahkan detail lainnya nanti, seperti tempat
                    tidur.
                  </p>
                  <div className="mt-7 divide-y-2 divide-gray-200/60">
                    <div className="flex items-center justify-between py-6">
                      <span className="text-gray-600">Tamu</span>
                      <Stepper
                        setValue={setInfoDasar}
                        value={infoDasar.tamu}
                        name={"tamu"}
                      />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Kamar</span>
                      <Stepper
                        setValue={setInfoDasar}
                        value={infoDasar.kamar}
                        name={"kamar"}
                      />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Tempat tidur</span>
                      <Stepper
                        setValue={setInfoDasar}
                        value={infoDasar.tempatTidur}
                        name={"tempatTidur"}
                      />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <span className="text-gray-600">Kamar Mandi</span>
                      <Stepper
                        setValue={setInfoDasar}
                        value={infoDasar.kamarMandi}
                        name={"kamarMandi"}
                      />
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.FASILITAS} key={STEPS.FASILITAS}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium ">
                    Beri tahu tamu apa saja yang ditawarkan di tempat anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Anda bisa menambahkan fasilitas lainnya setelah iklan
                    dipublikasikan.
                  </p>
                  <div className="grid mt-8 grid-cols-3 gap-3">
                    {fasility.map((e, i) => (
                      <CheckBox value={e.value} key={i} name={e.value} selected={fasilitas[e.value]??false} setSelected={setFasilitas}>
                        <e.icon className="w-8 h-8 flex flex-shrink-0" />
                        <h3 className="mt-3">{e.label}</h3>
                      </CheckBox>
                    ))}
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.IMAGES} key={STEPS.IMAGES}>
                <div className="w-full h-fit py-10  max-w-2xl mx-auto flex flex-col relative">
                  <h2 className="text-3xl font-medium ">
                    Tambahkan beberapa foto kabin anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Anda membutuhkan 5 foto untuk memulai. Anda bisa menambahkan
                    foto atau mengubahnya nanti
                  </p>
                  <div className="mt-8  gap-3">
                    <ImageUpload
                      className="w-full aspect-[7/5]"
                      image={images}
                      setter={setImages}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.JUDUL} key={STEPS.JUDUL}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium ">
                    Sekarang, mari beri judul untuk kabin anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Judul ringkas adalah yang terbaik. Anda bisa mengubahnya
                    kapan saja.
                  </p>
                  <div className="mt-8 ">
                    <TextArea
                      value={title}
                      row={5}
                      setValue={setTitle}
                      maxLength={32}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.DESCRIPTION} key={STEPS.DESCRIPTION}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium ">
                    Tuliskan deskripsi tempat Anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Sampaikan apa yang membuat tempat Anda istimewa
                  </p>
                  <div className="mt-8">
                    <TextArea
                      value={description}
                      row={8}
                      setValue={setDescription}
                      maxLength={500}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value={STEPS.PRICE} key={STEPS.PRICE}>
                <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center">
                  <h2 className="text-3xl font-medium ">
                    Sekarang tetapkan harga Anda
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Tetapkan harga anda untuk tempat anda, anda dapat
                    mengubahnya kapan saja.
                  </p>
                  <div className="mt-8 ">
                    <div className="p-8 rounded-xl flex items-center gap-3 bg-gray-100">
                      <button className="p-4 rounded-full  bg-white border border-gray-300 hover:border-black" onClick={decrement}>
                        <AiOutlineMinus className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        name="price"
                        className="text-4xl py-4 text-center font-medium "
                        placeholder="Rp.00"
                        onChange={onPriceChange}
                        pattern={"[1-9]"}
                        value={price}
                      />

                      <button className="p-4 rounded-full  bg-white border border-gray-300 hover:border-black" onClick={increment}>
                        <AiOutlinePlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        </div>
        <Footer
          proggress={currentStep / STEPS.PRICE}
          isValid={isValid}
          prev={prev}
          isUploading = {isLoading}
          next={next}
        />
      </Modal.Body>
    </Modal>
  );
};

const Footer = memo(({ proggress, isValid, prev, next, isUploading }) => {
  return (
    <div className="mt-auto flex-shrink-0">
      <div className="w-full bg-gray-200 h-[.35rem] overflow-hidden">
        <div
          className="h-full bg-black transition-all delay-300 duration-700 "
          style={{
            width: `${proggress * 100}%`,
          }}
        ></div>
      </div>
      <div className="w-full px-5 py-3 flex justify-between">
        <Button
          disabled={proggress == 0}
          className="underline disabled:text-gray-300"
          onClick={prev}
        >
          Kembali
        </Button>

        <Button
          className="bg-slate-800 ml-auto hover:bg-black  rounded-lg px-8 py-3 text-white disabled:bg-gray-500"
          onClick={next}
          disabled={isValid}
          isLoading={isUploading}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
});

export default CreateNewBnbModal;
