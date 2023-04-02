import { useState } from "react";
import Modal from "../components/Modal";
import RegisterModal from "../components/modals/RegisterModal";

export default function IndexPage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="" >
      <Modal isOpen={isRegister} onClose={() => setIsRegister(false)}  transition={{
        enter: "transition-all duration-500",
        enterFrom: "opacity-0 translate-y-full",
        enterTo : "opacity-1 translate-y-0",
        leave: "transition-all duration-500",
        leaveFrom : "opacity-1 translate-y-0",
        leaveTo : "opacity-0 translate-y-full"

      }}>
        <Modal.Body>
          <RegisterModal/>
        </Modal.Body>
      </Modal>
    </div>
  );
}
