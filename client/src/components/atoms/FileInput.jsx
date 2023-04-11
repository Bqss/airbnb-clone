import { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";

function FileInput({ setter, image }) {
  const [onDragOver, setDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const main = useRef();

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
      setWrongType(false);
      return;
    }
    setWrongType(true);
  }
  const handleChange = (ev) => {
    ev.preventDefault();
    if (validateImage(ev.target?.files?.item(0))) {
      uploadImg(ev.target?.files?.item(0));
      setWrongType(false);
      return;
    }
    setWrongType(true);
  };

  return (
    <div
      className="flex-1 p-5 rounded-md  aspect-square lg:max-h-[55vh] "
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={handleDrop}
    >
      <div
        className={
          "w-full pointer-events-none relative  h-full rounded-sm border-2 border-dotted" +
          (onDragOver
            ? " bg-gray-100   border-black"
            : wrongType
            ? " border-red-600 bg-red-800/10"
            : " border-gray-500")
        }
      >
        {!image ? (
          <>
            <div className="flex items-center justify-center h-full ">
              <div className="flex gap-2 relative items-center space-y-2 flex-col">
                {wrongType && (
                  <span className="text-red-500 absolute text-sm md:text-base -top-10 block mb-2">
                    Image Format is unsupport !!
                  </span>
                )}
                <IoImagesOutline className="w-12 h-12" />
                <span className="text-xl md:text-base  ">
                  {onDragOver
                    ? "Drop untuk mengupload gambar"
                    : "Pilih setidaknya 5 foto"}
                </span>
                {!onDragOver && (
                  <button
                    className="bg-gray-300/60 shadow-md py-1 px-3 rounded-md hover:bg-gray-300/100 pointer-events-auto"
                    onClick={() => main?.current?.click()}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
            <div className="px-4 absolute bottom-[5%] z-0 w-full">
              <p className="text-xs md:text-sm text-gray-500 text-center">
                Recomendation, to use high-quality JPG, JPEG, SVG, PNG and less
                than 20MB
              </p>
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
          </>
        ) : (
          <div className="w-full h-full relative p-3 md:p-5">
            <img
              src={image.url}
              alt={image.originalFilename}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute bg-white/50 p-1 rounded-full right-3 bottom-3 pointer-events-auto hover:bg-white "
              onClick={() => deleteImage(image)}
              title="Delete Image"
            >
              <AiFillDelete className="w-5 h-5 " />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileInput;
