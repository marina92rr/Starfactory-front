

import React, { useState } from 'react';
import { useClientsStore } from '../../hooks/useClientsStore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const FindClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startFilteringClients, filteredList } = useClientsStore();
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtrar clientes
  const handleFilterChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    if (value.trim().length > 0) {
      dispatch(startFilteringClients(value.toUpperCase()));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false));
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 3 && filteredList.length > 0) {
      setShowDropdown(true);
    }
  };

  // Cuando seleccionas un cliente, navegamos a /clients/:ID
  const handleSelect = idClient => {
    navigate(`${idClient}`);
    setShowDropdown(false);
    setInputValue('');
  };

  return (
    <div className="mb-1 col-10 position-relative">
      <input
        type="input"
        placeholder='Buscar...'
        className='rounded-3 bg-light-subtle p-1'
        style={{ outline: 'none', borderColor: 'gray' }}
        value={inputValue}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {showDropdown && filteredList.length > 0 && (
        <ul className="dropdown-menu show pl-3"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
          {filteredList.map(client => (
            <li
              key={client.idClient}
              className="dropdown-item"
              onMouseDown={() => handleSelect(client.idClient)}
            >
              {client.name} {client.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
