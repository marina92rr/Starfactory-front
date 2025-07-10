import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useUiStore } from '../../../../hooks/useUiStore';
import { useProductStore } from '../../../../hooks/useProductStore';
import { useQuotaStore } from '../../../../hooks/useQuotaStore';
import { useClientsStore } from '../../../../hooks/useClientsStore';


 const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const TransactModalSales = () => {

    const { isModalSaleOpen, closeSaleModal } = useUiStore();
    const { activeProduct} = useProductStore();
    const {activeQuota} = useQuotaStore();
    const {activeClient} = useClientsStore();

    const [paymentMethod, setpaymentMethod] = useState();

   
   
   

  return (
    <Modal
          isOpen={isModalSaleOpen}
          onRequestClose={closeSaleModal}
          style={customStylesModal}
          contentLabel='Tramitar Venta' >

            <h3>Liquidar deuda</h3>
            <hr/>
            <form>
                
            </form>
        
    </Modal>
  )
}
