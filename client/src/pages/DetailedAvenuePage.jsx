import React, { useMemo } from "react";
import Container from "../components/atoms/Container";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AvenueApi from "../api/services/avenueApi";
import Image from "../components/atoms/Image";
import Box from "./../components/atoms/Box";
import { IoMdPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiBed } from "react-icons/bi";
import { MdBathtub } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";

const DetailedAvenuePage = () => {
  const { id } = useParams();
  const { isFetching, isLoading, data } = useQuery({
    queryFn: () => AvenueApi.getAvenue({ id }),
    queryKey: ["avenue", id],
    enabled: Boolean(id),
    initialData: {},
  });

  const {
    foto,
    judul,
    alamat,
    deskripsi,
    available,
    informasiDasar,
    ownerUsername,
    ownerProfilePicture,
  } = useMemo(() => data, [data]);

  if (isLoading || isFetching) {
    return <Container size="md">Loading....</Container>;
  }

  return (
    <Container size="md">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium  text-black">{judul}</h2>
          <Link className="underline mt-1 text-sm">{`${alamat?.name}, ${alamat?.state}, ${alamat?.country} `}</Link>
        </div>
        <div className="space-x-4">
          <button className="text-sm ">Bagikan</button>
          <button className="text-sm ">Simpan</button>
        </div>
      </div>
      <div className="mt-7 rounded-xl relative overflow-hidden  ">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
          {foto?.map((f, i) => {
            if (i == 0) {
              return (
                <div className="row-span-2 col-span-2 h-full">
                  <Image
                    className={
                      "hover:brightness-75 aspect-square transition-all duration-200 cursor-pointer"
                    }
                    src={f.url}
                    alt={f.name}
                  />
                </div>
              );
            }
            return (
              <Image
                className={"hover:brightness-75 aspect-square transition-all duration-200 cursor-pointer"}
                src={f.url}
                alt={f.name}
              />
            );
          })}
        </div>
        <button className="absolute right-3 bottom-3 text-black gap-2 bg-white inline-flex items-center px-3 py-2 rounded-md">
          <CgMenuGridO className="w-5 h-5" />
          <span>Tampilkan Semua foto</span>
        </button>
      </div>
      <div className="mt-10 flex">
        <div className="">
          <div className="flex justify-between">
            <h3 className="text-xl">{`Tuan rumah: ${ownerUsername}`}</h3>
            <img
              src={ownerProfilePicture}
              alt={ownerUsername}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Box>
              <IoMdPeople className="w-7 h-7" />
              <span>{`${informasiDasar?.tamu} jumlah maksimal tamu`}</span>
            </Box>
            <Box>
              <FaBed className="w-7 h-7" />
              <span>{`${informasiDasar?.kamar} jumlah kamar`}</span>
            </Box>
            <Box>
              <BiBed className="w-7 h-7" />
              <span>{`${informasiDasar?.tempatTidur} tempat tidur`}</span>
            </Box>
            <Box>
              <MdBathtub className="w-7 h-7" />
              <span>{`${informasiDasar?.kamarMandi} kamar mandi`}</span>
            </Box>
          </div>
          <div className="mt-5 py-5 border-y border-gray-300">
            <Box>{available}</Box>
          </div>
          <div className="mt-5 ">
            <h3 className="text-xl font-medium">Tentang tempat ini</h3>
            <p className="mt-2 text-gray-600">{deskripsi}</p>
          </div>
          <div className="mt-5 py-5 border-y border-gray-300">
            <h3 className="text-xl font-medium">Fasilitas yang ditawarkan</h3>
            <div></div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </Container>
  );
};

export default DetailedAvenuePage;
