import React from 'react'
import { useQuotaStore } from '../../../hooks/useQuotaStore';

export const QuotaDelete = ({quota}) => {

  const { startDeleteQuota } = useQuotaStore();

  const handleDelete = () => {
    startDeleteQuota(quota);    
    window.location.reload();
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
  
  )
}
