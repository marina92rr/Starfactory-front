import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useSuscriptionClientStore } from '../../../../hooks/useSuscriptionClientStore';
import{ useProductClientStore } from '../../../../hooks/useProductClientStore';

export const LiquidateProductClient= ({unpaid}) => {

  //const {openSuscriptionClientModal} = useUiStore();
  const {setActiveProductClient} = useProductClientStore(); 

  const handleClickNew = () => {

    setActiveProductClient(unpaid); // Reset active quota
   // openSuscriptionClientModal(); 

  }

  return (
    <div>
        <button 
          className='btn btn-outline-secondary btn-sm me-2'
          onClick={handleClickNew}>
             <i className="bi bi-credit-card"></i>
        </button>
    </div>
  )
}
