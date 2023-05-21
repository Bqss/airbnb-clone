import React, { useCallback, useMemo, useState } from "react";
import {
  Container,
  Map,
  Image,
  Box,
  UpperlinedDiv,
  Button,
} from "/src/components/atoms";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueries } from "@tanstack/react-query";
import AvenueApi from "../api/services/avenueApi";
import { type as tipe, fasility } from "./../data/index";
import { add, addDays, differenceInDays, eachDayOfInterval } from "date-fns";
import ReservationApi from "./../api/services/reservationApi";
import { IoMdPeople } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toaster from "react-hot-toast";
import { FaBed } from "react-icons/fa";
import { BiBed } from "react-icons/bi";
import { MdBathtub } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { ImagesGallery, DatePicker } from "/src/components/modals";
import { useSelector } from "react-redux";

const DetailedAvenuePage = () => {
  const { id } = useParams();

  const userCrediental = useSelector((state) => state.user);
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [isOpenDatePick, setIsOpenDatePick] = useState(false);
  const { isLoading: isCreatingReservation, mutate: createReservation } =
    useMutation({
      mutationFn: ReservationApi.newReservation,
    });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
    },
  ]);

  const preloadData = useQueries({
    queries: [
      {
        queryFn: () => AvenueApi.getAvenueById({ avenueId : id }),
        enabled: Boolean(id),
        queryKey: ["avenue", id],
        initialData: {},
      },
      {
        queryFn: () =>
          ReservationApi.getReservationsById({ reservationID: id }),
        enabled: Boolean(id),
        queryKey: ["reservation", id],
        initialData: [],
      },
    ],
  });

  const avenueDetail = preloadData[0];
  const avenueReservations = preloadData[1];

  const disabledDates = useMemo(() => {
    let dates = [];
    const mainRange = [new Date().getTime(), addDays(new Date(), 90).getTime()];
    const gap = [];

    avenueReservations.data.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    const ranges = avenueReservations.data
      .map((reservation) => {
        return [
          new Date(reservation.startDate).getTime(),
          new Date(reservation.endDate).getTime(),
        ];
      })
      .sort(([a], [b]) => a - b);

    let [min, max] = mainRange;
    for (const [start, end] of ranges) {
      if (min > max) break;
      if (min < start) {
        if (differenceInDays(addDays(start, -1), min) >= 5) {
          gap.push([min, addDays(min, 5).getTime()]);
          min = addDays(min, 5).getTime();
        } else {
          gap.push([min, addDays(start, -1).getTime()]);
          min = addDays(end, 1).getTime();
        }
      } else {
        min = addDays(end, 1).getTime();
      }
    }
    // end of range
    if (min <= max) {
      gap.push([min, addDays(min, 5).getTime()]);
    }
    const result = gap.filter(([a, b]) => differenceInDays(b, a) >= 5);

    setDate([{
      key: "selection",
      startDate : new Date(result[0][0]),
      endDate : new Date(result[0][1]),
    }])
    return dates;
  }, [avenueReservations.data]);

  const jumlahMalam = useMemo(
    () => differenceInDays(date[0].endDate, date[0].startDate),
    [date]
  );

  const {
    foto,
    judul,
    alamat,
    deskripsi,
    available,
    fasilitas,
    ownerId,
    harga,
    informasiDasar,
    ownerUsername,
    ownerProfilePicture,
  } = avenueDetail.data;

  const type = useMemo(
    () => [...tipe].filter((e) => e.value === available)[0],
    [avenueDetail.data]
  );
  const fasilities = useMemo(() => {
    const filtered =
      fasilitas &&
      Object.entries(fasilitas)
        .filter((e) => {
          return e[1] === true;
        })
        .map((e) => e[0]);
    return fasility.filter(
      (fasility) => filtered?.includes(fasility.value) ?? false
    );
  }, [avenueDetail.data]);

  const handleDateChange = (range) => {
    setDate([{ ...range.selection }]);
  };

  const jumlahHarga = useMemo(() => {
    return jumlahMalam * harga;
  }, [jumlahMalam, harga]);

  const handlePesan = useCallback(
    (ev) => {
      ev.preventDefault();
      if (!userCrediental.value.id) {
        toaster.error("Anda harus login terlebih dahulu");
        return;
      }
      createReservation(
        {
          userId: userCrediental.value.id,
          listingId: id,
          ownerId,
          totalprice: jumlahHarga + (jumlahHarga * 20) / 100,
          endDate: date[0].endDate,
          startDate: date[0].startDate,
        },
        {
          onSuccess: () => {
            toaster.success("Berhasil memesan tempat");
            avenueDetail.refetch();
            avenueReservations.refetch();
          },
        }
      );
    },
    [userCrediental, id, jumlahHarga, date]
  );

  if (
    avenueDetail.isLoading ||
    avenueDetail.isFetching ||
    avenueReservations.isLoading ||
    avenueReservations.isFetching
  ) {
    return <Container size="md">Loading....</Container>;
  }

  return (
    <>
      <ImagesGallery
        open={isOpenGallery}
        images={foto}
        onClose={() => setIsOpenGallery(false)}
      />

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
                  <div className="row-span-2 col-span-2 h-full" key={i}>
                    <Image
                      onClick={() => setIsOpenGallery(true)}
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
                  key={i}
                  onClick={() => setIsOpenGallery(true)}
                  className={
                    "hover:brightness-75 aspect-square transition-all duration-200 cursor-pointer"
                  }
                  src={f.url}
                  alt={f.name}
                />
              );
            })}
          </div>
          <button
            onClick={() => setIsOpenGallery(true)}
            className="absolute right-3 bottom-3 text-black gap-2 bg-white inline-flex items-center px-3 py-2 rounded-md"
          >
            <CgMenuGridO className="w-5 h-5" />
            <span>Tampilkan Semua foto</span>
          </button>
        </div>
        <div className="mt-10 flex gap-10">
          <div className="">
            <div className="flex justify-between">
              <span className="text-xl font-medium">
                {`Tuan Rumah : ${ownerUsername}`}
              </span>
              <img
                src={ownerProfilePicture}
                alt={ownerUsername}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Box className={"px-6 py-6"}>
                <IoMdPeople className="w-7 h-7" />
                <span className="">{`${informasiDasar?.tamu} jumlah maksimal tamu`}</span>
              </Box>
              <Box className={"px-6 py-6"}>
                <FaBed className="w-7 h-7" />
                <span className="">{`${informasiDasar?.kamar} jumlah kamar`}</span>
              </Box>
              <Box className={"px-6 py-6"}>
                <BiBed className="w-7 h-7" />
                <span className="">{`${informasiDasar?.tempatTidur} tempat tidur`}</span>
              </Box>
              <Box className={"px-6 py-6"}>
                <MdBathtub className="w-7 h-7" />
                <span className="">{`${informasiDasar?.kamarMandi} kamar mandi`}</span>
              </Box>
            </div>
            <UpperlinedDiv className={"flex  items-center gap-4"}>
              <div>
                <type.icon className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-medium text-lg">{type.label}</h4>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </UpperlinedDiv>

            <UpperlinedDiv>
              <h3 className="text-xl font-medium">Tentang tempat ini</h3>
              <p className="mt-2 text-gray-600">{deskripsi}</p>
            </UpperlinedDiv>
            <UpperlinedDiv>
              <h3 className="text-xl font-medium">Fasilitas yang ditawarkan</h3>
              <div className="grid grid-cols-3 gap-6 mt-4">
                {fasilities?.map((fasilitas, i) => (
                  <div className="flex gap-2" key={i}>
                    <fasilitas.icon className="w-6 h-6" />
                    <span>{fasilitas.label}</span>
                  </div>
                ))}
              </div>
            </UpperlinedDiv>
            <UpperlinedDiv className={"w-full h-full"}>
              <h3 className="text-xl font-medium mb-5">Lokasi Anda</h3>
              <Map
                zoom={10}
                lokasi={alamat}
                disabled={true}
                center={alamat && [alamat.latitude, alamat.longitude]}
              ></Map>
            </UpperlinedDiv>
            <div className="pb-10"></div>
          </div>
          <div className="basis-96 relative">
            <DatePicker
              isOpen={isOpenDatePick}
              ranges={date}
              disabledDates={disabledDates}
              onReset={() =>
                setDate([
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                  },
                ])
              }
              onChange={handleDateChange}
              onClose={() => setIsOpenDatePick(false)}
            />
            <div className="p-7 rounded-lg shadow-xl">
              <div className="text-sm">
                <span className="font-medium text-2xl">{`Rp.${harga}`}</span>
                /malam
              </div>
              <div className="flex mt-5 flex-col  divide-y-2 divide-gray-300 border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsOpenDatePick(true)}
                  className="flex w-full divide-x-2 divide-gray-300 hover:bg-white border-2 border-transparent active:border-black rounded-lg"
                >
                  <div className="flex-1 px-3 py-2 flex flex-col items-start">
                    <span className="font-medium text-[.7rem]">CHECK-IN</span>
                    <span className="text-sm">
                      {date[0].startDate.getTime() != date[0].endDate.getTime()
                        ? date[0].startDate.toDateString()
                        : "Tambahkan tanggal"}
                    </span>
                  </div>
                  <div className="flex-1 px-3 py-2 flex flex-col items-start">
                    <span className="font-medium text-[.7rem]">CHECK-OUT</span>
                    <span className="text-sm">
                      {date[0].startDate.getTime() != date[0].endDate.getTime()
                        ? date[0].endDate.toDateString()
                        : "Tambahkan tanggal"}
                    </span>
                  </div>
                </button>
                <button className="px-3 py-2 flex border-2 border-transparent flex-col items-start hover:bg-white  active:border-black rounded-lg">
                  <span className="font-medium text-[.7rem]">TAMU</span>
                  <span className="text-sm">{"1 Tamu"}</span>
                </button>
              </div>
              <Button
                className={
                  "w-full mt-7 bg-gradient-to-r from-rose-500 to-rose-600   text-white rounded-lg"
                }
                onClick={handlePesan}
                isLoading={isCreatingReservation}
              >
                <span className="font-medium">Pesan</span>
              </Button>
              {jumlahMalam > 0 && (
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{`Rp.${harga} x  ${jumlahMalam} malam`}</span>
                    <span className="text-gray-600">{`Rp.${jumlahHarga}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Langganan</span>
                    <span className="text-gray-600">{`Rp.${
                      (harga * jumlahMalam * 20) / 100
                    }`}</span>
                  </div>
                  <div
                    className={
                      "flex justify-between border-t-2 border-gray-200 pt-3"
                    }
                  >
                    <span className="font-bold">Total Biaya</span>
                    <span className="font-bold">
                      Rp.
                      {harga * jumlahMalam + (harga * jumlahMalam * 20) / 100}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailedAvenuePage;
