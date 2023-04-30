import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import LoginModal from "./../components/modals/LoginModal";
import RegisterModal from "./../components/modals/RegisterModal";
import CreateNewBnbModal from "./../components/modals/CreateNewBnbModal";
import { useSelector } from "react-redux";
import { toggleOpenAddAirbnbModal, toggleOpenLoginModal, toggleOpenRegisterModal } from "./../../src/fitures/modalSlice";
import { useDispatch } from "react-redux";

export default function Layout() {
  const { openLoginModal, openRegisterModal, openAddAirBnbModal } = useSelector(
    (state) => state.modal
  );
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
      <div className="p-4 flex flex-col min-h-screen max-w-7xl mx-auto">
        <Header />
        <main className="mt-20">
          <Outlet />
        </main>
      </div>
    </>
  );
}
