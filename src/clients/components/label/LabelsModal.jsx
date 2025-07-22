
import { useEffect, useState } from 'react'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import Modal from 'react-modal';        //Popup 
import { useUiStore } from '../../../hooks/useUiStore';
import { CreateLabelModal } from './CreateLabelModal';
import { useClientsStore } from '../../../hooks/useClientsStore'
import { useFilterLabels } from '../../../hooks/useFilterLabels';
import { clientsApi } from '../../../api';
import { LabelAddNew } from './LabelAddNew';
import { FindLabel } from './FindLabel';

Modal.setAppElement('#root');


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80vh',
    maxHeight: '80vh',
    overflowY: 'auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    color: '#000000',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',

  },
};


export const LabelsModal = ({ idClient }) => {

  //Abrir modal addNewLabel
  const { isModalLabelOpen, isModalCreateLabelOpen, closeLabelModal } = useUiStore();             //Abrir/ cerrar modal
  const { labels, starLoadingLabels, filteredList, filter } = useLabelsStore();      //Lectura todos los Labels
  const { activeClient, starLoadingClientByID } = useClientsStore();                   //Cliente activo en clientPage

  // Luego en el render:
  const visibleLabels = filter.trim().length > 0 ? filteredList : labels;

  //Create modal
  const [selectedLabels, setSelectedLabels] = useState([]);

  const clientLabels = useFilterLabels({ idClient });

  //Nada mas cargar la pag 
  useEffect(() => {
    starLoadingLabels();    //Lectura allabel
  }, []);

  //Cargar etiquetas del cliente
  useEffect(() => {
    if (clientLabels && clientLabels.length > 0) {
      setSelectedLabels(clientLabels.map(label => label.idLabel));  //idLabel de label
    }
  }, [clientLabels]);

  const handleToggle = (idLabel) => {
    setSelectedLabels(prev =>
      prev.includes(idLabel)
        ? prev.filter(id => id !== idLabel)
        : [...prev, idLabel]
    );
  };

  //Guardar etiqueta
  const handleSaveLabels = async () => {
    try {
      const { data } = await clientsApi.put(`/labels/client/${activeClient.idClient}`, {
        ...activeClient,
        idLabels: selectedLabels
      });
      await starLoadingClientByID(activeClient.idClient); // recargar cliente si quieres
      window.location.reload();
      closeModal();

    } catch (error) {
      console.error('Error al guardar etiquetas del cliente', error);
    }
  };


  if (!labels || labels.length === 0) return null;

  return (
    <>
      <Modal
        isOpen={isModalLabelOpen}
        onRequestClose={closeLabelModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true} // ✅ esto permite cerrar al pulsar fuera
        contentLabel='Etiquetas'
      >
        <div>
        </div>
        <h1>Editar etiquetas</h1>
        <hr />
        <div className='d-flex mb-3'>
          <FindLabel onSelectLabel={handleToggle} />
          <div>
            <LabelAddNew />
          </div>
          <hr />
        </div>
        {visibleLabels.map((label) => {
          const isChecked = (selectedLabels || []).includes(label.idLabel);

          return (
            <div className="d-flex align-items-center mb-2" key={label.idLabel}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(label.idLabel)}
              />
              <div
                className="me-3 ms-3"
                style={{
                  backgroundColor: label.color,
                  width: '10px',
                  height: '10px',
                  borderRadius: '25px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              ></div>
              <div style={{ cursor: 'pointer' }}>{label.name.toUpperCase()}</div>
            </div>
          );
        })}

        <hr />
        <button className="btn btn-success" onClick={handleSaveLabels}>
          Guardar
        </button>


      </Modal>
      {isModalCreateLabelOpen && <CreateLabelModal idClient={idClient} />}

    </>
  )
}
