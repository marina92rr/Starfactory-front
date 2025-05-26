
import React, { useState } from 'react'

//Colores por defecto:
const colors = [
  '#4B0082', '#800080', '#FF1493', '#FF4500', '#FFD700',
  '#9ACD32', '#00CED1', '#4682B4', '#2E8B57', '#A52A2A',
  '#1E90FF', '#20B2AA', '#FF6347', '#D2B48C', '#708090',
  '#087990', '#00FF7F', '#F0E68C', '#ADD8E6', '#B0C4DE'
];

export const LabelModal = ({ onCreate, onClose }) => {

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
   const handleSubmit = () => {
    onCreate({ name, description, color: selectedColor });
  };


  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="modal-title">Nueva etiqueta</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="mb-1 fw-bold">Color</label>
          <div style={{ position: 'relative' }} className="mb-2">
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
