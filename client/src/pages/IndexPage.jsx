import { useState } from "react";
import Modal from "../components/Modal";
import RegisterModal from "../components/modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenLoginModal, toggleOpenRegisterModal } from "../fitures/modalSlice";
import LoginModal from "../components/modals/LoginModal";

export default function IndexPage() {
  const { openLoginModal, openRegisterModal } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  return (
    <>
      <RegisterModal
        isOpen={openRegisterModal}
        onClose={() => dispatch(toggleOpenRegisterModal())}
      />
      <LoginModal
        isOpen={openLoginModal}
        onClose={() => dispatch(toggleOpenLoginModal())}
      />
      <div className=""></div>
    </>
  );
}
