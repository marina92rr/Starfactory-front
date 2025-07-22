
import React, { act } from 'react'

import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"



export const ClientEddit = () => {

  const { openClientModal } = useUiStore();   //Abrir modal
  const { setActiveClient, activeClient } = useClientsStore();

  const handleClickNew = () => {
    setActiveClient(activeClient)
    openClientModal();
  }


  return (
    <span
      className="text-primary ms-auto d-flex align-items-center cursor-pointer"
      onClick={handleClickNew}
      style={{ userSelect: 'none', cursor: 'pointer' }}
    >
      <i className="bi bi-pencil-square me-1"></i>
      Editar
    </span>
  )
}