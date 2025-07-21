import { act, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useClientsStore } from '../../hooks/useClientsStore';
import { MenuClient } from '../components/clientPage/MenuClient';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { LabelClient } from '../components/clientPage/LabelClient';
import { LabelsModal } from '../components/label/LabelsModal'
import { Labels } from '../components/label/Labels';
import { SubscribeClient } from '../components/clientPage/SubscribeClient';
import { getClientStatus } from '../../helpers/getClientStatus';
import { useLabelsStore } from '../../hooks/useLabelsStore';
//import { useFilterLabels } from '../../hooks/useFilterLabels';



export const ClientPage = () => {
  // ... dentro de ClientPage:
  const { idClient } = useParams();


  const { starLoadingClientByID, activeClient, activeClientLabels } = useClientsStore();
  const { isImmediateCancellation, isScheduledCancellation, cancelDate } = getClientStatus(activeClient?.dateCancellation);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idClient) {
      setLoading(true);
      starLoadingClientByID().finally(() => setLoading(false));
    }
  }, [idClient]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

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
          {activeClient.name} {activeClient.lastName}
        </h1>
        <div>#{activeClient.idClient}</div>
      </div>
      <div className="d-flex align-items-center gap-3 mt-3">
        {activeClient.email && (
          <div className="d-flex align-items-center">
            <i className="bi bi-envelope-fill me-2"></i>
            <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
              {activeClient.email}
            </button>
          </div>
        )}

        {activeClient.mainPhone && (
          <div className="d-flex align-items-center">
            <i className="bi bi-telephone-fill me-2"></i>
            <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
              {activeClient.mainPhone}
            </button>
          </div>
        )}
        </div>
        <div className='w-100 h-30 d-flex  mt-2'>

          {isImmediateCancellation && <p className="bg-danger rounded text-white fw-bold ms-auto">De baja</p>}
          {isScheduledCancellation && <p className="bg-warning rounded text-white fw-bold ms-auto">Baja programada: {cancelDate.toLocaleDateString()}</p>}
        </div>
        <div className="d-flex justify-content-between align-items-start flex-wrap mt-2">

          <LabelsModal idClient={activeClient.idClient} />
          <Labels idClient={activeClient.idClient} />
          {/* IZQUIERDA: Etiquetas */}
          <div className="d-flex flex-wrap align-items-center gap-2" style={{ minHeight: '42px' }}>


            <ul className="d-flex gap-2 list-unstyled m-0 p-0">
              {activeClientLabels.map(label => (
                <li key={label.idLabel}>
                  <span
                    className="badge rounded-pill fw-semibold"
                    style={{
                      backgroundColor: label.color,
                      color: '#222',
                      fontSize: '1rem',
                      padding: '8px 18px',
                      minWidth: 'fit-content',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {label.name}
                  </span>
                </li>
              ))}
            </ul>

          </div>

          {/* DERECHA: Botones de acción */}
          <div className="d-flex gap-2 mt-2 mt-lg-0">
            <button
              className="btn btn-success" type="button"
              style={{ background: '#38b647', color: 'white' }}
              onClick={() => handleSelect(activeClient.idClient)}>
              Nueva venta
            </button>
            <SubscribeClient idClient={activeClient.idClient} />
          </div>

        </div>

        <MenuClient />
        <Outlet />
      </div>
      );
}
