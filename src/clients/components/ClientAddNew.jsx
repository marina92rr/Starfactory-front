import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const ClientAddNew = () => {

    const {openClientModal} = useUiStore();   //Abrir modal
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

        openClientModal();
    }


  return (
    <button
        className="btn btn-primary mx-auto"
        onClick={handleClickNew}>
        Nuevo cliente
    </button>
  )
}

