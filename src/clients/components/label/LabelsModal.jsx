
import { useEffect, useState } from 'react'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import Modal from 'react-modal';        //Popup 
import { useUiStore } from '../../../hooks/useUiStore';
import { CreateLabelModal } from './CreateLabelModal';

Modal.setAppElement('#root');


const customStyles = {
 content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '500px',
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

 const {isModalOpen, closeModal} = useUiStore();
const { labels, starLoadingLabels} = useLabelsStore();

  useEffect(() =>{
    starLoadingLabels();
  }, [])


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
            <button className='btn btn-success '>Nueva</button>
            <hr />
          </div>
          {labels.map((label) => {
            return (
              <div className='d-flex' key={label.idLabel}>
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
            )
          }
          
          )}
        
     
    
    </Modal>
   
    
  )
}
