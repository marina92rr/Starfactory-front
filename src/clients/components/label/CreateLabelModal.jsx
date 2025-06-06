
import React, { useState } from 'react'


//Colores por defecto:
const colors = [
  '#EDE7F6', '#F3E5F5', '#FCE4EC', '#FEF3E0', '#FFFDE7',
  '#F9FBE7', '#F1F8E9', '#E0F2F1', '#E8F5E9', '#EFEBE9',
  '#FFEBEE', '#FFE0B2', '#FFECB3', '#FFF9C4', '#F0F4C3',
  '#DCEDC8', '#B2EBF2', '#B3E5FC', '#BBDEFB', '#C5CAE9'
];

export const CreateLabelModal = ({ onCreate, onClose }) => {


     const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#087990');
  const [showPalette, setShowPalette] = useState(false);
  const [mode, setMode] = useState('personalizado');

//Seleccionar color
  const handleColorClick = (color) => {
    setSelectedColor(color);
    setShowPalette(false);
  };

  //Color aleatorio
  const handleRandom = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
    setShowPalette(false);
  };

//enviar form
   const handleSubmit = async() => {
    await onCreate({ name, description, color: selectedColor })
    
  };


  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog ">
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="modal-title">Nueva etiqueta</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <label htmlFor='name' className="form-label"> Nombre</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <label htmlFor='description'  className="form-label"> Descripción</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor='color' className="form-label">Color</label>
          <div style={{ position: 'relative' }} className="mb-2">
            <div
              onClick={() => setShowPalette(!showPalette)}
              style={{
                backgroundColor: selectedColor,
                width: '50px',
                height: '50px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer'
              }}
            ></div>

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
                    gridTemplateColumns: 'repeat(5, 30px)',
                    gap: '5px',
                    marginBottom: '10px'
                  }}
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColorClick(color)}
                      style={{
                        backgroundColor: color,
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        borderRadius: '3px'
                      }}
                    />
                  ))}
                </div>

                <div className="d-flex justify-content-between px-2">
                  <button className="btn btn-link p-0" onClick={handleRandom}>Aleatorio</button>
                  <button className="btn btn-link p-0" onClick={() => setMode('personalizado')}>Personalizado</button>
                </div>
              </div>
            )}
          </div>

          {mode === 'personalizado' && (
            <input
              type="text"
              className="form-control mb-3"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          )}

          <button className="btn btn-success w-100" onClick={handleSubmit}>Crear</button>
        </div>
      </div>
    </div>
  
  )
}
