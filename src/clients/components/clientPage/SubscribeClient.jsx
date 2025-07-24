import React from 'react'
import { ProgramCancelModal } from './ProgramCancelModal ';
import { useClientsStore } from '../../../hooks/useClientsStore';
import { useUiStore } from '../../../hooks/useUiStore';
import { getClientStatus } from '../../../helpers/getClientStatus';

export const SubscribeClient = ({ idClient }) => {

  const { activeClient, toggleClientStatusCancel, starLoadingClientByID, cancelClientScheduledCancellation } = useClientsStore();
  const { openClientModal } = useUiStore();

  const { isActive, isImmediateCancellation, isScheduledCancellation, cancelDate } = getClientStatus(activeClient?.dateCancellation);

  const handleCancelClient = async () => {
    if (!activeClient) return;

    const isCurrentlyCancelled = !!activeClient.dateCancellation;
    const action = isCurrentlyCancelled ? 'dar de alta' : 'dar de baja';
    const confirm = window.confirm(`¿Estás seguro de querer ${action} al cliente?`);

    if (confirm) {
      await toggleClientStatusCancel(idClient);
      await starLoadingClientByID(); // ✅ recarga sin tener que hacer reload
    }
  }

  return (
    <>
      {isImmediateCancellation && (
        <>
          <button className="btn btn-outline-success" onClick={handleCancelClient}>
            Dar alta
          </button>
        </>
      )}

      {isScheduledCancellation && (
  <button className="btn btn-outline-danger" onClick={() => cancelClientScheduledCancellation(idClient)}>
    Cancelar baja programada
  </button>
)}

      {isActive && (
        <>
          <button className="btn btn-danger me-2" onClick={handleCancelClient}>
            Dar baja
          </button>
          <button className="btn btn-outline-danger me-2" onClick={openClientModal}>
            Programar baja
          </button>
          <ProgramCancelModal idClient={idClient} />

        </>
      )}
    </>
  )

}
