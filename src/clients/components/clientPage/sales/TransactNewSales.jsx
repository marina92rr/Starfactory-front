
import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'


export const TransactNewSales = () => {

    const {openSaleModal} = useUiStore();


    const handleClickNew = () =>{
        
        openSaleModal();
    }

  return (
     <button
      className="btn mx-auto"
      style={{ background: '#38b647', color: 'white' }}
      onClick={handleClickNew}>
      Tramitar Venta
    </button>
  )
}
