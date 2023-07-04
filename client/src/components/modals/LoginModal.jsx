import React from "react";
import { HiXMark } from "react-icons/hi2";
import {Input, Button, LineWithCenteredText} from "/src/components/atoms";
import { useForm } from "react-hook-form";
import {Modal} from "/src/components/molecules";
import * as y from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "../../api/services/userApi";
import toast from "react-hot-toast";

const LoginModal = ({ isOpen, onClose }) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: UserApi.login,
  });
  const queryClient = useQueryClient();
  const schema = y.object().shape({
    email: y.string().required("email tidak boleh kosong"),
    password: y.string().required("password tidak boleh kosong"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const handleLogin = (v) => {
    mutate(
      { ...v },
      {
        onSuccess: () => {
          toast.success("Berhasil login");
          onClose();
          reset();
          queryClient.invalidateQueries("[currentUser]");
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      appear
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
            <span className="mr-auto font-bold text-lg">Login</span>
          </div>
          <div className=" px-6">
            <p className="text-xl font-medium mt-10 ">
              Selamat datang di Airbnb
            </p>
            <form
              action=""
              className="space-y-3 mt-6"
              onSubmit={handleSubmit(handleLogin)}
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
              <Button
                isLoading={isLoading}
                className={
                  "w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium"
                }
              >
                <span>Lanjutkan</span>
              </Button>
            </form>
          </div>
          <LineWithCenteredText>atau</LineWithCenteredText>
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

export default LoginModal;
