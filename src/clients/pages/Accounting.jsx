import { useEffect, useMemo, useState } from "react";
import { useProductClientStore } from "../../hooks/useProductClientStore";
import { DateNavigator } from "../../helpers/DateNavigator";
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from "../../helpers/formatDate";
import { capitalizeFirstWord } from "../../helpers/capitalizeFirstWord";
import { useClientsStore } from "../../hooks/useClientsStore";
import { ClientName } from "../components/clientPage/sales/ClientName";


export const Accounting = () => {

    const { startLoadProductsByDate, productsClientDate } = useProductClientStore();
    const [date, setDate] = useState(new Date()); // hoy por defecto

    // carga inicial y cada vez que cambie la fecha
    useEffect(() => {
        const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
        startLoadProductsByDate(iso);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);



    return (
        <div className='m-5'>
            <div className='pt-5 align-items-center'>
                <h1 className='mb-4'>Contabilidad</h1>
                <h6 className='mb-4'>Caja diaria</h6>
            </div>
            <div>
                <DateNavigator value={date} onChange={setDate} />
            </div>

            <div className="d-flex flex-column mt-3">

                <table className="table border ">
                    <thead className='border bg-light rounded-top p-3'>
                        <tr>
                            <th scope='col' className=" bg-light rounded-top p-3">Concepto</th>
                            <th scope='col' className=" bg-light rounded-top p-3">Entrada (€)</th>
                            <th scope='col' className="bg-light rounded-top p-3">Fecha</th>
                            <th scope='col' className="bg-light rounded-top p-3">Metodo de pago</th>
                            <th scope='col' className="bg-light rounded-top p-3">Editar/Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsClientDate?.length ? productsClientDate.map((p, i) => (
                            <tr key={i}>
                                <td className="p-3">
                                    {capitalizeFirstWord(p.name)}
                                    <ClientName idClient={p.idClient} />
                                </td>
                                <td className="p-3">{p.paymentMethod != null ? `${p.price} €` : '-'}</td>
                                <td className="p-3">{formatDate(p.buyDate)}</td>
                                <td className="p-3">
                                    {p.paymentMethod != null ? capitalizeFirstWord(p.paymentMethod) : 'Pendiente'}
                                </td>
                                <td className="p-3 d-flex gap-3">

                                    Eliminar editar
                                </td>
                            </tr>
                        )) : (
                            productsClientDate.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No hay ventas para la fecha seleccionada.
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

            </div>


        </div>

    )
}
