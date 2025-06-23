
import Modal  from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../hooks/useUiStore';
import { useRateStore } from '../../../hooks/useRateStore';


Modal.setAppElement('#root');

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: 'auto',
  },
};

export const RateModal = () => {

    const {isModalRateOpen, closeRateModal} = useUiStore(); //Abrir y cerrar modal
    const { activeRate, startSavingRate, starLoadingRates} = useRateStore();


    //Estado valor
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
    });

    //Subir estado formulario
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if(activeRate){
            setFormValues({...activeRate});
        }
    }, [activeRate]);

      const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return formValues.name.trim().length > 0 ? 'is-valid' : 'is-invalid';
      }, [formValues.name, formSubmitted]);
    
      const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const onSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitted(true);

  if (formValues.name.trim().length === 0) return;
  await startSavingRate(formValues);  // Guarda en la BBDD
  closeRateModal();  // Debería cerrar el modal
  await starLoadingRates();  // Recarga desde backend
  setFormValues({ name: '', description: '' });  // Limpia el formulario
  setFormSubmitted(false);
};


  return (
    <Modal
        isOpen={isModalRateOpen}
        onRequestClose={closeRateModal}
        style={customStylesModal}
        contentLabel='Crear Tarifa' 
       >

        <h1>Nueva Tarifa</h1>
        <hr />
        <form className='container' onSubmit={onSubmit}>
            <div className='mb-3'>
                <label  className="form-label">Nombre de la tarifa</label>
                <input 
                    className={`form-control ${titleClass}`}
                    name='name'
                    type="text"
                    value={formValues.name}
                    onChange={onInputChange} 
                />
            </div>
             <div className='mb-3'>
                <label  className="form-label">Nombre para los clientes y facturas</label>
                <input 
                    className={`form-control ${titleClass}`}
                    name='description'
                    type="text"
                    value={formValues.description}
                    onChange={onInputChange} 
                />
            </div>
            <button type='submit' className='btn btn-success btn-block'>Guardar</button>
        </form>
    </Modal>
  )
}
