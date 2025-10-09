import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import{ useProductClientStore } from '../../../../hooks/useProductClientStore';

export const LiquidateTotalProductClientUnpaid= ({productsClientUnpaid}) => {

  const {openTotalProductClientUnpaidModal} = useUiStore();
  const {setActiveProductClient} = useProductClientStore(); 

  const handleClickNew = () => {
    setActiveProductClient(productsClientUnpaid)
    openTotalProductClientUnpaidModal(); 

  }

  return (
    <div>
        <button 
          className='btn btn-outline-secondary btn-sm me-2'
          onClick={handleClickNew}>
             Liquidar
        </button>
    </div>
  )
}
