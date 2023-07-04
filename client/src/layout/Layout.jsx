import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header";
import { Toaster, toast } from "react-hot-toast";
import LoginModal from "./../components/modals/LoginModal";
import RegisterModal from "./../components/modals/RegisterModal";
import CreateNewBnbModal from "./../components/modals/CreateNewBnbModal";
import { useSelector } from "react-redux";
import {
  toggleOpenAddAirbnbModal,
  toggleOpenLoginModal,
  toggleOpenRegisterModal,
} from "./../../src/fitures/modalSlice";
import { useDispatch } from "react-redux";
import Container from "../components/atoms/Container";
import toaster from "react-hot-toast";
import Categories from "../components/organism/Categories";
import { useEffect } from "react";
import { setUser } from "../fitures/userSlice";
import UserApi from "../api/services/userApi";
import { useQuery } from "@tanstack/react-query";

export default function Layout() {
  const { openLoginModal, openRegisterModal, openAddAirBnbModal } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryFn: UserApi.getCurrentUser,
    queryKey: ["currentUser"],
    initialData: {},
    retry : 0,
    onSuccess: (data) => {
      dispatch(setUser({ user: data }));
    },
    onError: (data) => {
      dispatch(setUser({ user :{}}));
    },
  });

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
          
        }}
      />
      <LoginModal
        isOpen={openLoginModal}
        onClose={() => dispatch(toggleOpenLoginModal())}
      />
      <RegisterModal
        isOpen={openRegisterModal}
        onClose={() => dispatch(toggleOpenRegisterModal())}
      />
      <CreateNewBnbModal
        isOpen={openAddAirBnbModal}
        onClose={() => dispatch(toggleOpenAddAirbnbModal())}
      />

      <>
        <Header userData={data} />
        <Categories />
        <main className="mt-8">
          <Outlet />
        </main>
      </>
    </>
  );
}
