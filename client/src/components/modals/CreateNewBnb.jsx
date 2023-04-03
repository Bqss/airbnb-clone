import React from "react";
import Modal from "../Modal";
import { HiXMark } from "react-icons/hi2";

const CreateBnb = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBnb;
