import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import clientsApi from '../../api/clientsApi';

// Registrar los componentes necesarios de Chart.js para que funcionen los gráficos
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

/**
 * Página de resumen mensual de ventas.
 *
 * Esta vista consulta al backend un resumen mensual de las ventas pagadas y
 * muestra un gráfico de barras con el importe total facturado por mes.  Además,
 * si encuentra datos del mes más reciente, genera un gráfico de tarta con la
 * distribución de ventas por método de pago para dicho mes.  La interfaz
 * utiliza una sencilla animación CSS para suavizar la entrada de la página.
 */
export const MonthlySummary = () => {
  const [summary, setSummary] = useState([]);
  const [methodSummary, setMethodSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar resumen mensual y resumen por método de pago en paralelo
    const fetchSummaries = async () => {
      try {
        setLoading(true);
        const [monthlyRes, methodRes] = await Promise.all([
          clientsApi.get('/productclient/summary/monthly'),
          clientsApi.get('/productclient/summary/payment-method'),
        ]);
        if (monthlyRes.data?.summary) {
          setSummary(monthlyRes.data.summary);
        }
        if (methodRes.data?.summary) {
          setMethodSummary(methodRes.data.summary);
        }
      } catch (err) {
        console.error('Error fetching summaries:', err);
        setError('Error cargando resumen mensual');
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, []);

  // Construir datos del gráfico de barras
  const barData = {
    labels: summary.map((s) => s._id),
    datasets: [
      {
        label: 'Total facturado (€)',
        data: summary.map((s) => Number(s.totalSales.toFixed(2))),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,        // 👈 evita colapsar por alto
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ventas mensuales' },
    },
  };

  // Construir datos del gráfico de tarta basado en el resumen por método de pago
  const pieData = {
    labels: methodSummary.map((m) => m._id),
    datasets: [
      {
        data: methodSummary.map((m) => Number(m.totalSales.toFixed(2))),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8ED1FC', '#AA88DD'],
      },
    ],
  };

  return (

    <div style={{ marginTop: '100px' }}>
      <div className='m-5 fade-in'>

        <h1 className='mb-4'>Resumen Mensual de Ventas</h1>
        {loading && <p>Cargando resumen...</p>}
        {error && <p className='text-danger'>{error}</p>}
        {!loading && !error && summary.length === 0 && <p>No hay datos de ventas mensuales.</p>}
        {!loading && !error && summary.length > 0 && (
          <div className='d-flex flex-wrap gap-4 align-items-start'>
            <div className='mb-5 me-5' style={{ width: 'min(100%, 600px)' }}>
              <div style={{ height: 320 }}>
                <Bar data={barData} options={barOptions} height={320} />
              </div>
            </div>
            {methodSummary.length > 0 && (
              <div
                className='mb-5 ms-5'
                style={{ width: 'min(100%, 500px)' }}>
                <h5>Distribución por método de pago</h5>
                <div style={{ height: 280 }}>
                  <Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true }} height={280} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};