import React from 'react'
import { useUiStore } from '../../../hooks/useUiStore'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import { CreateLabelModal } from './CreateLabelModal';

export const LabelAddNew = () => {

    const {openCreateLabelModal, closeLabelModal} = useUiStore();
    const {setActiveLabel} = useLabelsStore();

    const handleClickNew = () => {
        
        setActiveLabel({
            name: '',
            color: '',
        })
        closeLabelModal();
        openCreateLabelModal();
    }

  return (
    <button 
        className='btn ms-auto'
        style={{ background: '#38b647', color: 'white' }}
        onClick={handleClickNew}>
        Nueva
    </button>
    
  )
}
