
import React, { useState,useEffect } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const FindClient = () => {


  const dispath = useDispatch();
  const navigate = useNavigate();

  const { startFilteringClients, filter, filteredList } = useClientsStore();
  const [showDropdown, setShowDropdown] = useState(false);


  //Filtrar clientes
  const handleFilterChange = (client) => {
   
        const value = client.target.value;
        dispath(startFilteringClients(value));
        setShowDropdown(value.trim().length > 0 && filteredList.length > 0);
  };


  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false));
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
              type="input"
              placeholder='Buscar...'
              className='rounded-3 bg-light-subtle p-1'
              style={{ outline: 'none', borderColor: 'gray' }}
              value={filter}
              onChange={handleFilterChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          {showDropdown && (
          <ul className="dropdown-menu show pl-3"
               style={{
      maxHeight: '400px', // puedes ajustar la altura que quieras
      overflowY: 'auto',
    }}>
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
