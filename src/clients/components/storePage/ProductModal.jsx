
import Modal from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../hooks/useUiStore';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { useProductStore } from '../../../hooks/useProductStore';


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

export const ProductModal = () => {

  const { isModalProductOpen, closeProductModal } = useUiStore(); //Abrir y cerrar modal
  const { activeProduct, startSavingProduct, startLoadingProductsByCategory } = useProductStore();
  const { categories, activeCategory } = useCategoryStore();

  const isEditMode = !!activeProduct?.idProduct; //Si existe el id del producto, es modo edición


  //Estado valor
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: 0
  });

  //Subir estado formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (activeProduct && isEditMode) {
      setFormValues({ 
        name: activeProduct.name || '',
        idProduct: activeProduct.idProduct || '',
        description: activeProduct.description || '',
        price: activeProduct.price || 0
      }
      );
    }else{
      setFormValues({
        name: '',
        description: '',
        price: 0,
        idCategory: activeCategory?._id?.toString() || '',
      });
    }
  }, [activeProduct, activeCategory]);

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
    
    await startSavingProduct(formValues, isEditMode);  // Guarda en la BBDD
    closeProductModal();  // Debería cerrar el modal
    startLoadingProductsByCategory(activeCategory._id);

    setFormSubmitted(false);

if(isEditMode){
   setFormValues({
      name: '',
      description: '',
      price: 0,
      
    });
  };
}
   

  return (
    <Modal
      isOpen={isModalProductOpen}
      onRequestClose={closeProductModal}
      style={customStylesModal}
      contentLabel={isEditMode ? 'Editar Producto' : 'Añadir nuevo Producto'} >

      <h1>{isEditMode ? 'Editar Producto' : 'Añadir nuevo Producto'}</h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className="form-label">Nombre</label>
          <input
            className={`form-control ${titleClass}`}
            name='name'
            type="text"
            value={formValues.name}
            onChange={onInputChange}
          />

          <label className="form-label">Nombre para los clientes:</label>
          <input
            className={`form-control ${titleClass}`}
            name='description'
            type="text"
            value={formValues.description}
            onChange={onInputChange}
          />
          

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
        <button type='submit' className='btn btn-success btn-block'>
          {isEditMode ? 'actualizar' : 'Guardar'}
        </button>
      </form>
    </Modal>
  )
}
