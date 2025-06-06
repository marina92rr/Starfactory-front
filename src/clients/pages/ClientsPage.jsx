import { useEffect, useState } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'
import { ClientAddNew, ClientModal } from '../components';
import { useNavigate } from 'react-router-dom';
import { LabelClient } from '../components/clientPage/LabelClient';
import {FindClient} from '../components/FindClient'



export const ClientsPage = () => {

  const navigate = useNavigate();

  const { clients, starLoadingClients } = useClientsStore();

  
  //LCarga de clientes
  useEffect(() => {
    starLoadingClients();
       
  }, []);

  // Cuando seleccionas un cliente, navegamos a /clients/:dni
  const handleSelect = dni => {
    navigate(`${dni}`);
  };
  return (

    <div className='container-fluid col-7 mt-5' >
      <div className='py-5 d-flex justify-content-between align-items-center'>
        <h1 className='col-9 m-0'>Clientes</h1>
        <ClientAddNew />
      </div>
      <ClientModal />
      <div className='d-flex'>
        <div className='form-floating p-0 mb-2 d-flex'>
          <FindClient/>
          
        </div>
      </div>
      <div className="border rounded-top br-3 d-flex align-items-center p-3 bg-light">
        
      </div>

      <div className="d-flex flex-column">
        {clients.map((client, i) => {
          const fullName = `${client.name} ${client.lastName}`.toUpperCase();
          return (
            <div key={i} className="border p-3 text-start">
              <div className="form">
                <ul className="form-input" type="text" id={`client-${i}`} />
                <label
                key={client.dni}
                onMouseDown={() => handleSelect(client.dni)}
                className="form-label-label fw-bold ms-2 d-flex" style={{cursor:"pointer"}} htmlFor={`client-${i}`}>
                 <h5 className='me-3'>{fullName}</h5> 
                  <LabelClient  dni={client.dni}/>
                </label>
              </div>
              <div className='d-flex'>
                <div className='text-secondary ps-3'>{client.email} </div>
                <div className='text-secondary ps-3'>{client.mainPhone}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>


  );
};

export default ClientsPage;
