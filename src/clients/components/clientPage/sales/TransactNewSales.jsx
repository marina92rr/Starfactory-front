
import React from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useProductStore } from '../../../../hooks/useProductStore';
import { useQuotaStore } from '../../../../hooks/useQuotaStore';
import { useClientsStore } from '../../../../hooks/useClientsStore';

export const TransactNewSales = () => {

    const {openSaleModal} = useUiStore();
    const { setActiveProduct} = useProductStore();
    const { setActiveQuota} = useQuotaStore();
    const {setActiveClient} = useClientsStore();


    const handleClickNew = () =>{
        setActiveProduct({
            name: '',
            idProduct: 0,
            price: 0,
        })
        setActiveQuota({
            name: '',
            idQuota:0,
            price: 0,
        })

        setActiveClient({ idClient: 0})

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
