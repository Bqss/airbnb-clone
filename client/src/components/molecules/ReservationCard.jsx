import React, { memo, useCallback } from "react";
import {  Button } from "/src/components/atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AvenueApi from "/src/api/services/avenueApi";
import ReservationApi from "/src/api/services/ReservationApi";
import toaster from "react-hot-toast"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageComponent } from "../atoms";

const ReservationCard = ({ reservationData, type }) => {
  if (type == "owner") {
    return <ReservationCardOwner reservationData={reservationData} />;
  }

  if (type == "client") {
    return <ReservationCardClient reservationData={reservationData} />;
  }
};

const ReservationCardOwner = ({ reservationData }) => {
  const { userId, _id, ownerId, listingId, startDate, endDate, totalprice } =
    reservationData;

  const queryClient = useQueryClient();
  const {
    data: avenueDetail,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => AvenueApi.getAvenueById({ avenueId: listingId }),
    enabled: Boolean(listingId),
    queryKey: ["avenue", listingId],
    initialData: {},
  });

  const { mutate: deleteReservation, isLoading: isDeletingReservation } = useMutation({
    mutationFn: ReservationApi.deleteReservationById
  });
  const handleDeleteReservation = useCallback(() => {
    deleteReservation({
      reservationID: _id
    },{
      onSuccess : (d) => { 
        queryClient.invalidateQueries(["reservations",{ownerId}]);
        toaster.success(d.message)
      }
    })
  },[_id, ownerId])

  const { foto, judul } = avenueDetail;

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Link to={`/my-reservations/${_id}`}>
        <div className="rounded-lg overflow-hidden flex flex-col gap-2 ">
          <ImageComponent
            className="rounded-xl overflow-hidden aspect-square "
            src={foto?.at(0).url}
          />
          <div className="flex flex-col">
            <span>{judul}</span>
            <p className="text-sm text-gray-500">
              <span>{new Date(startDate).toLocaleDateString()}</span> -{" "}
              <span>{new Date(endDate).toLocaleDateString()}</span>
            </p>
            <span className="mt-1 font-medium">{"Rp. " + totalprice}</span>
          </div>
        </div>
      </Link>
      <Button onClick={handleDeleteReservation} isLoading={isDeletingReservation} className="w-full bg-gradient-to-r mt-2 rounded-xl pointer-events-auto from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white">
        Batalkan Pesanan Client
      </Button>
    </div>
  );
};

const ReservationCardClient = ({ reservationData }) => {
  const { userId, _id, ownerId, listingId, startDate, endDate, totalprice } =
    reservationData;

    const queryClient = useQueryClient();
  
  const {
    data: avenueDetail,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => AvenueApi.getAvenueById({ avenueId: listingId }),
    enabled: Boolean(listingId),
    queryKey: ["avenue", listingId],
    initialData: {},
  });
  const { mutate: deleteTrip, isLoading: isDeletingTrip } = useMutation({
    mutationFn: ReservationApi.deleteReservationById
  });

  const { foto, judul } = avenueDetail;

  const handleDeleteReservation = useCallback(() => {
    deleteTrip({
      reservationID: _id
    },{
      onSuccess : (d) => { 
        queryClient.invalidateQueries(["reservations",{userId}]);
        toaster.success(d.message)
      }
    })
  },[_id, userId])

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Link to={`/my-reservations/${_id}`}>
        <div className=" flex flex-col gap-2 ">
          <Image
            className="rounded-xl overflow-hidden aspect-square "
            src={foto?.at(0).url}
          />
          <div className="flex flex-col">
            <span>{judul}</span>
            <p className="text-sm text-gray-500">
              <span>{new Date(startDate).toLocaleDateString()}</span> -{" "}
              <span>{new Date(endDate).toLocaleDateString()}</span>
            </p>
            <span className="mt-1 font-medium">{"Rp. " + totalprice}</span>
          </div>
        </div>
      </Link>
      <Button onClick={handleDeleteReservation} isLoading={isDeletingTrip} className="w-full bg-gradient-to-r mt-2 rounded-xl pointer-events-auto from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white">
        Batalkan Pesanan
      </Button>
    </div>
  );
};

export default memo(ReservationCard);
