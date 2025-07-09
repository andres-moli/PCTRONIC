import { useState } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import RegisterCategoriesModal from "../../components/modals/modal-categories/modal-add-categories";
import CategoriesTable from "../../components/categories/tables/categorie-table";
import ActivityTable from "../../components/activity/tables/activity-table";
import UserSelect from "../../components/users/select/user-select";
import { StatusVisitEnum, useVisitsLazyQuery } from "../../domain/graphql";
import { MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { toast } from "sonner";

const RoutersPage: React.FC = () => {
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  // const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  // const [endDate, setEndDate] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  const [routers, setRouters] = useState<any[]>();
  const [selectUser, setSelectUser] = useState<string>("");
  // const openRegisterModal = () => setIsRegisterModalOpen(true);
  // const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const [visit] = useVisitsLazyQuery()
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStartDate(value);
  };
  const handelDelteFilter = async () => {
    setSelectUser('')
    setStartDate('')
    setRouters(undefined)
  }
  const handleFilterSubmit = async () => {
    const toastId = toast.loading('Cargando rutas...')
    const {data, error} = await visit({
      variables: {
        where: {
          user:{
            _eq: selectUser
          },
          createdAt: {
            _between: [`${startDate} 00:00:00`, `${startDate} 23:59:59`]
          }
        },
        pagination: {
          skip: 0,
          take: 999999
        }
      }
    }) 
    if(error){
      toast.dismiss(toastId)
      toast.error('!Oops! Hubo un erro al consultar las rutas ' + error.message)
    }
    const routers = data?.visits.map(visit => {
      return {
        coordinate: [visit.latitude, visit.longitude],
        name: visit.description,
      }
    })
    setRouters(routers)
    toast.dismiss(toastId)
  };


  return (
    <MainLayout>
      <div className="space-y-4">
        <Card className="w-50 md:w-30 lg:w-50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ver rutas</h1>
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Gestiona y observa tus rutas</h3>
            </div>
          </div>
        </Card>
        <Card className="w-full md:w-full lg:w-full">
        <div className="w-full md:w-full lg:w-full">
          <div className="flex justify-between items-center space-x-4">
            {/* Filtro de Estado */}
            <div className="flex space-x-4 flex-1">
              <UserSelect onSelect={(e)=>setSelectUser(e)} clear={selectUser == ''}/>
            </div>

            {/* Filtro de Rango de Fechas */}
            <div className="flex space-x-4 flex-1">
              <div className="w-1/2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filtro de Descripción */}

            {/* Botón de Filtrar */}
            <div className="flex items-end">
              <button
                onClick={handleFilterSubmit}
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver rutas
              </button>
            </div>
            <div className="flex items-end">
              <button
                onClick={handelDelteFilter}
                type="button"
                className="bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
        </Card>
        <Card>
          {
            routers && routers.length > 0 
            ?
            (
            <>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Se encontraron {routers.length} actividades</h3>
                <MapContainer
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
      
                {/* Línea de ruta */}
                <Polyline positions={routers?.map(x => x.coordinate)} color="blue" weight={4} opacity={0.7} />
      
                {/* Marcadores de las visitas */}
                {routers?.map((coordinate, index) => (
                  <Marker key={index} position={coordinate.coordinate}>
                    {/* <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                      {`Visita  #${index + 1}`}
                    </Tooltip> */}
                    <Popup>{`${coordinate.name}`}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
            )
            :
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">No hay rutas para el dia selecionado</h1>
          }
        </Card>

      </div>
      {/* <RegisterCategoriesModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} /> */}
    </MainLayout>
  );
};

export default RoutersPage;
