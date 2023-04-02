import { useState } from "react";
import Modal from "../components/Modal";
import RegisterModal from "../components/modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenRegisterModal } from "../fitures/modalSlice";

export default function IndexPage() {
  const {openLoginModal, openRegisterModal} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return (
    <div className="" >
      <RegisterModal isOpen={openRegisterModal} onClose={() => dispatch(toggleOpenRegisterModal())}/>
    </div>
  );
}
