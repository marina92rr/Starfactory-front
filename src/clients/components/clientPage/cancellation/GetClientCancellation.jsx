import { useEffect } from "react";
import { useClientsStore } from "../../../../hooks/useClientsStore";
import { useUiStore } from "../../../../hooks/useUiStore";

export const GetClientCancellation = () => {


    const {loadClientsWithScheduledCancellation, scheduledCancellationClients} = useClientsStore();
    const {openCancellationModal} = useUiStore();

    useEffect(() => {
        loadClientsWithScheduledCancellation();
    }, []);

    const handleClick = () => {
       openCancellationModal();
    }

  return (
   <span className="text-nowrap text-primary " 
   style={{ cursor: 'pointer' }}
   onClick={handleClick}
   >
        Bajas programadas ({scheduledCancellationClients.length})
    </span>
  );
};
