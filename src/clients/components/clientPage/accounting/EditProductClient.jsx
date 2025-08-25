import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useSuscriptionClientStore } from '../../../../hooks/useSuscriptionClientStore';
import{ useProductClientStore } from '../../../../hooks/useProductClientStore';

export const EditProductClient= ({productClient}) => {

  const {openProductClientModal} = useUiStore();
  const {setActiveProductClient} = useProductClientStore(); 

  const handleClickNew = () => {

    setActiveProductClient(productClient); // Reset active quota
    openProductClientModal(); 

  }

  return (
    <div>
        <button 
          className='btn btn-outline-secondary btn-sm '
          onClick={handleClickNew}>
             <i className="bi bi-pencil-square"></i>
        </button>
    </div>
  )
}
