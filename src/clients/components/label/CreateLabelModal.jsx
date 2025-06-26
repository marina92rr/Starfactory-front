import Modal  from 'react-modal'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import { useUiStore } from '../../../hooks/useUiStore';

Modal.setAppElement('#root');

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height:'auto',
    padding: '20px',
    overflow: 'visible', //Para que sobresalga
    zIndex: 1001 },
    overlay: {
      zIndex: 1000
    },
};

//Colores por defecto:
const colors = [
  '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF',
  '#FF3333', '#FF9933', '#FFFF66', '#99FF33', '#33FF33', '#33FF99', '#66FFFF', '#3399FF', '#3333FF', '#9933FF', '#FF33FF',
  '#FF6666', '#FFB366', '#FFFF99', '#B3FF66', '#66FF66', '#66FFB3', '#99FFFF', '#66B3FF', '#6666FF', '#B366FF', '#FF66FF',
  '#FF9999', '#FFD199', '#FFFFCC', '#CCFF99', '#99FF99', '#99FFD1', '#CCFFFF', '#99CCFF', '#9999FF', '#D199FF', '#FF99FF'

];

export const CreateLabelModal = () => {

  const { isModalCreateLabelOpen, onCloseCreateLabelModal} = useUiStore();
  const {setActiveLabel, activeLabel, createLabelAndAssign } = useLabelsStore();

  const isEditLabel = !!activeLabel?.idLabel; //Actualizar etiqueta

  //Estado valor
  const [formValues, setFormValues] = useState({
    name: '',
    color: '#087990' 
    //Color por defecto
  });

  //Subir estado formulario
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#087990');
  const [showPalette, setShowPalette] = useState(false);



  useEffect(() => {
    if(isEditLabel){
      setFormValues({...activeLabel});
    }else{
      setFormValues({ 
        name: '', 
        color: '#087990'
      })
    }
  }, [activeLabel]);


  const titleClass = useMemo(() => {
          if (!formSubmitted) return '';
          return formValues.name.trim().length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.name, formSubmitted]);

//Valor de inpus
 const onInputChange = ({ target }) => {
        const { name, value } = target;
         // sincroniza también el color seleccionado
        if (name === 'color') {
          setSelectedColor(value);
        }
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

//Seleccionar color
  const handleColorClick = (color) => {
    setSelectedColor(color);
    setFormValues(prev => ({
    ...prev,
    color: color
  }));
    setShowPalette(false);
  };

  //Color aleatorio
  const handleRandom = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
     setFormValues(prev => ({
    ...prev,
    color: randomColor
  }));
    setShowPalette(false);
  };

const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (formValues.name.trim().length === 0) return;
    await createLabelAndAssign(formValues, isEditLabel);  // Guarda en la BBDD
    onCloseCreateLabelModal();  // cerrar el modal
    isEditLabel
      ? setFormValues({ ...formValues })
      : setFormValues({ name: '', color:'#087990' }); // Limpia el formulario si no es edición

    setFormSubmitted(false);
  };


  return (
    <Modal
      isOpen={isModalCreateLabelOpen}
      onRequestClose={onCloseCreateLabelModal}
      style={customStylesModal}
      shouldCloseOnOverlayClick={true} // ✅ esto permite cerrar al pulsar fuera
      contentLabel="Nueva Etiqueta"
    >
      <h2 className='modal-title'>{isEditLabel ? 'Editar Etiqueta' : 'Nueva Etiqueta'}</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${titleClass}`}
            value={formValues.name}
            onChange={onInputChange}
          />
        </div>
       
        <div className="form-group">
          <div>
            <label htmlFor='color' className="form-label">Color</label>
          <div  style={{ position: 'relative' }} className="d-flex mb-2">
            <div
              onClick={() => setShowPalette(!showPalette)}
              style={{
                backgroundColor: selectedColor,
                width: '40px',
                height: '40px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer'
              }}
            ></div>
             <input
              type="text"
              className="form-control mb-3 ms-2"
              style={{width: '150px'}}
              value={formValues.color}
              onChange={onInputChange}
            />

            {showPalette && (
              <div
                style={{
                  position: 'absolute',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '10px',
                  zIndex: 100,
                  width: 'fit-content',
                  top: '50px'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(11, 30px)',
                    gap: '1px',
                    marginBottom: '10px'
                  }}
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColorClick(color)}
                      style={{
                        backgroundColor: color,
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        margin:'0',
                        border: 'none'
                        
                      }}
                    />
                  ))}
                </div>

                <div className="d-flex justify-content-between px-2">
                  <button className="btn btn-link p-0" onClick={handleRandom}>Aleatorio</button>
                  <div className='d-flex align-items-center'>
                    <input
                      type="color"
                      id="color"
                      name="color"
                      className="form-control form-control-color"
                      value={formValues.color}
                      onChange={onInputChange}
                    />
                    <label className="cursor" htmlFor="color">Personalizado</label>
                  </div>
                  
                </div>
              </div>
            )}
          </div>

          </div>
          <div className='mb-2'>
            
          </div>
          
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditLabel ? 'Actualizar' : 'Crear'}
        </button>
        
      </form>
    </Modal>
  
  )
}
