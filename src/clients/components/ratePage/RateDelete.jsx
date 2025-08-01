import React from 'react'
import { useRateStore } from '../../../hooks/useRateStore';

export const RateDelete = () => {

  const { startDeleteRate, activeRate } = useRateStore();

  const handleDelete = () => {
    const confirmDelete = window.confirm(`¿Estás seguro de querer eliminar La tarifa ${activeRate.name}?`);
    if(!confirmDelete) return ;
    startDeleteRate(activeRate); 
   
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            Eliminar
        </button>
  
  )
}
