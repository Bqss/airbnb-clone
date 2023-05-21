import React from 'react'
import {Container} from "/src/components/atoms";
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ReservationApi from '/src/api/services/reservationApi';

const ReservationsPage = () => {
  const user = useSelector(state => state.user);
  const {data: reservations, isLoading} = useQuery({
    queryFn : () => ReservationApi.getReservationsByOwnerId({ownerId : user.value.id}),
    queryKey : ['reservations', {ownerId : user.value.id}]
  })
  return (
    <Container size="md">
      <div>ReservationsPage</div>
    </Container>
  )
}

export default ReservationsPage