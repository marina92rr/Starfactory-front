// SuscriptionClientModal.jsx
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useProductClientStore } from '../../../../hooks/useProductClientStore'
import { customStyleModal } from '../../../../helpers/customStyleModal'

Modal.setAppElement('#root')



export const LiquidateProductClientModal = ({ unpaid }) => {
  const { isModalProductClientUnpaidOpen, closeProductClientUnpaidModal } = useUiStore()
  const { activeProductClient, startUpdateProductClient, startLoadingProductsClientUnpaid, startLoadingProductsClientPaid } = useProductClientStore();



  const isEdit = !!activeProductClient?.idProductClient

  const [formValues, setFormValues] = useState({
    paymentMethod: '',
    paid: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isEdit) {
      setFormValues({
        paymentMethod: activeProductClient.paymentMethod ?? '',
        paid: activeProductClient.paid ?? '',
      })
    } else {
      setFormValues({ paymentMethod: '', paid: '' }) // Reset form values when not editing
    }
  }, [isEdit, activeProductClient])

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormValues(v => ({ ...v, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    const payload = {
      ...formValues,
      idProductClient: activeProductClient?.idProductClient, // <-- AQUI
      paid: true,
    };

    await startUpdateProductClient(payload, true);
    closeProductClientUnpaidModal();
    await startLoadingProductsClientUnpaid(activeProductClient?.idClient);
    await startLoadingProductsClientPaid(activeProductClient?.idClient);

    setFormValues({ paymentMethod: '', paid: '' });
    setSubmitted(false);
  };

  return (
    <Modal
      isOpen={isModalProductClientUnpaidOpen}
      onRequestClose={closeProductClientUnpaidModal}
      style={customStyleModal}
      contentLabel="Editar Compra automática"
    >
      <h4 className='ps-4'>Liquidar deuda</h4>
      <hr />

      <form className="container mb-3 " onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className='border p-3 w-100'>{unpaid.name}</label>
        </div>
        {/*metodo de pago  */}
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
          <h4 className='ps-1'>{unpaid.price} €</h4>
          <button type="submit" className="btn btn-success ">Liquidar deuda</button>

        </div>
      </form>
    </Modal>
  )
}