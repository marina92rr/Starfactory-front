import React from 'react'
import { useUiStore } from '../../../hooks/useUiStore'
import { useRateStore } from '../../../hooks/useRateStore';

export const RateEdit= () => {

  const {openRateModal} = useUiStore();
  const {setActiveRate, activeRate} = useRateStore();

  const handleClickNew = () => {
    setActiveRate(activeRate); // Reset active quota
    openRateModal(); 
  }

  return (
    <div>
        <button 
          className='btn btn-secondary mx-2'
          onClick={handleClickNew}>
            Editar
        </button>
    </div>
  )
}
