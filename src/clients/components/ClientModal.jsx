
//Formulario Modal Cliente
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { useClientsStore } from '../../hooks/useClientsStore';
import Modal from 'react-modal';        //Popup 

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

export const ClientModal = () => {
  const { isModalOpen, closeModal } = useUiStore();
  const { activeClient, startSavingClient, starLoadingClients } = useClientsStore();

  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    dni: '',
    email: '',
    mainPhone: '',
    optionalPhone: '',
    isTeacher: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (activeClient) {
      setFormValues({ ...activeClient });
    }
  }, [activeClient]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.name.trim().length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.name, formSubmitted]);

  const onInputChange = ({ target }) => {
    const { name, type, checked, value } = target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (formValues.name.trim().length === 0) return;

    await startSavingClient(formValues);
    closeModal();
    await starLoadingClients();
    setFormSubmitted(false);
    setFormValues({
      name: '', lastName: '', dni: '', email: '',
      mainPhone: '', optionalPhone: '', isTeacher: true,
    });
  };

  return (
   <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Añadir Cliente'      
    >

    <h1>Añadir nuevo Cliente</h1>
    <hr />
    <form className='container' onSubmit={onSubmit} >
      <div className='mb-3'>
        <label  className="form-label">Nombre</label>
        <input 
            className={`form-control ${titleClass}`}
            name='name'
            type="text"
            value={formValues.name}
            onChange={onInputChange} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">Apellidos</label>
        <input 
            className='form-control'
            name='lastName'
            type="text"
            value={formValues.lastName}
            onChange={onInputChange} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">DNI</label>
        <input 
            className='form-control'
            name='dni'
            type="text"
            value={formValues.dni}
            onChange={onInputChange} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">Email</label>
        <input 
            className='form-control'
            name='email'
            type="text"
            value={formSubmitted.email}
            onChange={onInputChange} 
        />
      </div>
      <div className='d-flex gap-2 mb-3' >
        <div>
        <label  className="form-label">Teléfono</label>
        <input 
            className='form-control'
            name='mainPhone'
            type="text"
            value={formValues.mainPhone}
            onChange={onInputChange} 
        />
        </div>
        <div className=' gap-2'>
        <label  className="form-label"> 2º Teléfono</label>
        <input 
            className='form-control'
            name='optionalPhone'
            type="text"
            value={formValues.optionalPhone}
            onChange={onInputChange} 
        />
        </div>
      </div>
      <div className='d-flex gap-3 mb-3'>
      <input
        className="form-check-input"
        type="checkbox"
        name="isTeacher"
        id="isTeacherCheckbox"
        checked={formValues.isTeacher}
        onChange={onInputChange}
      />
  <label className="form-check-label" htmlFor="isTeacherCheckbox">
    Es profesor
  </label>
        
        </div>
        <button type='submit' className='btn btn-primary btn-block'>Guardar</button>
      
    </form>
   </Modal>
  )
}
