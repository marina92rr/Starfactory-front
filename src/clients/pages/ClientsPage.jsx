import React, { useEffect } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'
import { ClientAddNew, ClientModal } from '../components';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';


export const ClientsPage = () => {


  const { clients, starLoadingClients } = useClientsStore();

  //Llamar a los eventos
  useEffect(() => {
    starLoadingClients();
  }, []);


  return (
    <>
      <Navbar />

      <div className='container-fluid p-0' >
        <div className='row w-100"' >

          <Sidebar />

          <div className='col-10 p-4'>
            <div className='p-4 flex-grow-1'>
              <h1 className='text-start mb-3'>Clientes</h1>

              <ClientModal />
              <ClientAddNew />
            </div>

            <div className='d-flex'>
              <div className='form-floating p-0 mb-2'>
                <input className="form-control" type="type" id="selectAll" placeholder='Buscar cliente' />
              </div>

            </div>
            <div className="border rounded-top br-3 d-flex align-items-center p-3 bg-light">
              <input className="form-check-input ms-3" type="checkbox" id="selectAll" />
              <label className="form-check-label ms-2" htmlFor="selectAll">
                Seleccionar
              </label>
            </div>

            <div className="d-flex flex-column">
              {clients.map((client, i) => {
                const fullName = `${client.name} ${client.lastName}`.toUpperCase();
                return (
                  <div key={i} className="border p-3 text-start">
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id={`client-${i}`} />
                      <label className="form-check-label fw-bold ms-2" htmlFor={`client-${i}`}>
                        {fullName}
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
        </div>
      </div>
    </>

  );
};

export default ClientsPage;
