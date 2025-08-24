
import React, { useEffect } from 'react'
import { useClientsStore } from '../../../../hooks/useClientsStore'

export const ClientName = ({idClient}) => {

  const { getClientbyClientID } = useClientsStore();

  //useEffect(() => {
  //  getClientbyClientID(idClient);
  //}, []);

  return (
    <div>
        <p></p>
    </div>
  )
}
