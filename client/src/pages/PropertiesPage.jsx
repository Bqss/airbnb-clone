import React, { useCallback } from "react";
import { Container, ImageComponent, Button } from "/src/components/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import AvenueApi from "/src/api/services/avenueApi";
import { AvenueCard } from "/src/components/molecules";
import toaster from "react-hot-toast"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PropertiesPage = () => {
  const user = useSelector((state) => state.user);
  const {
    data: avenues,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => AvenueApi.getAvenues({ ownerId: user.value.id }),
    enabled: Boolean(user.value.id),
    queryKey: ["reservations", { userId: user.value.id }],
    initialData: [],
  });
  if(isLoading) return <div>Loading...</div>

  return (
    <Container>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {avenues.map((avenue, i) => (
          <PropertiCard data={avenue} key={i} />
        ))}
      </div>
    </Container>
  );
};

const PropertiCard = ({ data }) => {
  const { judul, foto, _id, alamat, harga } = data;
  const { mutate: deleteAvenue, isLoading: isDeletingAvenue } = useMutation({
    mutationFn: AvenueApi.deleteAvenueById,
  });

  const handleDeleteAvenue = useCallback(() => {
    // deleteAvenue({ avenueId: _id },{
    //   onSuccess(){
    //     toaster.success("Berhasil menghapus properti")
    //   }
    // });
    console.log("avenueId : "+_id)
  }, [_id]);

  return (
    <div className="">
      <Link to={`/rooms/${_id}`}>
        <div className="rounded-lg overflow-hidden flex flex-col gap-2 ">
          <ImageComponent
            className="rounded-xl overflow-hidden aspect-square "
            src={foto?.at(0).url}
          />
          <div className="flex flex-col">
            <span>{judul}</span>
            <span className=" font-medium">
              {`${alamat.state}, ${alamat.name}`}
            </span>
            <span>Rp.{harga}</span>
          </div>
        </div>
      </Link>
      <Button
        onClick={handleDeleteAvenue}
        isLoading={isDeletingAvenue}
        className="w-full bg-gradient-to-r mt-3 rounded-xl pointer-events-auto from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white"
      >
        Hapus Properti
      </Button>
    </div>
  );
};

export default PropertiesPage;
