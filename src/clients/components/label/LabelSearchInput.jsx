import { useState } from "react";


export const LabelSearchInput = ({ onSearch, placeholder = 'Buscar...' }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = e => {
    setInputValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className='form-control w-100'
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};