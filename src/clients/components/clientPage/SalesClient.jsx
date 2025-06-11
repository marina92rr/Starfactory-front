
import React from 'react'
import { generateAndSendTicket } from '../../../hooks/ticketGenerator'
import { useClientsStore } from '../../../hooks/useClientsStore';

const venta = {
  fecha: new Date(),
  cliente: 'Jesús',
  items: [
    { nombre: 'Clase Salsa', cantidad: 1, precio: 25 },
    { nombre: 'Clase Bachata', cantidad: 1, precio: 25 }
  ],
  total: 50
};

export const SalesClient = () => {

  const {activeClient} = useClientsStore();


  const handleClick = async() => {
    const venta = {
      fecha: new Date(),
      cliente: 'Jesús',
      items: [
        { nombre: 'Clase Salsa', cantidad: 1, precio: 25 },
        { nombre: 'Clase Bachata', cantidad: 1, precio: 25 }
      ],
      total: 50
    };


    try {
     generateAndSendTicket(venta, activeClient.email);
    console.log('Ticket impreso y enviado por email');
  } catch (error) {
    console.error('Error en el proceso de ticket:', error);
  }
  
  };


  return (
    <button onClick={handleClick} className="btn btn-primary">
      Imprimir Ticket
    </button>
  )
}
