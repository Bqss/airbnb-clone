import React from 'react'
import {Container} from "/src/components/atoms";
import {useQuery} from "@tanstack/react-query";
import ReservationApi from "/src/api/services/reservationApi";
import { useSelector } from 'react-redux';

const TripsPage = () => {
  const user = useSelector(state => state.user);
  const {data: reservations, isLoading} = useQuery({
    queryFn : () => ReservationApi.getReservationsByUserId({userId : user.value.id}),
    queryKey : ["reservations",{userId : user.value.id}],
    enabled: Boolean(user.value.id)
  });
  return (
    <Container size="md">
      <div>TripsPage</div>
    </Container>
  )
}

export default TripsPage