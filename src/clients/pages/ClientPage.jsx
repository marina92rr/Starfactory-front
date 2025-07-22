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
import { capitalizeFirstWord } from '../../helpers/capitalizeFirstWord';
import { isColorDark } from '../../helpers/isColorDark';
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
    <div className="m-5">
      <h1 className='pt-5'>
        {activeClient.name} {activeClient.lastName}
        <span
          className="text-secondary ms-2"
          style={{
            fontSize: '0.6em',
            verticalAlign: 'baseline',
            position: 'relative',
            top: '0.05em'
          }}
        >
          #{activeClient.idClient}
        </span>
      </h1>
      <div className="d-flex align-items-center gap-3 mt-3">
        {activeClient.email && (
          <div className="d-flex align-items-center">
            <i className="bi bi-envelope-fill me-2 text-secondary "></i>
            <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
              {activeClient.email.toLowerCase()}
            </button>
          </div>
        )}

        {activeClient.mainPhone && (
          <div className="d-flex align-items-center">
            <i className="bi bi-telephone-fill me-2 text-secondary"></i>
            <button type="button" className="btn btn-link p-0 m-0 text-decoration-none">
              {activeClient.mainPhone}
            </button>
          </div>
        )}
      </div>
      <div className='w-100 d-flex '>

        {isImmediateCancellation && <p className="bg-danger rounded text-white fw-bold ms-auto">De baja</p>}
        {isScheduledCancellation && <p className="text-secondary rounded ms-auto">Baja programada: {cancelDate.toLocaleDateString()}</p>}
      </div>
      <div className="d-flex justify-content-between align-items-start flex-wrap mt-2">
        {/* IZQUIERDA: Etiquetas */}
        <div className="d-flex flex-wrap align-items-center gap-2" >
          <LabelsModal idClient={activeClient.idClient} />
          <Labels idClient={activeClient.idClient} />
          <ul className="d-flex gap-2 list-unstyled m-0 p-0">
            {activeClientLabels.map(label => {
              const isDark = isColorDark(label.color); 
              const textColor = isDark ? '#fff' : '#222';
              return (
                <li key={label.idLabel}>
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: label.color,
                      color: textColor,              // <-- Color automático según fondo
                      fontSize: '0.75rem',
                      padding: '5px 10px',
                      minWidth: 'fit-content',
                      letterSpacing: '0.01em',
                      borderRadius: '12px',
                      lineHeight: '1.2',
                      marginRight: '4px',
                      fontWeight: 600,               // O el grosor que prefieras
                    }}
                  >
                    {label.name}
                  </span>
                </li>
              );
            })}
          </ul>

        </div>

        {/* DERECHA: Botones de acción */}
        <div className="d-flex gap-2 mt-2 mt-lg-0 align-items-center">
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
