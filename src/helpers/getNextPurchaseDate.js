
export const getNextPurchaseDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed (enero = 0)
  
  const isFebruary = month === 1; // febrero
  const nextMonth = isFebruary ? month : month + 1; 
  const nextYear = nextMonth > 11 ? year + 1 : year; // si pasa de diciembre a enero

  const day = isFebruary ? 25 : 1;

  // Crear la nueva fecha (mes siguiente si no es febrero)
  const nextDate = new Date(nextYear, nextMonth % 12, day);

  // Formatear a dd/mm/yyyy
  const formatted = nextDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formatted;
};