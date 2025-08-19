import React from 'react'
import { useUiStore } from '../../../hooks/useUiStore'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
export const LabelAddNew = () => {

    const {openCreateLabelModal, closeLabelModal} = useUiStore();
    const {setActiveLabel} = useLabelsStore();

     // ejemplo: si estás en /labels → muestra "Nueva etiqueta"
    const buttonText = location.pathname.includes('/labels') 
        ? 'Nueva etiqueta' 
        : 'Nueva';

    const handleClickNew = () => {
        
        setActiveLabel({
            name: '',
            color: '#087990',
        })
      //  closeLabelModal();
        openCreateLabelModal();
    }

  return (
    <button 
        className='btn ms-auto'
        style={{ background: '#38b647', color: 'white' }}
        onClick={handleClickNew}>
        {buttonText}
    </button>
    
  )
}
