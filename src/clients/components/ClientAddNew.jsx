import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const ClientAddNew = () => {

    const {openModal} = useUiStore();   //Abrir modal
    const {setActiveClient} = useClientsStore();

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
        className="btn btn-primary"
        onClick={handleClickNew}>
        Nuevo cliente
    </button>
  )
}

