import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useClientsStore } from '../../hooks/useClientsStore';
import { MenuClient } from '../components/clientPage/MenuClient';

import { LabelModal } from '../components/label/LabelModal';
import { useLabelsStore } from '../../hooks/useLabelsStore';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LabelClient } from '../components/clientPage/LabelClient';



export const ClientPage = () => {
  //Modal etiquetas
  const [showModal, setShowModal] = useState(false);
  const { createLabelAndAssign } = useLabelsStore();
  const [refreshKey, setRefreshKey]   = useState(0);            // <-- nuevo

  const { dni } = useParams();
  const {starLoadingClientByDNI,activeClient,} = useClientsStore();


  useEffect(() => {
    if (dni) {
      starLoadingClientByDNI(dni);
    }
  }, [dni, starLoadingClientByDNI]);

  if (!activeClient) {
    return <p>Cliente no encontrado</p>;
  }



  const handleCreate = async(label) => {
    createLabelAndAssign({
      ...label,               // name, description, color
      dni: activeClient.dni   // debes tenerlo en contexto
    });
    setShowModal(false);
    setRefreshKey(k => k + 1);    // <-- incrementamos al crear
  };


  return (
    <div className="container-fluid col-9 mt-5 pt-5">
      <div className="d-flex">
        <h1 className="me-3">
          {activeClient.name} {activeClient.lastName}
        </h1>
        <div>{activeClient.idClient}</div>
      </div>
      <div className="d-flex justify-content-start mt-3">
        <i className="bi bi-envelope-fill me-2"></i>

        <button type='button' className="btn btn-link">{activeClient.email}</button>
        <i className="bi bi-telephone-fill me-2" ></i>
        <button type='button' className="btn btn-link">{activeClient.mainPhone}</button>
      </div>
      <div className="d-flex justify-content-between align-items-start flex-wrap mt-2">

        {/* IZQUIERDA: Etiquetas */}
        <div className="d-flex flex-wrap align-items-center gap-2" style={{ minHeight: '42px' }}>
          <LabelClient dni={dni} refreshKey={refreshKey}/>

          <button
            className="btn btn-outline-dark btn-sm py-0"
            style={{ borderRadius: '25px', fontSize: '1rem' }}
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-pencil-square me-2"></i>
            Etiquetas
          </button>

          {showModal && (
            <LabelModal
              onCreate={handleCreate}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>

        {/* DERECHA: Botones de acción */}
        <div className="d-flex gap-2 mt-2 mt-lg-0">
          <button className="btn" type="button" style={{ background: '#38b647', color: 'white' }}>Nueva Venta</button>
          <button className="btn btn-outline-danger" type="button">Programar baja</button>
          <button className="btn btn-danger" type="button">Dar baja</button>
        </div>

      </div>

      <MenuClient />
      <Outlet />
    </div>
  );
}
