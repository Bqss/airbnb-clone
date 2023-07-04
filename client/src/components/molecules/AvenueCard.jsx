import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ImageComponent, Carousel, Button } from "/src/components/atoms";
import {toggleOpenLoginModal} from "./../../fitures/modalSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toaster from "react-hot-toast";
import AvenueApi from "../../api/services/avenueApi";
import { useDispatch, useSelector } from "react-redux";

const AvenueCard = ({ data }) => {
  const { value } = useSelector(state => state.user);
  const dispatch = useDispatch ();
  const queryClient = useQueryClient();
  const { mutate : addToFavorite } = useMutation({
    mutationFn: AvenueApi.addToFavorite,
    onError(err) { if (err.response.status < 500) {
      dispatch(toggleOpenLoginModal());
      toaster.error("Unauthorized , you must login first")  
      refetch({})  
    }},
    onSuccess() { toaster.success("Added to favorite"); queryClient.refetchQueries({
      refetchPage : (page, index) =>  page.data.filter(avenue => avenue._id === data._id).length > 0
    })}
  });
  const { mutate : removeFromFavorite } = useMutation({
    mutationFn: AvenueApi.removeFromFavorite,
    onSuccess() { toaster.success("Removed from favorite"); queryClient.refetchQueries({
      refetchPage : (page, index) =>  page.data.filter(avenue => avenue._id === data._id).length > 0
    })}
  });
  const handleAddToFavorite = useCallback((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    addToFavorite({ userId: value.id, avenueId: data._id })
  },[data, value]); 
  const handleRemoveFromFavorite = useCallback((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    removeFromFavorite({ userId: value.id, avenueId: data._id })
  },[data, value]); 

  const isMyFav = useMemo(()=>data?.favourites?.includes(value?.id),[data, value]);



  return (
    <Link className="block relative overflow-hidden rounded-lg " to={`/rooms/${data._id}`}>
      <Carousel total={data.foto.length}>
        <div className="flex pointer-events-none absolute inset-x-0 z-[5] justify-end p-1">
          <Button onClick={!isMyFav ? handleAddToFavorite : handleRemoveFromFavorite} className={`${ isMyFav ? 'fill-pink-600': 'fill-gray-800/50' } px-0 py-0 pointer-events-auto hover:bg-inherit text-white`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Button>
        </div>

        {data.foto.map((foto, i) => (
          <Carousel.Panel i={i} key={i}>
            <ImageComponent imageFit="cover" src={foto.url} alt={foto.name} key={i} />
          </Carousel.Panel>
        ))}
      </Carousel>
      <div className="flex flex-col gap-[.5] pt-4 px-1">
        <span className=" font-medium">
          {`${data.alamat.state}, ${data.alamat.name}`}
        </span>
        <span className="text-gray-500">Berjarak ... km</span>
        <span className="text-gray-500">{`Rp.${data.harga}/ malam`}</span>
      </div>
    </Link>
  );
};

export default AvenueCard;
