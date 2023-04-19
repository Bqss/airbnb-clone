import { useState, useRef, memo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
import ImageUploader from "./ImageUploader";

function MainImageUpload({ setter }) {
  const [onDragOver, setDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const [image, setImage] = useState([]);
  const main = useRef();

  const imageType = [
    "image/png",
    "image/svg",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ];
  
  const validateImage = (images) => {
    let result = false;
    [...images]?.forEach((img) => {
      if (imageType.includes(img?.type)) {
        result = true;
        return;
      }
    });
    return result;
  };

  function handleDrop(ev) {
    ev.preventDefault();
    console.log(ev.dataTransfer.files);
    if (validateImage(ev.dataTransfer.files)) {
      setWrongType(false);
      setImage([...ev.dataTransfer.files]);
    }else{
      setWrongType(true);
    }
    setDragOver(false);

  }
  const handleChange = (ev) => {
    ev.preventDefault();
    if (validateImage(ev.target?.files)) {
      setImage([...ev.target?.files]);
      setWrongType(false);
      return;
    }
    setWrongType(true);
  };

  if (!image.length > 0) {
    return (
      <div
        className="flex-1 rounded-md  aspect-square "
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className={
            "w-full pointer-events-none relative text-center h-full rounded-sm border-2 border-dotted" +
            (onDragOver
              ? " bg-gray-100   border-black"
              : wrongType
              ? " border-red-600 bg-red-800/10"
              : " border-gray-500")
          }
        >
          <>
            <div className="flex items-center justify-center h-full ">
              <div className="flex gap-2 relative items-center space-y-2 flex-col">
                {wrongType && (
                  <span className="text-red-500 absolute text-sm md:text-base -top-10 block mb-2">
                    Image Format is unsupport !!
                  </span>
                )}
                <IoImagesOutline className="w-12 h-12" />
                <span className="text-xl w-full  md:text-lg  ">
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
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ImageUploader image={image[0]} setImage={setImage}/>
      <div className="flex gap-3">
        <ImageUploader image={image[1]} setImage={setImage}/>
        <ImageUploader image={image[2]} setImage={setImage}/>
      </div>
      <div className="flex gap-3">
        <ImageUploader image={image[3]} setImage={setImage}/>
        <ImageUploader image={image[4]} setImage={setImage}/>
      </div>
    </div>
  );
}

const ResultImage = () => {};

export default memo(MainImageUpload);
