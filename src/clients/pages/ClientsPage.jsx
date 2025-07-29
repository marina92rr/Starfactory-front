import { useEffect, useState } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'
import { ClientAddNew, ClientModal } from '../components';
import { useNavigate } from 'react-router-dom';
import { LabelClient } from '../components/clientPage/LabelClient';
import { FilterClientByLabelModal } from '../components/label/FilterClientByLabelModal';
import { FilterClientsByLabel } from '../components/label/FilterClientsByLabel';
import { GetClientCancellation } from '../components/clientPage/cancellation/GetClientCancellation';
import { GetClientCancellationModal } from '../components/clientPage/cancellation/GetClientCancellationModal';
import { isColorDark } from '../../helpers/isColorDark';
import { useLabelsStore } from '../../hooks/useLabelsStore';
import { useDispatch } from 'react-redux';



export const ClientsPage = () => {

  const navigate = useNavigate();
 const dispatch = useDispatch();
  const { clientsLimit, starLoadingLimitClients, filteredClientsByLabel, clearFilter } = useClientsStore();
  const {activeFilterLabels, labels, clearActiveFilterLabels} = useLabelsStore();

  //LCarga de clientes
  useEffect(() => {
    starLoadingLimitClients();
  }, []);

  // Decide qué lista mostrar
  const clientsToShow = filteredClientsByLabel.length > 0 ? filteredClientsByLabel : clientsLimit;


  // Cuando seleccionas un cliente, navegamos a /clients/:ID
  const handleSelect = idClient => { navigate(`${idClient}`); };
  // Etiquetas filtradas
const selectedLabels = labels.filter(label => activeFilterLabels.includes(label.idLabel));

 const clearFilterLabels = () => {
  dispatch(clearFilter());            // Esto es correcto
  clearActiveFilterLabels();          // ✅ Aquí quita el dispatch
};
  return (

    <div className=' m-5' >
      <div className='pt-5 d-flex align-items-center' >
        <h1>Clientes</h1>
        <ClientAddNew />
      </div>
      <ClientModal />
      <div className="d-flex align-items-center justify-content-between my-3">
        <div className="d-flex align-items-center gap-3">
          <FilterClientsByLabel />
          <FilterClientByLabelModal />
          {filteredClientsByLabel.length > 0 && (
            <button className="btn btn-outline-danger" onClick={clearFilterLabels}>
              Quitar filtro
            </button>
          )}

           {selectedLabels.map(label => (
        <span key={label.idLabel} className="badge d-flex align-items-center" style={{ backgroundColor: label.color, color: '#fff' }}>
          {label.name}
        </span>
      ))}
         
        </div>
        <GetClientCancellation />
        <GetClientCancellationModal />
      </div>


      <div className="d-flex flex-column">
        {clientsToShow.length === 0 ? (
          <div className="text-secondary mt-3">No hay clientes que coincidan con el filtro.</div>
        ) : (
          clientsToShow.map((client, i) => {
            const fullName = `${client.name} ${client.lastName}`;
            return (
              <div key={i} className="border p-3 text-start">
                <div className="form">
                  <ul className="form-input" type="text" id={`client-${i}`} />
                  <div
                    key={client.idClient}
                    onMouseDown={() => handleSelect(client.idClient)}
                    className="form fw-bold p-2 d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    htmlFor={`client-${i}`}>
                    {fullName}
                    <LabelClient idClient={client.idClient} />
                  </div>
                </div>
                <div className='d-flex'>
                  {client.email && (
                    <div className='text-secondary ps-3 d-flex'>
                      <i className="bi bi-envelope-fill me-2"></i>
                      {client.email.toLowerCase()}
                    </div>
                  )}
                  {client.mainPhone && (
                    <div className='text-secondary ps-3 d-flex'>
                      <i className="bi bi-telephone-fill me-2"></i>
                      {client.mainPhone}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>


  );
};

export default ClientsPage;
