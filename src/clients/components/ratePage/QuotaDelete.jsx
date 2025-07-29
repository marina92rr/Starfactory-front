import React from 'react'
import { useQuotaStore } from '../../../hooks/useQuotaStore';
import { useRateStore } from '../../../hooks/useRateStore';

export const QuotaDelete = ({quota}) => {

  const { startDeleteQuota, startLoadingQuotasByRate } = useQuotaStore();
  const {activeRate} = useRateStore();
  
  const handleDelete = () => {
    startDeleteQuota(quota);    
    startLoadingQuotasByRate(activeRate._id);
    window.confirm(`¿Estás seguro de querer eliminar la cuota ${quota.name}?`);

  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
  
  )
}
