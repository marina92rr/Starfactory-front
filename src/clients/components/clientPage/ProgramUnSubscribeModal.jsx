
import { useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useClientsStore } from '../../hooks/useClientsStore';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const ProgramUnSubscribeModal = () => {
    const { isModalClientOpen, closeClientModal } = useUiStore();
      const { activeClient, startSavingClient, starLoadingClients } = useClientsStore();
    
      const isEditMode = !!activeClient?.idClient;
    
    
      const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        dni: '',
        email: '',
        mainPhone: '',
        optionalPhone: '',
        isTeacher: true,
      });
      
  return (
    <div>ProgramUnSubscribeModal</div>
  )
}
