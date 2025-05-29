
import React, { useEffect, useState } from 'react'
import { useLabelsStore } from '../../../hooks/useLabelsStore';

export const LabelsModal = () => {

  
const [isOpen, setIsOpen] = useState(false);

const { labels, starLoadingLabels} = useLabelsStore();

  useEffect(() =>{
    starLoadingLabels();
  }, [])


  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-primary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-bs-toggle="dropdown"
      >
        Seleccionar etiquetas
      </button>

      {isOpen && (
        <ul className="dropdown-menu show">
          {labels.map((label) => {
            return (
              <li className='d-flex' key={label.idLabel}>
                
                <div 
                  className='me-3 ms-3'
                  style={{
                    backgroundColor: `${label.color}`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '25px',
                    border: '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                ></div>
                <div style={{cursor: 'pointer'}}>{label.name.toUpperCase()}</div>
                <hr />
              </li>
            )
          }
          
          )}
        </ul>
      )}
    </div>
    
  )
}
