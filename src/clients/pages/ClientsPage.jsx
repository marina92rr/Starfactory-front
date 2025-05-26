import React, { useEffect, useState } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'
import { ClientAddNew, ClientModal } from '../components';
import { LabelAddNew } from '../components/LabelAddNew';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const ClientsPage = () => {

  const dispath = useDispatch();
  const navigate = useNavigate();

  const { clients, starLoadingClients, startFilteringClients, filter, filteredList } = useClientsStore();
  const [showDropdown, setShowDropdown] = useState(false);

  
  //LCarga de clientes
  useEffect(() => {
    starLoadingClients();
  }, []);

  //Filtrar clientes
  const handleFilterChange = (client) => {
        const value = client.target.value;
        dispath(startFilteringClients(value));
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

    <div className='container-fluid col-9 mt-5' >
      <div className='py-5 d-flex'>
        <h1>Clientes</h1>
        <ClientAddNew />
      </div>
      <ClientModal />
      <div className='d-flex'>
        <div className='form-floating p-0 mb-2 d-flex'>
          <div className="mb-3 col-10 position-relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              value={filter}
              onChange={handleFilterChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          {showDropdown && (
          <ul className="dropdown-menu show pl-3">
            {filteredList.map(client => (
              <li
                key={client.dni}
                className="dropdown-item"
                onMouseDown={() => handleSelect(client.dni)}
              >
                {client.name} {client.lastName}
              </li>
            ))}
          </ul>
        )}
          </div>
          
        </div>
      </div>
      <div className="border rounded-top br-3 d-flex align-items-center p-3 bg-light">
        
      </div>

      <div className="d-flex flex-column">
        {clients.map((client, i) => {
          const fullName = `${client.name} ${client.lastName}`.toUpperCase();
          return (
            <div key={i} className="border p-3 text-start">
              <div className="form">
                <ul className="form-input" type="text" id={`client-${i}`} />
                <label
                key={client.dni}
                onMouseDown={() => handleSelect(client.dni)}
                className="form-label-label fw-bold ms-2" style={{cursor:"pointer"}} htmlFor={`client-${i}`}>
                  {fullName}
                </label>
              </div>
              <div className='d-flex'>
                <div className='text-secondary ps-3'>{client.email} </div>
                <div className='text-secondary ps-3'>{client.mainPhone}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>


  );
};

export default ClientsPage;
