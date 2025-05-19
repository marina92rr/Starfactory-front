
//Formulario Modal Cliente
import React, { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { useClientsStore } from '../../hooks/useClientsStore';
import Modal from 'react-modal';        //Popup 
import { useForm } from '../../hooks/useForm';


const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-20%',
      transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ClientModal = () => {

  const {isModalOpen, closeModal} = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeClient, startSavingClient} = useClientsStore();

  const { onInputChange, onResetForm, handleChange} = useForm();

  //Valor inicial
  const [formValues, setFormValues] = useState({
    name:'',
    lastName: '',
    dni: '',
    email: '',
    mainPhone: '',
    optionalPhone: '',
    isTeacher: true
  });

  const titleClass = useMemo(() =>{
    if( !formSubmitted) return '';
    return (formValues.name.length > 0)
    ? 'is-valid'
    : 'is-invalid'
  }, [formValues.name, formSubmitted]);


  useEffect(() => {
    
   if(activeClient !== null){
    setFormValues({...activeClient});
   }
  }, [activeClient]);

  //Cambiar valor imput
  const onInputchanged = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }


  //Subida formulario
const onSubmit = async(client) =>{
  client.prevenDefault();
  setFormSubmitted(true);

  if(formValues.title.length <=0) return;
    console.log(formValues)

    await startSavingClient(formValues);         //await: primero se graba el evento y se cierra
    //closeModal();       //Se cierra el evento
    setFormSubmitted(false);        //Quitar lo errores
}

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
            onChange={onInputchanged} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">Apellidos</label>
        <input 
            className='form-control'
            name='lastName'
            type="text"
            value={formValues.lastName}
            onChange={onInputchanged} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">DNI</label>
        <input 
            className='form-control'
            name='dni'
            type="text"
            value={formValues.dni}
            onChange={onInputchanged} 
        />
      </div>

      <div className='mb-3'>
        <label  className="form-label">Email</label>
        <input 
            className='form-control'
            name='email'
            type="text"
            value={formSubmitted.email}
            onChange={onInputchanged} 
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
            onChange={onInputchanged} 
        />
        </div>
        <div>
        <label  className="form-label"> 2º Teléfono</label>
        <input 
            className='form-control'
            name='optionalPhone'
            type="text"
            value={formValues.optionalPhone}
            onChange={onInputchanged} 
        />
        </div>
      </div>
      <div className='d-flex gap-3'>
        <label  className="form-label"> ¿Es profesor?</label>
        
        </div>
        <button type='submit' className='btn btn-primary btn-block'>Guardar</button>
      
    </form>
   </Modal>
  )
}
