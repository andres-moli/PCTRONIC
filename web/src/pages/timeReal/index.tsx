import React, { useState, useEffect } from 'react';
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, ZoomControl } from "react-leaflet";
import { gql, useSubscription } from '@apollo/client';
const MESSAGE_RECEIVED = gql`
  subscription {
    messageReceived {
      id
      senderId
      content
      timestamp
    }
  }
`;

const TimeRealPage: React.FC = () => {
  const { data, error, loading } = useSubscription(MESSAGE_RECEIVED);
  console.log(error)
  // Datos iniciales de las coordenadas
  const initialRouters = [
    {
      coordinate: [10.94533657660035, -74.8040790035062],
      name: 'Juan Pérez',  // Nombre del trabajador
    },
    {
      coordinate: [10.94545057660100, -74.8041990035065],
      name: 'Ana Gómez',  // Nombre del trabajador
    },
    {
      coordinate: [10.94560057660120, -74.8043500035070],
      name: 'Carlos Rodríguez',  // Nombre del trabajador
    },
    {
      coordinate: [10.94576057660140, -74.8044700035072],
      name: 'María López',  // Nombre del trabajador
    },
    {
      coordinate: [10.94592057660160, -74.8046000035074],
      name: 'Pedro Martínez',  // Nombre del trabajador
    },
  ];

  // Estado de las rutas que se actualiza a medida que se mueve cada marcador
  const [routers, setRouters] = useState(initialRouters);
  React.useEffect(() => {
    console.log(",>>><",data)

    if (data && data.messageReceived) {
      console.log(data)
      // setMessages(prevMessages => [...prevMessages, data.messageReceived]);
    }
  }, [data]);
  // Función para mover las coordenadas aleatoriamente
  const moveCoordinates = () => {
    const newRouters = routers.map((router) => {
      // Mover ligeramente la latitud y longitud para simular el movimiento
      const newLatitude = router.coordinate[0] + (Math.random() - 0.5) * 0.0001;
      const newLongitude = router.coordinate[1] + (Math.random() - 0.5) * 0.0001;

      return {
        ...router,
        coordinate: [newLatitude, newLongitude],
      };
    });

    setRouters(newRouters);
  };

  // Simular el movimiento cada segundo
  useEffect(() => {
    const interval = setInterval(moveCoordinates, 2000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [routers]);

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card className="w-50 md:w-30 lg:w-50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ver usuarios en tiempo real</h1>
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Gestiona y observa a tus usuarios en tiempo real</h3>
            </div>
          </div>
        </Card>
        <Card>
          <MapContainer
          // @ts-ignore
            center={routers[0].coordinate}
            zoom={13}
            style={{ height: '500px' }}
          >
            {/* Capa de fondo del mapa */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Control de zoom */}
            <ZoomControl position="topright" />

            {/* Marcadores de las visitas */}
            {routers?.map((router, index) => (
              // @ts-ignore
              <Marker key={index} position={router.coordinate}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                  {router.name}
                </Tooltip>
                {/* <Popup>{`${router.name}`}</Popup> */}
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TimeRealPage;
