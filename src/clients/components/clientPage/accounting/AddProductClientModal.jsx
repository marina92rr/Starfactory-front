
import Modal from 'react-modal'
import { useMemo, useState } from 'react'
import { useUiStore } from '../../../../hooks/useUiStore';
import { useProductClientStore } from '../../../../hooks/useProductClientStore';



Modal.setAppElement('#root');

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // oscuridad del fondo
    zIndex: 9999,                          // asegura que está por encima
  }
};

export const AddProductClientModal = () => {

  const { isModalProductClientAdminOpen, closeProductClientAdminModal } = useUiStore(); //Abrir y cerrar modal
  const { startSavingAdministrationProductClient } = useProductClientStore();




  //Estado valor
  // 🔧 Estado inicial coherente con el schema
  const [formValues, setFormValues] = useState({
   
    name: 'Registro administrativo',
    price: '',
    paymentMethod: 'efectivo',
    paymentDate: new Date().toISOString().slice(0, 10)
  });

  //Subir estado formulario
  const [formSubmitted, setFormSubmitted] = useState(false);


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

    await startSavingAdministrationProductClient(formValues);  // Guarda en la BBDD
    closeProductClientAdminModal();  // Debería cerrar el modal
    window.location.reload();

    setFormSubmitted(false);
    setFormValues({
      name: 'Registro administrativo',
      price: '',
      paymentMethod: 'efectivo',
      paymentDate: new Date().toISOString().slice(0, 10)

    });

  }

  return (
    <Modal
      isOpen={isModalProductClientAdminOpen}
      onRequestClose={closeProductClientAdminModal}
      style={customStylesModal}
      contentLabel={'Añadir nuevo registro'} >

      <h1>{'Añadir nuevo Registro'}</h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>

        <div className='mb-3'>
          <div className='mb-3'>
            <label className="form-label">Concepto</label>
            <input
              className={`form-control ${titleClass}`}
              name='name'
              type="text"
              value={formValues.name}
              onChange={onInputChange}
            />
          </div>

          <div className='d-flex justify-content-between'>
            <div className='mb-3'>
              <label className="form-label">Entrada</label>
              <div className='input-group'>
                <input
                  className={`form-control ${titleClass}`}
                  name='price'
                  type="number"
                  value={formValues.price}
                  onChange={onInputChange}
                />  <span className="input-group-text">€</span>
              </div>
            </div>
            {/*Fechas  */}
            <div className='d-flex'>
              <div className="mx-2">
                <label className="form-label">Fecha de pago</label>
                <input
                  className="form-control"
                  name="paymentDate"
                  type="date"
                  value={formValues.paymentDate}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Método de pago</label>
            <select
              className="form-select py-3"
              name='paymentMethod'
              value={formValues.paymentMethod}
              onChange={onInputChange}
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

        </div>
        <button type='submit' className='btn btn-success btn-block'>
          {'Guardar'}
        </button>
      </form>
    </Modal>
  )
}
