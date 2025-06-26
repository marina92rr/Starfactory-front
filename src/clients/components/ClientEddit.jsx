
import React, { act } from 'react'

import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"



export const ClientEddit = () => {

    const {openClientModal} = useUiStore();   //Abrir modal
    const {setActiveClient, activeClient} = useClientsStore();

    const handleClickNew = () =>{
        setActiveClient(activeClient)
        openClientModal();
    }


  return (
    <button
        className="btn btn-primary mx-auto"
        onClick={handleClickNew}>
        Editar cliente
    </button>
  )
}