import { useRateStore } from "../../../hooks/useRateStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const RateAddNew = () => {

  const {openRateModal} = useUiStore();
  const {setActiveRate} = useRateStore();


  const handleClickNew = () =>{
        setActiveRate({
            name: '',
            description: '',
        })
        openRateModal();
    }

  return (
    <button
      className="btn mx-auto"
       style={{ background: '#38b647', color: 'white' }}
      onClick={handleClickNew}>
      Añadir tarifa
    </button>
  )
}
