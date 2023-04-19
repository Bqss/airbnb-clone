import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
import { AxiosInstance } from "../../api/services/axiosInstances";
import {useMutation} from "react-query";
import MediaApi from "./../../api/services/mediaApi";

const ImageUploader = ({image , setImage}) => {
  const [onDragOver, setDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const {data, mutate, isLoading: isUploading} = useMutation(MediaApi.uploadImage)
  const main = useRef();

  useEffect(()=>{
    // mutate(image);
    if(image) mutate(image);
    
  },[image, setImage])

  const imageType = [
    "image/png",
    "image/svg",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ];

  const validateImage = (image) => {
    let result = false;
    imageType.forEach((imageType) => {
      if (image?.type == imageType) {
        result = true;
        return;
      }
    });
    return result;
  };

  function handleDrop(ev) {
    ev.preventDefault();
    if (validateImage(ev.dataTransfer.files[0])) {
      setImage(e => [...e, ev.dataTransfer.files[0]] );
      setWrongType(false);
      return;
    }
    setWrongType(true);
  }
  const handleChange = (ev) => {
    ev.preventDefault();
    if (validateImage(ev.target?.files?.item(0))) {
      setImage(e => [...e, ev.target.files[0]] );
      setWrongType(false);
      return;
    }
    setWrongType(true);
  };

  return (
    <div
      className="flex-1 overflow-hidden rounded-md  aspect-video "
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDragOver={(ev) => ev.preventDefault()}
      onClick={() => main.current.click()}
      onDrop={handleDrop}
    >
      {! image  ? (
        <div
          className={
            "w-full pointer-events-none relative  h-full rounded-sm border  border-dotted hover:cursor-pointer " +
            (onDragOver
              ? " bg-gray-100   border-black"
              : wrongType
              ? " border-red-600 bg-red-800/10"
              : " border-gray-500 hover:border-solid hover:border-black")
          }
        >
          <div className="flex items-center justify-center h-full ">
            <div className="flex gap-2 relative items-center space-y-2 flex-col">
              {wrongType && (
                <span className="text-red-500 absolute text-sm md:text-base -top-10 block mb-2">
                  Image Format is unsupport !!
                </span>
              )}
              <IoImageOutline className="w-8 h-8" />
            </div>
          </div>

          <input
            type="file"
            name="image"
            className="w-0 h-0"
            id=""
            ref={main}
            accept={imageType.join(",")}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="h-full w-full bg-gray-50">
          <img src={URL.createObjectURL(image)} className="h-full blur-[2px] object-scale-down w-full object-center" alt="" />
        </div>
      )}
    </div>
  );
};

export default memo(ImageUploader);
