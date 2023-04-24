import {
  useState,
  useRef,
  memo,
  useEffect,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { AiFillDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
import MediaApi, { signal } from "../../api/services/mediaApi";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { AxiosInstance } from "../../api/services/axiosInstances";

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

const MainImageUploaderContext = createContext({
  setChildDragOver: () => {},
  setter: () => {},
});

function MainImageUpload({ image, setter, maxImage }) {
  const [onDragOver, setDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const [childDragOver, setChildDragOver] = useState(false);
  const [counter, setCounter] = useState(5);
  const main = useRef();

  const validasi = (images) => {
    let result = true;
    images.forEach((image) => {
      if (!validateImage(image)) {
        result = false;
        return;
      }
    });
    return result;
  };

  function handleDrop(ev) {
    const images = [...ev.dataTransfer.files];
    ev.preventDefault();
    if (validasi(images)) {
      const img = images.map((e) => ({
        previewImage: e,
        uploadedImage: null,
      }));
      setter((e) => [...e, ...img]);
      setWrongType(false);
    } else {
      setWrongType(true);
    }
    setDragOver(false);
  }

  const handleChange = (ev) => {
    const images = [...ev.target?.files];
    ev.preventDefault();
    if (validasi(images)) {
      const img = images.map((e) => ({
        previewImage: e,
        uploadedImage: null,
      }));
      setter((e) => [...e, ...img]);
      setWrongType(false);
      return;
    }
    setWrongType(true);
  };

  if (image.length > 0) {
    return (
      <>
        {/* <div className="absolute inset-0">hahah</div> */}

        <div className="flex flex-col gap-3">
          <ImageUploader setImages={setter} image={image[0]} i={0} />
          <div className="flex gap-3">
            <ImageUploader setImages={setter} image={image[1]} i={1} />
            <ImageUploader setImages={setter} image={image[2]} i={2} />
          </div>
          <div className="flex gap-3">
            <ImageUploader setImages={setter} image={image[3]} i={3} />
            <ImageUploader setImages={setter} image={image[4]} i={4} />
          </div>
        </div>
      </>
    );
  }

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
          <div className="flex items-center justify-center relative h-full ">
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
            multiple
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

export default memo(MainImageUpload);

const ImageUploader = ({ setImages, className, i, image }) => {
  const [onDragOver, setOnDragOver] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const controller = useMemo(() => new AbortController(),[image]);
  const main = useRef();
  const {
    mutate,
    isLoading: isUploading,
    reset,
    
  } = useMutation(MediaApi.uploadImage, {
    onSuccess(d) {
      setImages((e) =>
        [...e].map((v, ind) => {
          if (i == ind) {
            return {
              previewImage: v.previewImage,
              uploadedImage: d,
            };
          }
          return v;
        })
      );
    },
  });

  useEffect(() => {
    if (image && !image.uploadedImage) {
      mutate({ media: image.previewImage , controller })
    };
  }, [image]);

  const handleDrop = (ev) => {
    ev.preventDefault();
    if (validateImage(ev.dataTransfer?.files?.item(0))) {
      setImages((e) => [
        ...e,
        {
          previewImage: ev.dataTransfer?.files?.item(0),
          uploadedImage: null,
        },
      ]);
      setWrongType(false);
      return;
    }
  };

  const deleteImage = useCallback((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setImages((e) => [...e].filter((v, ind) => {
      if(i == ind){
        controller.abort();
        v?.uploadedImage?.public_id && MediaApi.deleteImage({pid: v?.uploadedImage?.public_id});
      }
      return i != ind;
    }));
  }, [image ]);

  const handleChange = (ev) => {
    ev.preventDefault();
    if (validateImage(ev.target?.files?.item(0))) {
      setImages((e) => [
        ...e,
        {
          previewImage: ev.target?.files?.item(0),
          uploadedImage: null,
        },
      ]);
      setWrongType(false);
      return;
    }
    setWrongType(true);
  };

  return (
    <div
      className="flex-1 overflow-hidden rounded-md  aspect-video "
      onDragEnter={() => setOnDragOver(true)}
      onDragLeave={() => setOnDragOver(false)}
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={handleDrop}
      onClick={() => main.current?.click()}
    >
      {!image ? (
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
        <div className="h-full w-full bg-gray-50 relative">
          {isUploading && (
            <span className="absolute left-4 top-4 z-10">
              <ClipLoader size={20} />
            </span>
          )}
          <button onClick={deleteImage} className="absolute right-4 hover:bg-transparent hover:text-gray-400 top-4 z-10">
            <AiFillDelete className="w-5 h-5"/>
          </button>
          {image?.uploadedImage?.url ? (
            <img
              src={image?.uploadedImage?.url}
              className="h-full object-scale-down w-full object-center"
              alt=""
            />
          ) : (
            <img
              src={
                image?.previewImage && URL.createObjectURL(image?.previewImage)
              }
              className="h-full blur-sm object-scale-down w-full object-center"
              alt=""
            />
          )}
        </div>
      )}
    </div>
  );
};
