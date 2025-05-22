
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useClientsStore } from '../../hooks/useClientsStore';
import { useParams } from 'react-router-dom';
import { MenuClient } from '../components/clientPage/MenuClient';

export const ClientPage = () => {


  const { starLoadingClientByDNI, activeClient } = useClientsStore();
  const { dni } = useParams();


  //Carga datos automaticamente
  useEffect(() => {
    if (dni) {
      starLoadingClientByDNI(dni);
    }
  }, [dni, starLoadingClientByDNI]);


  return (
    <>
      <div className="container-fluid col-9 mt-5 pt-5">
        <div className="d-flex">
          <h1 className="me-3">{activeClient?.name} {activeClient?.lastName}</h1>
          <div>{activeClient?._id}</div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <div className="text-secondary me-3">{activeClient?.email}</div>
          <div className="text-secondary">{activeClient?.mainPhone}</div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <p className="me-2">Etiquetas</p>
          <button className="btn btn-outline-primary">Etiquetas</button>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <button className="btn btn-primary me-3">Nueva Venta</button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Opciones
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button">Action</button></li>
            </ul>
          </div>
        </div>

        <MenuClient/>
        <Outlet/>
      </div>
    </>

  )
}
