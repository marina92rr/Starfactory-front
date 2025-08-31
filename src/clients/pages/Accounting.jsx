import { useEffect, useMemo, useState } from "react";
import { useProductClientStore } from "../../hooks/useProductClientStore";
import { DateNavigator } from "../../helpers/DateNavigator";
import { formatDate } from "../../helpers/formatDate";
import { capitalizeFirstWord } from "../../helpers/capitalizeFirstWord";
import { ClientName } from "../components/clientPage/sales/ClientName";
import { EditProductClient } from "../components/clientPage/accounting/EditProductClient";
import { DeleteProductClient } from "../components/clientPage/accounting/DeleteProductClient";
import { EditProductClientModal } from "../components/clientPage/accounting/EditProductClientModal";
import { IVAProduct } from "../../helpers/IVAProduct";


export const Accounting = () => {

    const { startLoadProductsByDate, productsClientDate } = useProductClientStore();
    const [date, setDate] = useState(new Date()); // hoy por defecto

    // carga inicial y cada vez que cambie la fecha
    useEffect(() => {
        const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
        startLoadProductsByDate(iso);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const { totalCash, totalTPV, totalAll, hasPaidSales } = useMemo(() => {
        const toNum = (v) => Number(v ?? 0);

        // Solo ventas pagadas (tienen método de pago)
        const paid = (productsClientDate ?? []).filter(p => p?.paymentMethod != null);

        // Normaliza el método de pago a minúsculas para comparar
        const isCash = (m) => /efectivo/i.test(m);
        const isTPV = (m) => /tarjeta/i.test(m);

        const sum = (arr) => arr.reduce((acc, p) => {
            const price = p.price;
            const discount = p.discount;
            return acc + (price - discount);
        }, 0);

        const cash = sum(paid.filter(p => isCash(p.paymentMethod)));
        const tpv = sum(paid.filter(p => isTPV(p.paymentMethod)));
        const total = cash + tpv;

        return {
            totalCash: cash,
            totalTPV: tpv,
            totalAll: total,
            hasPaidSales: paid.length > 0
        };
    }, [productsClientDate]);



    return (
        <div className='m-5 fade-in'>
            <div className='pt-5 align-items-center'>
                <h1 className='mb-4'>Contabilidad</h1>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <div>
                        <h6 className='mb-4'>Caja diaria</h6>
                        <DateNavigator value={date} onChange={setDate} />
                    </div>
                </div>
                <div className="col-4 ">
                    <table className="table border align-middle rounded mt-3">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="col-1 text-center">Total Efectivo</th>
                                <th scope="col" className="col-1 text-center">Total TPV</th>
                                <th scope="col" className="col-1 text-center">IVA</th>
                                <th scope="col" className="col-1 text-center">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasPaidSales ? (
                                <tr>
                                    <td className="text-center">{totalCash.toFixed(2)} €</td>
                                    <td className="text-center"> {totalTPV.toFixed(2)} €</td>
                                    <td className="text-center"> {IVAProduct(totalAll).iva} €</td>
                                    <td className="fw-bold text-center"> {totalAll.toFixed(2)} €</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-muted text-center">No hay ventas pagadas en esta fecha</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>



            <div className="d-flex flex-column mt-3">

                <table className="table border align-middle rounded-3 ">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="col-5">Concepto</th>
                            <th scope="col" className="col-2 ">Entrada (€)</th>
                            <th scope="col" className="col-2 ">IVA (€)</th>
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
                                <td >{p.paymentMethod != null ? `${p.price - p.discount} €` : '-'}</td>
                                <td >{p.paymentMethod != null ? `${IVAProduct(p.price - p.discount).iva} €` : '-'}</td>
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
