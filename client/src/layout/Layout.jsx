import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
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
import Categories from "../components/organism/Categories";
import { useEffect } from "react";
import axios from "axios";

export default function Layout() {
  const { openLoginModal, openRegisterModal, openAddAirBnbModal } = useSelector(
    (state) => state.modal
  );  
  
  useEffect(()=>{
    async function  d () {
      const user = await axios.get("/api/auth/crntuser ");
      console.log(user)
    }

    d();
  },[])
  const dispatch = useDispatch();
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
        <Header />
        <Categories/>
        <Container>
          <main className="mt-8">
            <Outlet />
          </main>
        </Container>
      </>
    </>
  );
}
