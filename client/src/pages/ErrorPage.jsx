import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
      <h3 className="font-bold text-3xl text-gray-600">An Error Has Encoured</h3>
      <p className='text-gray-600 text-lg mt-1 '>Try to reload the page</p>
      <Button onClick={() => navigate('/', {replace: true})} className={"mt-4 bg-red-500 rounded-lg text-white font-medium hover:bg-red-400"}>Reload</Button>
    </div>  
  )
}

export default ErrorPage