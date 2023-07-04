import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms';

const EmptyState = () => {
  const navigate = useNavigate(); 
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
      <h3 className="font-bold text-3xl text-gray-600">No Avenue Matches</h3>
      <p className='text-gray-600 text-lg mt-1 '>Try Changing or removing some of filter</p>
      <Button onClick={()=> navigate("/")} className={"mt-4 bg-red-500 rounded-lg text-white font-medium hover:bg-red-400"}>Remove all filter</Button>
    </div>  
  )
}

export
 default EmptyState