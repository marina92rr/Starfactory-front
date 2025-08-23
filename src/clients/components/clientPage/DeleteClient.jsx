import { useClientsStore } from '../../../hooks/useClientsStore';
import { useNavigate } from 'react-router-dom';

export const DeleteClient = () => {
    const { activeClient, startDeleteClient } = useClientsStore();
    const navigate = useNavigate();

    const handleDelete = async() => {
        const confirmDelete = window.confirm(`¿Estás seguro de querer eliminar La tarifa ${activeClient.name}?`);
        if (!confirmDelete) return;
        await startDeleteClient(activeClient);
        navigate('/');

    }

    return (

        <button
            className='btn btn-outline-danger'
            onClick={handleDelete}>
            Eliminar cliente
        </button>

    )
}
