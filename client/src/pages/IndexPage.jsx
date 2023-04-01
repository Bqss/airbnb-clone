import { useState } from "react";
import Modal from "../components/Modal";
import RegisterModal from "../components/modals/RegisterModal";

export default function IndexPage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div>
      <Modal className={""} isOpen={isRegister} onClose={() => setIsRegister(false)}  >
        <Modal.Body>
          <RegisterModal/>
        </Modal.Body>
      </Modal>
    </div>
  );
}
