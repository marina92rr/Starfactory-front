import { useProductClientStore } from '../../../../hooks/useProductClientStore';
import { useUiStore } from '../../../../hooks/useUiStore';



export const AddNewProductClient = () => {

    const {openProductClientModal} = useUiStore();
    const { setActiveProductClient} = useProductClientStore();

    
    const handleClickNew = () => {
        
        setActiveProductClient({
          idClient: 0,
          idProduct: 0,
          price: 0,
          paymentMethod: '',
          paid: true,
          buyDate: new Date().toISOString().slice(0, 10),
          paymentDate:  new Date().toISOString().slice(0, 10)

        })
      //  closeLabelModal();
        openProductClientModal();
    }

  return (
    <button 
        className='btn me-3'
        style={{ background: '#38b647', color: 'white' }}
        onClick={handleClickNew}>
        Añadir registro
    </button>
    
  )
}
