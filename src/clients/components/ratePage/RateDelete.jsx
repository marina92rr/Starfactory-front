import React from 'react'
import { useRateStore } from '../../../hooks/useRateStore';

export const RateDelete = () => {

  const { startDeleteRate, activeRate } = useRateStore();

  const handleDelete = () => {
    startDeleteRate(activeRate); 
     window.confirm(`¿Estás seguro de querer eliminar La tarifa ${activeRate.name}?`);
   
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            Eliminar
        </button>
  
  )
}
