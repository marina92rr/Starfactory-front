


export const getClientStatus = (dateCancellationRaw) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cancelDate = dateCancellationRaw ? new Date(dateCancellationRaw) : null;
  if (cancelDate) cancelDate.setHours(0, 0, 0, 0); // <-- IMPORTANTE

  const isScheduledCancellation = cancelDate && cancelDate > today;
  const isImmediateCancellation = cancelDate && cancelDate <= today;
  const isActive = !cancelDate;

  return {
    cancelDate,
    isScheduledCancellation,
    isImmediateCancellation,
    isActive,
  };
};
