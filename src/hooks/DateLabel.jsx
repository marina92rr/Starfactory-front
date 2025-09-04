
import React from 'react'
import { formatDate } from '../helpers/formatDate'

export const DateLabel = ({ isoDate }) => {
    if (!isoDate) return null;

    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return (
        <span>
            {day}/{month}/{year}{" "} 
            <span className='text-secondary text-body-tertiary'>{hour}:{minutes}</span>
        </span>
    )
}
