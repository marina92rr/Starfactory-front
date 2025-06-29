
import Modal from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../hooks/useUiStore';
import { useQuotaStore } from '../../../hooks/useQuotaStore';
import { useRateStore } from '../../../hooks/useRateStore';


Modal.setAppElement('#root');

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const QuotaModal = ({quota}) => {

  const { isModalQuotaOpen, closeQuotaModal } = useUiStore(); //Abrir y cerrar modal
  const { activeQuota, startSavingQuota } = useQuotaStore();
  const { rates } = useRateStore();



  //Estado valor
  const [formValues, setFormValues] = useState({
    name: '',
    numSession: 0,
    numPeriods: 0,
    period: '',
    price: 0,
    idRate: ''
  });

  //Subir estado formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isEditMode = !!activeQuota?.idQuota;

  useEffect(() => {
      console.log("🎯 activeQuota recibido en modal:", activeQuota);

    if (activeQuota && isEditMode) {
      setFormValues({ ...activeQuota });
    } else {
      setFormValues({
        name: '',
        numSession: 0,
        numPeriods: 0,
        period: '',
        price: 0,
        idRate: ''
      })
    }
  }, [activeQuota]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.name.trim().length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.name, formSubmitted]);

  const onInputChange = ({ target }) => {
    const { name, value, type } = target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'number'
        ? (value === '' ? '' : parseInt(value, 10)) // para campos vacíos
        : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (formValues.name.trim().length === 0) return;

    await startSavingQuota(formValues, isEditMode);  // Guarda en la BBDD
    closeQuotaModal();  // Debería cerrar el modal

    setFormSubmitted(false);
    
    if (isEditMode) {
      setFormValues({
        name: '',
        numSession: 0,
        numPeriods: 0,
        period: '',
        price: 0,
        idRate: ''
      });
    }
  };


  return (
    <Modal
      isOpen={isModalQuotaOpen}
      onRequestClose={closeQuotaModal}
      style={customStylesModal}
      contentLabel={isEditMode ? 'Actualizar Cuota' : 'Añadir Cuota'}>

      <h1>{isEditMode ? 'Actualizar Cuota' : 'Nueva Cuota'}</h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>

        <div className='mb-3'>

          <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input
              className={`form-control ${titleClass}`}
              name='name'
              type="text"
              value={formValues.name}
              onChange={onInputChange}
            />
          </div>

          <div className='d-flex justify-content-between mb-3'>

            <div className='mx-1'>
              <label className="form-label">Nº de días</label>
              <input
                className={`form-control ${titleClass}`}
                name='numSession'
                type="number"
                value={formValues.numSession}
                onChange={onInputChange}
              />
            </div>
            <div className='mx-1'>
              <label className="form-label" htmlFor="period">Periodo</label>
              <select
                className={`form-select ${titleClass}`}
                name='period'
                type="text"
                value={formValues.period}
                onChange={onInputChange}
              >
                <option value=""> Periodo </option>
                <option value="puntual">Puntual</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>
          </div>
          <div className='mb-3'>
            <label className="form-label">Tarifa</label>
            <select
              className={`form-select ${titleClass}`}
              name='idRate'
              value={formValues.idRate}
              onChange={onInputChange}
            >

              ( <option value="">Selecciona una tarifa</option>)

              {rates.map(rate => (
                <option key={rate._id} value={rate._id}>{rate.name}</option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label className="form-label">PVP</label>
            <input
              className={`form-control ${titleClass}`}
              name='price'
              type="number"
              value={formValues.price}
              onChange={onInputChange}
            />
          </div>

        </div>
        <button type='submit' className='btn btn-success btn-block'>{isEditMode ? 'Actualizar' : 'guardar'}</button>
      </form>
    </Modal>
  )
}
