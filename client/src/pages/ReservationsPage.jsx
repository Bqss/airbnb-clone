import React from 'react'
import {Container} from "/src/components/atoms";
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ReservationApi from '/src/api/services/reservationApi';
import {ReservationCard} from '/src/components/molecules';

const ReservationsPage = () => {
  const user = useSelector(state => state.user);
  const {data: reservations, isLoading} = useQuery({
    queryFn : () => ReservationApi.getReservationsByOwnerId({ownerId : user.value.id}),
    queryKey : ['reservations', {ownerId : user.value.id}],
    enabled : Boolean(user.value.id),
  })


  if(isLoading) return <div>Loading...</div>

  return (
    <Container size="xl">
      <div className='grid xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
        {reservations.map(reservation => <ReservationCard type={"owner"} reservationData={reservation} />)}
      </div>
    </Container>
  )
}

export default ReservationsPage