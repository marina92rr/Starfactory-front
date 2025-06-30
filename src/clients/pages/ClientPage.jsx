import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useClientsStore } from '../../hooks/useClientsStore';
import { MenuClient } from '../components/clientPage/MenuClient';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { LabelClient } from '../components/clientPage/LabelClient';
import { LabelsModal} from '../components/label/LabelsModal'
import {  Labels } from '../components/label/Labels';
import { UnSubscribeClient } from '../components/clientPage/UnSubscribeClient';
import { ProgramUnSubscribe } from '../components/clientPage/ProgramUnSubscribe';



export const ClientPage = () => {


  const { idClient } = useParams();
  const { starLoadingClientByID, activeClient} = useClientsStore();
  const navigate = useNavigate();


  useEffect(() => {
    starLoadingClientByID(); 
  }, []);

  if (!activeClient) {
    return <p>Cliente no encontrado</p>;
  }


const handleSelect = idClient => {
  navigate('addSales');
};


  return (
    <div className="container-fluid col-7 mt-5 pt-5">
      <div className="d-flex">
        <h1 className="me-3">
          {activeClient.name.toUpperCase()} {activeClient.lastName.toUpperCase()}
        </h1>
        <div>{activeClient.idClient}</div>
      </div>
      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="d-flex align-items-center">
          <i className="bi bi-envelope-fill me-2 "></i>
          <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
            {activeClient.email}
          </button>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-telephone-fill me-2"></i>
          <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
            {activeClient.mainPhone}
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start flex-wrap mt-2">

    <LabelsModal idClient={activeClient.idClient} />
        {/* IZQUIERDA: Etiquetas */}
        <div className="d-flex flex-wrap align-items-center gap-2" style={{ minHeight: '42px' }}>
          <LabelClient idClient={activeClient.idClient}  />
          <Labels/>

        </div>

        {/* DERECHA: Botones de acción */}
        <div className="d-flex gap-2 mt-2 mt-lg-0">
        <button 
          className="btn btn-success" type="button"
          style={{ background: '#38b647', color: 'white' }} 
          onClick={() => handleSelect(activeClient.idClient)}>
            Nueva venta
          </button>
          <ProgramUnSubscribe/>
          <UnSubscribeClient/>
        </div>

      </div>

      <MenuClient />
      <Outlet />
    </div>
  );
}
