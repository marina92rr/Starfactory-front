
export const getNextPurchaseDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed (enero = 0)
  
  const isFebruary = month === 1; // febrero
  const day = isFebruary ? 25 : 30;

  // Crear la nueva fecha
  const nextDate = new Date(year, month, day);

  // Formatear a dd/mm/yyyy
  const formatted = nextDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formatted;
};