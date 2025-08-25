
import React, { useEffect } from 'react'
import { useClientsStore } from '../../../../hooks/useClientsStore'

export const ClientName = ({idClient}) => {

  const { getClientbyClientID, clientsName } = useClientsStore();

  useEffect(() => {
    getClientbyClientID(idClient);
  }, [idClient]);

  const client = clientsName[idClient];

  return (
    
    <div className='text-primary'> {client?.name} {client?.lastName} </div>
    
  )
}
