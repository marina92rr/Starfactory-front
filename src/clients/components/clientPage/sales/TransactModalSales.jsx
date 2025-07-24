import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useUiStore } from '../../../../hooks/useUiStore';
import { useClientsStore } from '../../../../hooks/useClientsStore';
import { useProductClientStore } from '../../../../hooks/useProductClientStore';
import { useNavigate } from 'react-router-dom';
import { SalesClient } from '../SalesClient';
import { useDispatch } from 'react-redux';
import { generateAndSendTicket } from '../../../../hooks/ticketGenerator';

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const TransactModalSales = ({ selectedProducts, totalAmount }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalSaleOpen, closeSaleModal } = useUiStore();
  const { startSavingProductClient } = useProductClientStore();
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')
  const {activeClient} = useClientsStore();


  const productsMapped = selectedProducts.map(item => ({
    name: item.name,
    idProduct: item.idProduct ?? item.idQuota,
    isProduct: item.idProduct ? true : false,
    price:item.price,
    discount:item.discount
  }));

  const handleSubmit = async(e) => {
    e.preventDefault()

     const venta = {
      fecha: new Date(),
      cliente: `${activeClient.name} ${activeClient.lastName}`,
      items: selectedProducts.map(p => ({
        nombre: p.name,
        cantidad: 1, // si tienes cantidad puedes ajustarlo aquí
        precio: p.price - (parseFloat(p.discount) || 0)
      })),
      total: parseFloat(totalAmount)
    };

    const dataToSend = {
      idClient: activeClient.idClient,
      products: productsMapped,
      price: totalAmount,
      paymentMethod: paymentMethod,
      paid: true,
    };

    try {
      // Guardar en la base de datos
      await startSavingProductClient(dataToSend, false);

      // Generar ticket
      await generateAndSendTicket(venta, activeClient.email);

      // Cerrar modal y redirigir
      closeSaleModal();
      navigate(`/${activeClient.idClient}/sales`);
    } catch (error) {
      console.error('Error al tramitar la venta o generar el ticket', error);
    }
  }

  return (
   <Modal
      isOpen={isModalSaleOpen}
      onRequestClose={closeSaleModal}
      style={customStylesModal}
      contentLabel='Tramitar Venta' >

      <h3>Liquidar deuda</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2 className='align-items-center justify-content-center d-flex' style={{ width: 200, height: 200 }}>{totalAmount} €</h2>
        </div>

        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            tramitar venta
          </button>
        </div>
      </form>
    </Modal>
  )
}
