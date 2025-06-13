
import Modal  from 'react-modal'
import { useEffect, useMemo, useState } from 'react'
import { useUiStore } from '../../../hooks/useUiStore';
import { useCategoryStore } from '../../../hooks/useCategoryStore';


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

export const CategoryModal = () => {

    const {isModalCategoryOpen, closeCategoryModal} = useUiStore(); //Abrir y cerrar modal
    const { activeCategory, startSavingCategory, starLoadingCategories} = useCategoryStore();


    //Estado valor
    const [formValues, setFormValues] = useState({
        name: ''
    });

    //Subir estado formulario
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if(activeCategory){
            setFormValues({...activeCategory});
        }
    }, [activeCategory]);

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

  await startSavingCategory(formValues);  // Guarda en la BBDD

  closeCategoryModal();  // Debería cerrar el modal

  await starLoadingCategories();  // Recarga desde backend

  setFormValues({ name: '' });
  setFormSubmitted(false);
};


  return (
    <Modal
        isOpen={isModalCategoryOpen}
        onRequestClose={closeCategoryModal}
        style={customStylesModal}
        contentLabel='Crear Categoría' >

        <h1>Nueva categoría</h1>
        <hr />
        <form className='container' onSubmit={onSubmit}>
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
            <button type='submit' className='btn btn-success btn-block'>Guardar</button>
        </form>
    </Modal>
  )
}
