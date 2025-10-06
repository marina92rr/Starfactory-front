// SuscriptionClientModal.jsx
import Modal from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useProductClientStore } from '../../../../hooks/useProductClientStore'
import { formatDate } from 'date-fns'
import { toLocalISO } from '../../../../helpers/toLocalISO'
import { customStyleModal } from '../../../../helpers/customStyleModal'


const lightOverlayStyle = {
  ...customStyleModal,
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.20)', // fuerza opacidad más baja
    zIndex: 1000,
  },
};


export const EditProductClientModal = () => {
  const { isModalProductClientOpen, closeProductClientModal } = useUiStore()
  const { activeProductClient, startUpdateProductClient, startLoadProductsByDate, startClearActiveProductClient } = useProductClientStore();
  
  const isEditMode = !!activeProductClient?.idProductClient


  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    discount: '',
    paymentDate: '',
    paymentMethod: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isEditMode && activeProductClient) {
      setFormValues({
        name: activeProductClient.name,
        price: activeProductClient.price,
        discount: activeProductClient.discount,
        paymentMethod: activeProductClient.paymentMethod,
        paymentDate: toLocalISO(
          activeProductClient.paymentDate
            ? new Date(activeProductClient.paymentDate)
            : new Date()
        ),
      })
    } else {
      setFormValues({ name: '', price: '', discount: '', paymentDate: '', paymentMethod: '' }) // Reset form values when not editing
    }
  }, [isModalProductClientOpen,isEditMode])

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormValues(v => ({ ...v, [name]: value }))
  }

   const onClose = () => {
    setSubmitted(false);
    setFormValues({ name: '', price: '', discount: '', paymentDate: '', paymentMethod: '' });
    startClearActiveProductClient?.(); // limpia el store si existe esta acción
    closeProductClientModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const payload = {
      ...formValues,
      idProductClient: source?.idProductClient,
    };

    await startUpdateProductClient(payload, true);
    // recarga por la fecha del propio form (YYYY-MM-DD)
    const ymd = formatDate(
      new Date(formValues.paymentDate),
      'yyyy-MM-dd'
    )
     // recarga SIEMPRE con la fecha seleccionada (YYYY-MM-DD)
    startLoadProductsByDate(ymd);
    onClose();
    
  };


  return (
    <Modal
      isOpen={isModalProductClientOpen}
      onRequestClose={onClose}
      style={lightOverlayStyle}
      contentLabel="Editar venta"
    >
      <h4 className='ps-4'>Editar venta</h4>
      <hr />

      <form className="container mb-3 " onSubmit={onSubmit}>
        {/*Nombre  */}
        <div className='mb-3'>
          <label className='form-label'>Nombre</label>
          <input
            type="text"
            className="form-control w-100"
            name='name'
            value={formValues.name}
            onChange={onInputChange} />
        </div>
        <div className='d-flex gap-2'>

          {/*Precio  */}
          <div className='mb-3'>
            <label className='form-label'>Precio</label>
            <div className='input-group'>
              <input
                className={`form-control`}
                name="price"
                type="number"
                step="0.01"
                value={formValues.price}
                onChange={onInputChange}
              />
              <span className='input-group-text'>€</span>
            </div>


          </div>
          {/*Descuento  */}
          <div className='mb-3'>
            <label className='form-label'>Descuento</label>
            <div className='input-group'>
              <input
                className={`form-control`}
                name="discount"
                type="number"
                step="0.01"
                value={formValues.discount}
                onChange={onInputChange}
              />
              <span className='input-group-text'>€</span>
            </div>
          </div>
        </div>
        {/*Fecha pago  */}
        <div className='mb-3'>
          <label className='form-label'>Fecha de pago</label>
          <input
            type="date"
            className="form-control w-100"
            name='paymentDate'
            value={formValues.paymentDate ? formatDate(new Date(formValues.paymentDate), 'yyyy-MM-dd') : ''}
            onChange={onInputChange} />
        </div>

        {/*Metodo pago */}
        <div className="mb-3 py-3">
          <label className="form-label">Método de pago</label>
          <select
            className="form-select py-3"
            name='paymentMethod'
            value={formValues.paymentMethod}
            onChange={onInputChange}
          >
            <option value="tarjeta">Tarjeta</option>
            <option value="efectivo">Efectivo</option>
          </select>
        </div>
        <div className="d-flex gap-2 mb-3 justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary ">Actualizar</button>

        </div>
      </form>
    </Modal>
  )
}