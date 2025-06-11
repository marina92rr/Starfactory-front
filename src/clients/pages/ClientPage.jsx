import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useClientsStore } from '../../hooks/useClientsStore';
import { MenuClient } from '../components/clientPage/MenuClient';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { LabelClient } from '../components/clientPage/LabelClient';
import {LabelsModal} from '../components/label/LabelsModal'
import { LabelAddNew } from '../components/LabelAddNew';


export const ClientPage = () => {


  const { dni } = useParams();
  const { starLoadingClientByDNI, activeClient} = useClientsStore();
  const navigate = useNavigate();


  useEffect(() => {
    starLoadingClientByDNI(); 
  }, []);

  if (!activeClient) {
    return <p>Cliente no encontrado</p>;
  }


const handleSelect = dni => {
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

    <LabelsModal dni={dni} />
        {/* IZQUIERDA: Etiquetas */}
        <div className="d-flex flex-wrap align-items-center gap-2" style={{ minHeight: '42px' }}>
          <LabelClient dni={dni}  />
          <LabelAddNew/>

        </div>

        {/* DERECHA: Botones de acción */}
        <div className="d-flex gap-2 mt-2 mt-lg-0">


        <button className="btn btn-success" type="button"
        style={{ background: '#38b647', color: 'white' }} onClick={() => handleSelect(activeClient.dni)}>Nueva venta</button>
          <button className="btn btn-outline-danger" type="button">Programar baja</button>
          <button className="btn btn-danger" type="button">Dar baja</button>
        </div>

      </div>

      <MenuClient />
      <Outlet />
    </div>
  );
}
