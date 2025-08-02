import Modal from 'react-modal';
import { useState } from 'react';
import { useUiStore } from '../../../hooks/useUiStore';
import { useClientsStore } from '../../../hooks/useClientsStore';


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

export const ProgramCancelModal = ({ idClient }) => {

  // Hooks
  const { isModalClientOpen, closeClientModal } = useUiStore();
  const { programClientCancellation, starLoadingClientByID } = useClientsStore();

  // 🕒 Obtener la fecha actual en formato YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [cancelDate, setCancelDate] = useState(todayStr);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cancelDate) return alert('Selecciona una fecha válida');

    await programClientCancellation(idClient, cancelDate);
    await starLoadingClientByID(); // ✅ recarga sin tener que hacer reload
    setCancelDate('');
    closeClientModal();
  };


  return (
    <Modal
      isOpen={isModalClientOpen}
      onRequestClose={closeClientModal}
      style={customStyles}
      contentLabel="Programar baja"
    >
      <h3 className="mb-3">Programar baja del cliente</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cancelDate" className="form-label">Fecha de baja:</label>
          <div className="input-group py-2">
            
            <input
              type="date"
              className="form-control"
              value={cancelDate}
              onChange={(e) => setCancelDate(e.target.value)}
              min={todayStr}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-danger me-2" onClick={closeClientModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-success"
            style={{ background: '#38b647', color: 'white' }}>
            Confirmar fecha
          </button>
        </div>
      </form>
    </Modal>
  );

}
