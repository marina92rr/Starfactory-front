// SuscriptionClientModal.jsx
import Modal from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../../hooks/useUiStore'
import { useProductClientStore } from '../../../../hooks/useProductClientStore'
import { customStyleModal } from '../../../../helpers/customStyleModal'

Modal.setAppElement('#root')



export const LiquidateProductClientModal = () => {
  const { isModalProductClientUnpaidOpen, closeProductClientUnpaidModal } = useUiStore()
  const { activeProductClient, startUpdateProductClient, startLoadingProductsClientUnpaid, startLoadingProductsClientPaid } = useProductClientStore();

  const isEdit = !!activeProductClient?.idProductClient

  const [formValues, setFormValues] = useState({
    paymentMethod: '',
    paid: '',
    discount: ''
  })
  const [submitted, setSubmitted] = useState(false);

  // acción actual del submit: 'update' | 'liquidate'
    const [action, setAction] = useState('update')

  useEffect(() => {
    if (isEdit && activeProductClient) {
      setFormValues({
        paymentMethod: activeProductClient.paymentMethod,
        paid: activeProductClient.paid,
        discount: activeProductClient.discount
      })
    } else {
      setFormValues({ paymentMethod: '', paid: '', discount: '' }) // Reset form values when not editing
    }
  }, [isEdit, isModalProductClientUnpaidOpen])

  const finalPrice = useMemo(() => {
    if (!activeProductClient) return 0;
    const discount = parseFloat(formValues.discount) || 0;
    return (activeProductClient.price - discount).toFixed(2);
  }, [activeProductClient, formValues.discount]);

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormValues(v => ({ ...v, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validaciones Actualizar-Liquidar
    if (action === 'liquidate' && !formValues.paymentMethod) {
      setSubmitted(false);
      return;
    }

    const payload =

      action === 'liquidate'
        ? {
          ...formValues,
          idProductClient: activeProductClient?.idProductClient, // <-- AQUI
          paid: true,
        }
        : {
          ...formValues,
          idProductClient: activeProductClient?.idProductClient, // <-- AQUI
          paid: false,
        }

    await startUpdateProductClient(payload, true);
    closeProductClientUnpaidModal();
    await startLoadingProductsClientUnpaid(activeProductClient?.idClient);
    await startLoadingProductsClientPaid(activeProductClient?.idClient);

    setFormValues({ paymentMethod: '', paid: '', discount: '' });
    setSubmitted(false);
    setAction('update');
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
          <label className='border p-3 w-100'>{activeProductClient?.name}</label>
        </div>

        <div className='mb-3 '>
          <label className="form-label">Descuento</label>
          <input
            className="form-control"
            ype="text"
            name='discount'
            value={formValues.discount}
            onChange={onInputChange}
          />
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
          <h4 className='ps-1'>{finalPrice} €</h4>
          {/* Botón ACTUALIZAR: mantiene paid = false */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => setAction('update')}
          >Actualizar
          </button>
          {/* Botón LIQUIDAR: paid = true */}
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => setAction('liquidate')}
            disabled={submitted}
          >
            Liquidar deuda
          </button>
        </div>

      </form>
    </Modal>
  )
}