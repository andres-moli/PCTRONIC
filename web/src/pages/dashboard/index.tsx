import React, { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FaUsers, FaChartLine, FaRegCalendarAlt, FaClipboardList, FaChartBar } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";

// Registrar los elementos necesarios de Chart.js
ChartJS.register(
  CategoryScale,   // Para los ejes X y Y en gráficos de barras o líneas
  LinearScale,     // Para el eje Y en gráficos de barras o líneas
  PointElement,    // Para los puntos (necesario para los gráficos de líneas)
  LineElement,     // Para la línea (necesario para gráficos de líneas)
  BarElement,      // Para las barras (necesario para gráficos de barras)
  Title,           // Títulos de los gráficos
  Tooltip,         // Mostrar tooltips al pasar el ratón sobre los puntos o barras
  Legend           // Para mostrar la leyenda
);

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalVisits: 0,
    totalUser: 23,
    visitsByMonth: [],
    visitsByStatus: { Active: 0, Inactive: 0, Pending: 0 },
    visitsByWorker: [
      { worker: "Juan Pérez", visits: 120 },
      { worker: "Ana Gómez", visits: 100 },
      { worker: "Carlos López", visits: 80 },
      { worker: "Lucía Martínez", visits: 90 },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      setStats({
        totalVisits: 3500,
        totalUser: 24,
        visitsByMonth: [
          { month: "Enero", count: 300 },
          { month: "Febrero", count: 450 },
          { month: "Marzo", count: 500 },
          { month: "Abril", count: 400 },
          { month: "Mayo", count: 600 },
        ],
        visitsByStatus: { Active: 2500, Inactive: 800, Pending: 200 },
        visitsByWorker: [
          { worker: "Juan Pérez", visits: 120 },
          { worker: "Ana Gómez", visits: 100 },
          { worker: "Carlos López", visits: 80 },
          { worker: "Lucía Martínez", visits: 90 },
        ],
      });
    };

    fetchData();
  }, []);

  // Datos para el gráfico de visitas por mes
  const visitsByMonthData = {
    labels: stats.visitsByMonth.map((item: any) => item.month),
    datasets: [
      {
        label: "Visitas por Mes",
        data: stats.visitsByMonth.map((item: any) => item.count),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  // Datos para el gráfico de visitas por estado
  const visitsByStatusData = {
    labels: Object.keys(stats.visitsByStatus),
    datasets: [
      {
        label: "Visitas por Estado",
        data: Object.values(stats.visitsByStatus),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card Total de Visitas */}
          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total de usuarios</h2>
              <p className="text-xl font-bold">{stats.totalUser}</p>
            </div>
            <FaUsers className="text-4xl text-blue-500" />
          </Card>
          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total de Actividades</h2>
              <p className="text-xl font-bold">{stats.totalVisits}</p>
            </div>
            <FaChartBar  className="text-4xl text-blue-500" />
          </Card>

          {/* Card Visitas Activas */}
          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Visitas Activas</h2>
              <p className="text-xl font-bold">{stats.visitsByStatus.Active}</p>
            </div>
            <FaChartLine className="text-4xl text-green-500" />
          </Card>

          {/* Card Visitas Inactivas */}
          <Card className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Visitas Inactivas</h2>
              <p className="text-xl font-bold">{stats.visitsByStatus.Inactive}</p>
            </div>
            <FaRegCalendarAlt className="text-4xl text-red-500" />
          </Card>
        </div>

        {/* Gráfico Visitas por Mes */}
        <Card className="w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Visitas por Mes</h2>
          <Line data={visitsByMonthData} />
        </Card>

        {/* Gráfico Visitas por Estado */}
        <Card className="w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Visitas por Estado</h2>
          <Bar data={visitsByStatusData} />
        </Card>

        {/* Tabla Visitas por Trabajador */}
        <Card className="w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Visitas por Trabajador (Mes Actual)</h2>
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Trabajador</th>
                <th scope="col" className="px-6 py-3">Visitas</th>
              </tr>
            </thead>
            <tbody>
              {stats.visitsByWorker.map((worker: any, index: number) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{worker.worker}</td>
                  <td className="px-6 py-4">{worker.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
