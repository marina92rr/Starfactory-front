import { useEffect, useState } from 'react'
import { useClientsStore } from '../../hooks/useClientsStore'
import { ClientAddNew, ClientModal } from '../components';
import { useNavigate } from 'react-router-dom';
import { LabelClient } from '../components/clientPage/LabelClient';
import { FilterClientByLabelModal } from '../components/label/FilterClientByLabelModal';
import { FilterClientsByLabel } from '../components/label/FilterClientsByLabel';
import { GetClientCancellation } from '../components/clientPage/cancellation/GetClientCancellation';
import { GetClientCancellationModal } from '../components/clientPage/cancellation/GetClientCancellationModal';
import { useLabelsStore } from '../../hooks/useLabelsStore';
import { useDispatch } from 'react-redux';
import userPhoto from '../../assets/user.png';
import { isColorDark } from '../../helpers/isColorDark';


export const ClientsPage = () => {

  const navigate = useNavigate();
  const { clientsLimit, filteredClientsByLabel, clearFilter, totalPages, starLoadingLimitPageClients, startLoadingLabelsOfClient } = useClientsStore();
  const { activeFilterLabels, labels, setClearActiveFilterLabels } = useLabelsStore();

  const [currentPage, setCurrentPage] = useState(1);  //Paginación

  // Decide qué lista mostrar
  const clientsToShow = filteredClientsByLabel.length > 0 ? filteredClientsByLabel : clientsLimit;

  //LCarga de clientes
  useEffect(() => {
    starLoadingLimitPageClients(currentPage);
   
  }, [currentPage]);

  // Carga de etiquetas para los clientes visibles
  useEffect(() => {
    // Para cada cliente visible, nos aseguramos de que sus etiquetas estén cargadas.
    clientsToShow.forEach(client => {
      startLoadingLabelsOfClient(client.idClient);
    });
  }, [clientsToShow]); // Se ejecuta cuando la lista de clientes a mostrar cambia.

  // Cuando seleccionas un cliente, navegamos a /clients/:ID
  const handleSelect = idClient => { navigate(`${idClient}`); };
  // Etiquetas filtradas
  const selectedLabels = labels.filter(label => activeFilterLabels.includes(label.idLabel));

  const clearFilterLabels = () => {
    clearFilter();
    setClearActiveFilterLabels();
  };
  return (

    <div className='m-5 slide-in-up'>
      {/* Título + botón nuevo cliente */}
      <div className='pt-5 d-flex align-items-center'>
        <h1>Clientes</h1>
        <ClientAddNew />
      </div>

      <ClientModal />

      {/* Filtros */}
      <div className="d-flex align-items-center justify-content-between my-3">
        <div className="d-flex align-items-center gap-3">
          <FilterClientsByLabel />
          <FilterClientByLabelModal />
          {filteredClientsByLabel.length > 0 && (
            <button className="btn btn-outline-danger" onClick={clearFilterLabels}>
              Quitar filtro
            </button>
          )}
          {selectedLabels.map(label => {
            const isDark = isColorDark(label.color);
            const textColor = isDark ? '#fff' : '#222';
            return (
              <li className="list-unstyled" key={label.idLabel}>
                <span
                  className="badge rounded-pill fw-semibold"
                  style={{
                    backgroundColor: label.color,
                    color: textColor,
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    minWidth: 'fit-content',
                    letterSpacing: '0.01em',
                    borderRadius: '12px',
                    lineHeight: '1.2',
                    marginRight: '4px'
                  }}
                >
                  {label.name}
                </span>
              </li>
            )
          })}
        </div>

        <GetClientCancellation />
        <GetClientCancellationModal />
      </div>

      {/* Lista de clientes */}
      <div className="d-flex flex-column">
        {clientsToShow.length === 0 ? (
          <div className="text-secondary mt-3">No hay clientes que coincidan con el filtro.</div>
        ) : (
          clientsToShow.map((client) => {

            const fullName = `${client.name} ${client.lastName}`;

            return (
              <div key={client.idClient} className="border p-4 rounded ">
                <div className="d-flex align-items-center gap-3">

                  {/* Imagen */}
                  <img
                    src={userPhoto}
                    className="rounded-circle"
                    alt="Usuario"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />

                  {/* Info del cliente */}
                  <div className="d-flex flex-column ">

                    {/* Nombre y etiquetas */}
                    <div
                      onMouseDown={() => handleSelect(client.idClient)}
                      className="fw-bold d-flex align-items-center gap-2"
                      style={{ cursor: "pointer" }}
                    >
                      {fullName}
                      <LabelClient idClient={client.idClient} />
                    </div>

                    {/* ID + email + teléfono */}
                    <div className="d-flex flex-wrap text-secondary mt-1 gap-3 ps-1" style={{ fontSize: '0.9em' }}>
                      <span>#{client.idClient}</span>
                      {client.email && (
                        <span className='d-flex align-items-center'>
                          <i className="bi bi-envelope-fill me-1"></i>
                          {client.email.toLowerCase()}
                        </span>
                      )}
                      {client.mainPhone && (
                        <span className='d-flex align-items-center'>
                          <i className="bi bi-telephone-fill me-1"></i>
                          {client.mainPhone}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Paginación */}
        {filteredClientsByLabel.length === 0 && (
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt; Anterior
            </button>

            <span className="align-self-center">
              {currentPage} de {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente &gt;
            </button>
          </div>
        )}
      </div>
    </div>


  );
};

export default ClientsPage;
