import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Input from "../atoms/Input";
import LineWiwhCenteredText from "../atoms/LineWithCenteredText";
import { useForm } from "react-hook-form";
import userApi from "./../../api/services/userApi"
import Modal from "../Modal";
import * as y from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

const RegisterModal = ({ isOpen, onClose }) => {

  const {mutate} = useMutation({
    mutationFn : userApi.register
  })

  const schema = y.object().shape({
    username: y.string().required("username tidak boleh kosong"),
    email: y
      .string()
      .required("email tidak boleh kosong")
      .email("format email salah"),
    password: y
      .string()
      .required("password tidak boleh kosong")
      .min(8, "panjang password minimal 8")
      
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleRegister = (v) => {
    mutate({...v},{
      onSuccess(data){
        console.log(data)
      }
    })
  };

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
      <Modal.Body>
        <div className="w-full bg-white rounded-xl pb-5  max-w-xl divide-gray-200/70">
          <div className="flex py-5 border-b px-6 ">
            <button
              className="bg-white mr-auto bg-transparent"
              onClick={onClose}
            >
              <HiXMark className="w-5 h-5" />
            </button>
            <span className="mr-auto font-bold text-lg">Mendaftar</span>
          </div>
          <div className=" px-6">
            <p className="text-xl font-medium mt-10 ">
              Selamat datang di Airbnb
            </p>
            <form
              action=""
              className="space-y-3 mt-6"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div>
                <Input
                  register={register}
                  errors={errors}
                  label={"Username"}
                  className="border-2 focus:border-black"
                  name="username"
                  type="text"
                />
                {
                  <small className="text-red-500 text-xs">
                    {errors.username?.message}
                  </small>
                }
              </div>
              <div>
                <Input
                  register={register}
                  errors={errors}
                  label={"Email"}
                  className="border-2 focus:border-black"
                  name="email"
                  type="text"
                />
                {
                  <small className="text-red-500 text-xs">
                    {errors.email?.message}
                  </small>
                }
              </div>
              <div>
                <Input
                  register={register}
                  errors={errors}
                  label={"Password"}
                  className="border-2 focus:border-black"
                  name={"password"}
                  type="password"
                />
                {
                  <small className="text-red-500 text-xs">
                    {errors.password?.message}
                  </small>
                }
              </div>
              <p className="text-xs text-gray-400">
                Kami akan menelpon atau mengirim SMS guna mengonfirmasikan nomor
                anda. Tarif standar SMS dan data berlaku
              </p>
              <button className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium">
                <span>Lanjutkan</span>
              </button>
            </form>
          </div>
          <LineWiwhCenteredText>atau</LineWiwhCenteredText>
          <div className="flex flex-col gap-2 px-6">
            <button className="w-full py-3 px-6 rounded-lg border-2 border-black bg-white ">
              Lanjutkan dengan Google
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
