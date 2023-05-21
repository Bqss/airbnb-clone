import React from 'react'
import {Container} from "/src/components/atoms";
import {useQuery} from "@tanstack/react-query";
import AvenueApi from "/src/api/services/avenueApi";
import { useSelector } from 'react-redux';

const PropertiesPage = () => {
  const user = useSelector(state => state.user); 
  const {} = useQuery({
    queryFn : () => AvenueApi.getAvenues({ownerId : user.value.id}),
    enabled : Boolean(user.value.id),
    initialData : []
  });
  return (
    <Container size="md">
      <div>PropertiesPage</div>
    </Container>
  )
}

export default PropertiesPage