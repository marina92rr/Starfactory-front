
import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useProductStore } from '../../../../hooks/useProductStore';
import { useQuotaStore } from '../../../../hooks/useQuotaStore';

// Componente para buscar y filtrar Labels por nombre
export const FindSales = ({ onInputChange }) => {

   const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const { startFindProducts } = useProductStore();
  const { startFindQuotas } = useQuotaStore();

   const handleFilterChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    onInputChange(value); // ✅ notifica a AddNewSales
    dispatch(startFindProducts(value));
    dispatch(startFindQuotas(value));
  };

  return (
    <input
      type="text"
      placeholder="Buscar producto o cuota..."
      className="form-control rounded-3 bg-light-subtle p-2 mb-3"
      value={inputValue}
      onChange={handleFilterChange}
      autoComplete="off"
    />
  );
}
