import React from "react";
import Modal from "../molecules/Modal";
import { GrFormPrevious } from "react-icons/gr";
import {Image, Container} from "/src/components/atoms";


const ImagesGallery = ({ open, onClose, images }) => {
  return (
    <Modal
      className={"w-full h-full  bg-white"}
      isOpen={open}
      onClose={onClose}
      closeOnClickOutside={false}
      transition={{
        enter: "transition-all  duration-700",
        enterFrom: "opacity-0 translate-y-full",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition-all  duration-700",
        leaveFrom: "opacity-100 translate-y-0",
        leaveTo: "opacity-0 translate-y-full",
      }}
    >
      <Modal.Body className="w-full h-full flex flex-col">
        <div className="flex  justify-between w-full py-2 px-5">
          <button className="rounded-full p-3" onClick={onClose}>
            <GrFormPrevious className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Container size="sm" className="space-y-4">
            {images?.map((f, i) => (
              <Image src={f.url} key={i} />
            ))}
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImagesGallery;
