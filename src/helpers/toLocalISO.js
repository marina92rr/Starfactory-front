export const toLocalISO = (x) => {
  if (typeof x === 'string') return x.slice(0, 10);      // ya viene ISO-ish
  const d = x ? new Date(x) : new Date();                // Date o parseable
  const t = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return t.toISOString().slice(0, 10);                   // "YYYY-MM-DD"
};