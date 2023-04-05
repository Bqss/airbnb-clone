import RegisterModal from "../components/modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../components/modals/LoginModal";
import {
  toggleOpenLoginModal,
  toggleOpenRegisterModal,
  toggleOpenAddAirbnbModal,
} from "../fitures/modalSlice";
import Content from "../components/Content";
import CreateNewBnbModal from "../components/modals/CreateNewBnbModal"; 

export default function IndexPage() {
  const { openLoginModal, openRegisterModal, openAddAirBnbModal } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();

  return (
    <>
      <LoginModal isOpen={openLoginModal} onClose={() => dispatch(toggleOpenLoginModal())}/>
      <RegisterModal isOpen={openRegisterModal} onClose={() => dispatch(toggleOpenRegisterModal())}/>
      <CreateNewBnbModal isOpen={openAddAirBnbModal} onClose={() => dispatch(toggleOpenAddAirbnbModal())}/>
      <Content/>
    </>
  );
}
