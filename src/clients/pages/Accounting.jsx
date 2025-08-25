import { useEffect, useMemo, useState } from "react";
import { useProductClientStore } from "../../hooks/useProductClientStore";
import { DateNavigator } from "../../helpers/DateNavigator";
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from "../../helpers/formatDate";
import { capitalizeFirstWord } from "../../helpers/capitalizeFirstWord";
import { ClientName } from "../components/clientPage/sales/ClientName";
import { EditProductClient } from "../components/clientPage/accounting/EditProductClient";
import { DeleteProductClient } from "../components/clientPage/accounting/DeleteProductClient";
import { EditProductClientModal } from "../components/clientPage/accounting/EditProductClientModal";


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

                <table className="table border align-middle rounded-3 ">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="col-5">Concepto</th>
                            <th scope="col" className="col-2 ">Entrada (€)</th>
                            <th scope="col" className="col-2">Fecha Pago</th>
                            <th scope="col" className="col-2">Método de pago</th>
                            <th scope="col" className="col-2 ">Editar/Borrar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productsClientDate?.length ? productsClientDate.map((p, i) => (
                            <tr key={i}>
                                <td className="p-3 d-flex gap-2 align-items-center">
                                    {capitalizeFirstWord(p.name)} - <ClientName idClient={p.idClient} />
                                </td>

                                <td >{p.paymentMethod != null ? `${p.price} €` : '-'}</td>
                                <td>{formatDate(p.paymentDate)}</td>
                                <td>{p.paymentMethod != null ? capitalizeFirstWord(p.paymentMethod) : 'Pendiente'}</td>

                                {/* 👇 sin d-flex en el td */}
                                <td className=" text-nowrap">
                                    <div className="d-inline-flex gap-2">
                                        <EditProductClient productClient={p} />
                                        <EditProductClientModal productClient={p} />
                                        <DeleteProductClient productClient={p} />
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No hay ventas para la fecha seleccionada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </div>

    )
}
