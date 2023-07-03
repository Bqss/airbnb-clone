import React from 'react'
import {Container} from "/src/components/atoms";
import {useQuery} from "@tanstack/react-query";
import ReservationApi from "/src/api/services/reservationApi";
import { useSelector } from 'react-redux';
import ReservationCard from '../components/molecules/ReservationCard';

const TripsPage = () => {
  const user = useSelector(state => state.user);
  const {data: trips, isRefetching, isLoading} = useQuery({
    queryFn : () => ReservationApi.getReservationsByUserId({userId : user.value.id}),
    queryKey : ["reservations",{userId : user.value.id}],
    enabled: Boolean(user.value.id),

  });

  if(isRefetching || isLoading) return <div>Loading...</div>
  return (
    <Container size="xl">
      <div className='grid xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
        {trips.map(trip => <ReservationCard type={"client"} reservationData={trip} />)}
      </div>
    </Container>
  )
}

export default TripsPage