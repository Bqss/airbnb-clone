import React from 'react'
import { Skeleton } from '../atoms'

const AvenueSkeleton = () => {
  return (
    <div >
      <Skeleton  type='rect' className='rounded-lg mb-3 aspect-square'/>
      <Skeleton  type='rect' height={4} className='mb-2'/> 
      <Skeleton  type='rect' height={3} className='mb-2'/> 
      <Skeleton  type='rect' height={3} width={36}/> 
    </div>
  )
}

export default AvenueSkeleton