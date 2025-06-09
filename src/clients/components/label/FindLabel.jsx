
import React, { useState,useEffect } from 'react'
import { useClientsStore } from '../../../hooks/useClientsStore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const FindLabel = () => {


  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const { startFilteringClients, filter, filteredList } = useClientsStore();
  const [showDropdown, setShowDropdown] = useState(false);

  
  //Filtrar clientes
  const handleFilterChange = (e) => {
        const value = e.target.value;
        dispatch(startFilteringClients(value));
        setShowDropdown(value.trim().length > 0 && filteredList.length > 0);
  };


  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

    const handleFocus = () => {
    setShowDropdown(filter.trim().length > 0 && filteredList.length > 0);
  };

  // Cuando seleccionas un cliente, navegamos a /clients/:dni
  const handleSelect = dni => {
    navigate(`${dni}`);
    setShowDropdown(false);
  };
  return (
    
  <div className="mb-1 col-10 position-relative">
    
            <input
              type="text"
              placeholder="Buscar..."
              className='form-control rounded-3 bg-light-subtle p-1'
              style={{ outline: 'none', borderColor: 'gray' }}
              value={filter}
              onChange={handleFilterChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          {showDropdown && (
          <ul className="dropdown-menu show position-absolute w-100 z-3">
            {filteredList.map(client => (
              <li
                key={client.dni}
                className="dropdown-item"
                onMouseDown={() => handleSelect(client.dni)}
              >
                {client.name.toUpperCase()} {client.lastName.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
    </div>

)}
