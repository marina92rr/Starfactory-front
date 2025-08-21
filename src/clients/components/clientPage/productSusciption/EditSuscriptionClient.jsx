import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useSuscriptionClientStore } from '../../../../hooks/useSuscriptionClientStore';

export const EditSuscriptionClient= ({suscription}) => {

  const {openSuscriptionClientModal} = useUiStore();
  const {setActiveSuscriptionClient} = useSuscriptionClientStore();

  const handleClickNew = () => {

    setActiveSuscriptionClient(suscription); // Reset active quota
    openSuscriptionClientModal(); 

  }

  return (
    <div>
        <button 
          className='btn btn-outline-secondary btn-sm'
          onClick={handleClickNew}>
             <i className="bi bi-pencil-square"></i>
        </button>
    </div>
  )
}
