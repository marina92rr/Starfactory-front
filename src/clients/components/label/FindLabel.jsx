
import React, { useState,useEffect } from 'react'
import { useClientsStore } from '../../../hooks/useClientsStore';
import { useDispatch } from 'react-redux';
import { useLabelsStore } from '../../../hooks/useLabelsStore';


// Componente para buscar y filtrar Labels por nombre
export const FindLabel = () => {

  const dispatch  = useDispatch();
 
  const {startFindLabels,filter, filteredList} = useLabelsStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  
  //Filtrar clientes
  const handleFilterChange = (e) => {
      const value = e.target.value.toUpperCase();
      setInputValue(value);
      dispatch(startFindLabels(value));
      setShowDropdown(value.trim().length > 0 && filteredList.length > 0);
  };


  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

    const handleFocus = () => {
    setShowDropdown(filter.trim().length > 0 && filteredList.length > 0);
  };

  // Cuando seleccionas un cliente, navegamos a /clients/:ID
  const handleSelect = idLabel => {
   console.log('Label seleccionado:', idLabel);
  };

  return (
    
  <div className="mb-1 col-10 position-relative">
    
            <input
              type="text"
              placeholder="Buscar Label..."
              className='form-control rounded-3 bg-light-subtle p-1'
              style={{ outline: 'none', borderColor: 'gray' }}
              value={inputValue}
              onChange={handleFilterChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          {showDropdown && (
          <ul className="dropdown-menu show position-absolute w-100 z-3">
            {filteredList.map(label => (
              <li
                key={label.idLabel}
                className="dropdown-item"
                onMouseDown={() => handleSelect(label.idLabel)}
              >
                {label.name}
              </li>
            ))}
          </ul>
        )}
    </div>

)}
