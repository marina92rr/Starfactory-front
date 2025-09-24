import React, { useState } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';
import { useUiStore } from '../../hooks/useUiStore';

export const ResendPassword= () => {

  const {openPasswordUserModal} = useUiStore();
 


  const handleClickNew = () => {
  openPasswordUserModal();
  }

  

  return (
    <div>
        <button 
          className='btn btn-link custom-btn'
          onClick={handleClickNew}>
            Olvidé mi contraseña
        </button>
    </div>
  )
}
