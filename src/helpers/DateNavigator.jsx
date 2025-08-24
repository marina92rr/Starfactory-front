// src/components/common/DateNavigator.jsx
import React, { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';


export const DateNavigator = ({
  value,
  onChange,
  locale = es,                // cambia a 'undefined' si prefieres inglés
  displayFormat = 'd MMM yyyy' // p.ej. "5 feb 2025"
}) => {
  const [open, setOpen] = useState(false);

  const shownDate = useMemo(() => value ?? new Date(), [value]);
  const label = useMemo(() => format(shownDate, displayFormat, { locale }), [shownDate, displayFormat, locale]);

  const go = (delta) => onChange(addDays(shownDate, delta));
  return (
    <div className="d-inline-flex align-items-center gap-2">
      <div className='bg-light rounded border d-flex'>
        <button
        type="button"
        className="btn "
        onClick={() => go(-1)}
        aria-label="Día anterior"
      >
        ‹
      </button>

      <button
        type="button"
        className="btn "
        onClick={() => setOpen((v) => !v)}
        aria-label="Elegir fecha"
        style={{ minWidth: 160 }}
      >
        {label}
      </button>

      <button
        type="button"
        className="btn "
        onClick={() => go(1)}
        aria-label="Día siguiente"
      >  ›
      </button>
      </div>
      

      {/* DatePicker "flotante" controlado por open */}
      {open && (
        <DatePicker
          selected={shownDate}
          onChange={(d) => { setOpen(false); onChange(d); }}
          inline
          locale={locale}
          maxDate={new Date(8640000000000000)} // evita warning de rango
        />
      )}
    </div>
  )
}
