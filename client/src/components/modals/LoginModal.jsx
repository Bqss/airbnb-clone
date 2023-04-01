import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Input from "../atoms/Input";
import LineWiwhCenteredText from "../atoms/LineWithCenteredText";
import { useForm } from "react-hook-form";

const LoginModal = () => {
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
  });

  const handleRegister = (ev) => {};

  return (
    <>
      <div className="absolute inset-0 backdrop-brightness-75 "></div>
      <div className="absolute inset-0 flex justify-center items-center ">
        <div className="w-full bg-white rounded-xl pb-5  max-w-xl divide-gray-200/70">
          <div className="flex py-5 border-b px-6 ">
            <button className="bg-white mr-auto bg-transparent">
              <HiXMark className="w-5 h-5" />
            </button>
            <span className="mr-auto font-bold text-lg">
              Masuk 
            </span>
          </div>
          <div className=" px-6">
            <p className="text-2xl mt-10 ">Selamat datang di Airbnb</p>
            <form
              action=""
              className="space-y-3 mt-6"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div>
                <Input
                  register={register}
                  errors={errors}
                  label={"Email"}
                  className="border-2 focus:border-black"
                  rules={{
                    required: {
                      value: true,
                      message: "Email can't be empty",
                    },
                  }}
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
                  rules={{
                    required: {
                      value: true,
                      message: "Password can't be empty",
                    },
                  }}
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
              Lanjutkan dengan Facebook
            </button>
            <button className="w-full py-3 px-6 rounded-lg border-2 border-black bg-white ">
              Lanjutkan dengan Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
