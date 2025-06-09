
import React from 'react'

import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"



export const ClientEddit = () => {

    const {openModal} = useUiStore();   //Abrir modal
    const {setActiveClient, activeClient} = useClientsStore();

    const handleClickNew = () =>{
        setActiveClient({
            name: '',
            lastName:'',
            dni: '',
            email: '',
            mainPhone: '',
            optionalPhone: '',
            isTeacher: false
        })

        openModal();
    }


  return (
    <button
        className="btn btn-primary mx-auto"
        onClick={handleClickNew}>
        Editar cliente
    </button>
  )
}