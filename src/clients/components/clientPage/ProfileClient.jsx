import React, { useEffect, useState } from 'react'
import { useClientsStore } from '../../../hooks/useClientsStore';
import { useParams } from 'react-router-dom';
import { ClientModal } from '../ClientModal';
import { ClientEddit } from '../ClientEddit';
import userPhoto from '../../../assets/user.png';
import  {formatDate}  from '../../../helpers/formatDate';


export const ProfileClient = () => {


  const { idClient } = useParams();
  const { starLoadingClientByID, activeClient } = useClientsStore();


  useEffect(() => {
    if (idClient) {
      starLoadingClientByID(idClient);
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row border rounded p-4 shadow-sm ">
        <div className=' d-flex justify-content-between align-items-start mb-3'>
          <h4>Datos personales</h4>
          <div>
            <ClientEddit />
            <ClientModal />
          </div>

        </div>
        <div className='pb-4'>
          <strong>Foto:</strong>
          <br />
          {/* Imagen */}
          <img
            src={userPhoto}
            className="rounded-circle mt-1"
            alt="Usuario"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        </div>

        {/* Columna izquierda */}
        <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">


          <div>
            <strong>Nombre:</strong>
            <p>{activeClient.name}</p>
          </div>
          <div>
            <strong>Telefono:</strong>
            <p>{activeClient.mainPhone}</p>
          </div>

        </div>

        {/* Columna central */}
        <div className="col-md-4">
          <div>
            <strong>Apellido:</strong>
            <p>{activeClient.lastName}</p>
          </div>

          <div>
            <strong>Fecha de alta:</strong>
            <p>{formatDate(activeClient.dateRegistration)}</p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-md-4">
          <div>
            <strong>Correo electrónico:</strong>
            <p>{activeClient.email.toLowerCase()}</p>
          </div>

          <div>
            <strong>Código Cliente:</strong>
            <p>{activeClient.idClient}</p>
          </div>
        </div>
      </div>

      {/* Sección de notificaciones */}
      {/*<div className="mt-4">
        <h5>Notificaciones</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="notif1" defaultChecked />
          <label className="form-check-label" htmlFor="notif1">
            Acepta recibir notificaciones de Star Factory Sevilla
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="notif2" defaultChecked />
          <label className="form-check-label" htmlFor="notif2">
            Acepta recibir notificaciones comerciales de terceros
          </label>
        </div>
      </div> */}
    </div>
  )
}
