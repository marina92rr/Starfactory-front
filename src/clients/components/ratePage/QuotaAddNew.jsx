import { useQuotaStore } from "../../../hooks/useQuotaStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const QuotaAddNew = () => {

  const {openQuotaModal} = useUiStore();
  const {setActiveQuota} = useQuotaStore();


  const handleClickNew = () =>{
        setActiveQuota({
            name: '',
            numSession: 0,
            numPeriods: 0,
            period: '',
            price: 0,
        })
        openQuotaModal();
    }

  return (
    <button
      className="btn btn-ms"
       style={{ background: '#38b647', color: 'white' }}
      onClick={handleClickNew}>
      Añadir cuota
    </button>
  )
}
