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
};

export const ProgramCancelModal = ({idClient}) => {

  // Hooks
  const { isModalClientOpen, closeClientModal } = useUiStore();
  const {  programClientCancellation, starLoadingClientByID } = useClientsStore();

  const [cancelDate, setCancelDate] = useState('');

  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

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
      <h5 className="mb-3">Programar baja del cliente</h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cancelDate" className="form-label">Fecha de baja:</label>
          <input
            type="date"
            id="cancelDate"
            className="form-control"
            value={cancelDate}
            onChange={(e) => setCancelDate(e.target.value)}
            min={todayStr}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={closeClientModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Confirmar baja
          </button>
        </div>
      </form>
    </Modal>
  );
  
}
