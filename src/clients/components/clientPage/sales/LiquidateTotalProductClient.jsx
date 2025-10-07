import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import{ useProductClientStore } from '../../../../hooks/useProductClientStore';

export const LiquidateTotalProductClient= () => {

  const {openProductClientUnpaidModal} = useUiStore();
  const {setActiveProductClient} = useProductClientStore(); 

  const handleClickNew = () => {
    setActiveProductClient(ac)
    openProductClientUnpaidModal(); 

  }

  return (
    <div>
        <button 
          className='btn btn-outline-secondary btn-sm me-2'
          onClick={handleClickNew}>
             Liquidar total
        </button>
    </div>
  )
}
