import RegisterModal from "../components/modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../components/modals/LoginModal";
import {
  toggleOpenLoginModal,
  toggleOpenRegisterModal,
  toggleOpenAddAirbnbModal,
} from "../fitures/modalSlice";
import CreateBnb from "../components/modals/CreateNewBnb";

export default function IndexPage() {
  const { openLoginModal, openRegisterModal, openAddAirBnbModal } = useSelector(
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
      <CreateBnb
        isOpen={openAddAirBnbModal}
        onClose={() => dispatch(toggleOpenAddAirbnbModal(false))}
      ></CreateBnb>
      <div className=""></div>
    </>
  );
}
