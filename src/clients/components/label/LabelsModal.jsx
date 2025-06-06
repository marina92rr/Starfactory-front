
import { useEffect, useState } from 'react'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import Modal from 'react-modal';        //Popup 
import { useUiStore } from '../../../hooks/useUiStore';
import { CreateLabelModal } from './CreateLabelModal';
import { useClientsStore} from '../../../hooks/useClientsStore'
import { useFilterLabels } from '../../../hooks/useFilterLabels';

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


export const LabelsModal = () => {

  //Create modal
  const [showModal, setShowModal] = useState(false);
  
  //Abrir modal addNewLabel
  const {isModalOpen, closeModal} = useUiStore();             //Abrir/ cerrar modal
  const { labels, starLoadingLabels} = useLabelsStore();      //Lectura todos los Labels
  const {activeClient} = useClientsStore();                   //Cliente activo en clientPage

//Nada mas cargar la pag 
  useEffect(() =>{
    starLoadingLabels();    //Lectura allabel
  }, []);

//Crear etiqueta
  const handleCreate = async (label) => {
    createLabelAndAssign({
      ...label,               // name, description, color
      dni: activeClient.dni   // debes tenerlo en contexto
    });
    setShowModal(false);
    setRefresKey(k => k + 1);    // <-- incrementamos al crear
  };

  //Marcar labelClient
  const [refresKey, setRefresKey] = useState();
  //Etiquetas del client
  const clientLabels = useFilterLabels({dni: activeClient.dni});
  if (!labels || labels.length === 0) return null;

  return (

    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style= {customStyles}
      contentLabel='Etiquetas' 
    >
     
     <div>
     </div>
          <h1>Editar etiquetas</h1>
         
          <hr />
          <div className='d-flex mb-3'>
            <input 
              type="text" 
              className='form-input col-10 me-2'
              placeholder='Buscar...' />
                      <button
                        className="btn btn-success"
                        onClick={() => setShowModal(true)}
                      >
                        Nueva
                      </button>
                      {showModal && (
            <CreateLabelModal
              onCreate={handleCreate}
              onClose={() => setShowModal(false)}
            />
          )}
            <hr />
          </div>
          {labels.map((label) => {
            const isChecked = clientLabels.some(l => l.idLabel === label.idLabel); // marcar si el cliente ya tiene este label
            
            return (
              <div className='d-flex' key={label.idLabel}>
                <input type="checkbox"
                checked={isChecked}
                  />
                <div 
                  className='me-3 ms-3'
                  style={{
                    backgroundColor: `${label.color}`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '25px',
                    border: '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                ></div>
                <div style={{cursor: 'pointer'}}>{label.name.toUpperCase()}</div>
                <hr />
              </div>
                            
            )}
          
          )}
         <button className='btn btn-success'>Guardar</button>
     
    
    </Modal>
   
    
  )
}
