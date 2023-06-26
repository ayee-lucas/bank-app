import React, { useEffect } from "react";
import {
  FaExchangeAlt,
  FaRegCreditCard,
  FaChartLine,
  FaHistory
} from "react-icons/fa";
import { MdOutlinePayments, MdAccountCircle } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const Dashboard: React.FC = () => {
  const account = {
    type: "Cuenta de Ahorros",
    accountNumber: "123456789",
    saldo: 10000,
  };
  const purchaseHistory = [
    { id: 1, title: "Compra de alimentos", amount: 50.0 },
    { id: 2, title: "Pago de servicios", amount: 80.0 },
    { id: 3, title: "Compra en línea", amount: 120.0 },
  ];
  const additionalServices = [
    { name: "Solicitar Préstamo", icon: GiReceiveMoney },
    { name: "Abrir Nueva Cuenta", icon: MdAccountCircle },
    { name: "Solicitar tarjetas", icon: FaRegCreditCard },
  ];

  const operations = [
    { name: "Transferencias", icon: FaExchangeAlt },
    { name: "Gestión de pagos", icon: MdOutlinePayments },
    { name: "Historial", icon: FaHistory },
  ];

  const transferSent = [
    { name: "John Doe", amount: 500 },
    { name: "Jane Smith", amount: 1000 },
  ];

  const transferReceived = [
    { name: "Alice Johnson", amount: 200 },
    { name: "Bob Williams", amount: 300 },
  ];

  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ingresos",
        data: [500, 1000, 700, 900, 1200, 800],
        backgroundColor: "#6C63FF",
      },
      {
        label: "Gastos",
        data: [400, 600, 800, 500, 700, 1000],
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="container p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lado Izquierdo */}
        <div>
          <div className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-lg font-bold mb-4">Información de la cuenta</h2>
            <p>
              <strong>Tipo de cuenta:</strong> {account.type}
            </p>
            <p>
              <strong>Número de cuenta:</strong> {account.accountNumber}
            </p>
            <p>
              <strong>Saldo:</strong> Q{account.saldo}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-lg font-bold mb-4">Transferencias enviadas</h2>
            {transferSent.length > 0 ? (
              <ul>
                {transferSent.map((transfer, index) => (
                  <li key={index}>
                    <strong>Nombre:</strong> {transfer.name},{" "}
                    <strong>Monto:</strong> ${transfer.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se han realizado transferencias enviadas.</p>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-lg font-bold mb-4">Transferencias recibidas</h2>
            {transferReceived.length > 0 ? (
              <ul>
                {transferReceived.map((transfer, index) => (
                  <li key={index}>
                    <strong>Nombre:</strong> {transfer.name},{" "}
                    <strong>Monto:</strong> ${transfer.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se han realizado transferencias recibidas.</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {operations.map((operation, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-colors duration-200"
              >
                {React.createElement(operation.icon, {
                  className: "w-6 h-6 text-indigo-500 mb-2",
                  style: { color: "#2E1065" },
                })}
                <p>{operation.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Derecho */}
        <div>
          <div className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-lg font-bold mb-4">
              Gráfica de ingresos y gastos
            </h2>
          </div>

           <div className="bg-white p-4 rounded shadow mb-8">
             <h2 className="text-lg font-bold mb-4">Servicios Adicionales</h2>
             <div className="grid grid-cols-3 gap-4">
               {additionalServices.map((service, index) => (
                 <div
                   key={index}
                   className="bg-white p-4 rounded shadow flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-colors duration-200"
                 >
                   {React.createElement(service.icon, {
                  className: "w-6 h-6 text-indigo-500 mb-2",
                  style: { color: "#2E1065" },
                })}
                   <p>{service.name}</p>
                 </div>
               ))}
             </div>
           </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Historial de compras</h2>
            {purchaseHistory.length > 0 ? (
              <ul>
                {purchaseHistory.map((purchase) => (
                  <li key={purchase.id}>
                    <strong>{purchase.title}:</strong> ${purchase.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se ha registrado ningún historial de compras.</p>
            )}
          </div>
         </div>
          
        </div>
      </div>
  );
};

export default Dashboard;
