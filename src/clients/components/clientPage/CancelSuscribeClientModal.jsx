import Modal from 'react-modal';
import { useState } from 'react';
import { useUiStore } from '../../../hooks/useUiStore';
import { useClientsStore } from '../../../hooks/useClientsStore';
import { capitalizeFirstWord } from '../../../helpers/capitalizeFirstWord';


Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // oscuridad del fondo
    zIndex: 9999,                          // asegura que está por encima
  }
};

export const CancelSuscribeClientModal = ({ idClient }) => {

  // Hooks
  const { isModalCancelSuscribeClienOpen, closeCancelSuscribeClientModal } = useUiStore();
  const { activeClient, toggleClientStatusCancel, starLoadingClientByID } = useClientsStore();
  const [removeSales, setRemoveSales] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    await toggleClientStatusCancel(idClient, removeSales);
    await starLoadingClientByID(); // ✅ recarga sin tener que hacer reload
    closeCancelSuscribeClientModal();
  };


  return (
    <Modal
      isOpen={isModalCancelSuscribeClienOpen}
      onRequestClose={closeCancelSuscribeClientModal}
      style={customStyles}
      contentLabel="Programar baja"
    >
      <h3 className="mb-3">Dar de baja</h3>
      <hr />
      <span className='m-3'>¿Estas seguro de dar de baja a {capitalizeFirstWord(activeClient.name)}?</span>
      <form className='m-3' onSubmit={handleSubmit}>
        <div className="mb-3">

          <label className="d-inline-flex align-items-center gap-2">
            <input
              type="checkbox"
              className="me-1"           // margen a la derecha del check
              checked={removeSales}
              onChange={(e) => setRemoveSales(e.target.checked)}
            />
            Eliminar todas las ventas no pagadas del cliente
          </label>

        </div>

        <div className="d-flex justify-content-end">

          <button type="submit" className="btn btn-success"
            style={{ background: '#38b647', color: 'white' }}>
            Dar de baja
          </button>
        </div>
      </form>
    </Modal >
  );

}


