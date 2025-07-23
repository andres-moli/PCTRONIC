import { useEffect, useState } from "react";
import Card from "../../cards/Card";
import { BsEyeFill } from "react-icons/bs";
import { MdApps } from "react-icons/md";
import { TbMapShare } from "react-icons/tb";
import { MetadataPagination, OrderTypes, StatusVisitEnum, useVisitsQuery, Visit, VisitComent, VisitComentTypeEnum } from "../../../domain/graphql";
import dayjs from "dayjs";
import { PaginationTable } from "../../table/PaginationTable";
import { toast } from "sonner";
import UserSelect from "../../users/select/user-select";
import TableSkeleton from "../../esqueleto/table";
import ViewActivityModal from "../modal/view-activity";
import { BiCommentCheck, BiSolidCommentError } from "react-icons/bi";
import CommentModal from "../modal/comment-activity";
import MapsComponentComment from "../../Maps";
export const getRandomColor = (status: StatusVisitEnum) => {
  if (status === StatusVisitEnum.Initiated) {
    return 'orange'; // Naranja claro
  }
  if (status === StatusVisitEnum.Realized) {
    return 'green'; // Verde claro
  }
  return '#b2ebf2'; // Azul claro
};

export const getStatusLabel = (status: StatusVisitEnum) => {
  switch (status) {
    case StatusVisitEnum.Initiated:
      return 'Iniciada';
    case StatusVisitEnum.Realized:
      return 'Realizada';
    default:
      return 'Desconocida';
  }
};
const FormatTimeToMinut = (vist: Visit) => {
  const startTime = dayjs(vist.visitItem.find((x) => x.type === VisitComentTypeEnum.Inicio)?.dateFull || new Date())
  const endTime = dayjs(vist.visitItem.find((x) => x.type === VisitComentTypeEnum.Fin)?.dateFull || new Date())

  const totalMinutos = endTime.diff(startTime, 'minutes')
  return totalMinutos
}
const ActivityTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectUser, setSelectUser] = useState<string>("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCommentMapModalOpen, setIsCommentMapModalOpen] = useState(false);


  const [visit, setVisit] = useState<Visit>();
  const [visitComment, setVisitComment] = useState<VisitComent[]>();
  const [visitCommentMap, setVisitCommentMap] = useState<VisitComent[]>();




  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  
  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);

  const openMapCommentModal = () => setIsCommentMapModalOpen(true);
  const closeMapCommentModal = () => setIsCommentMapModalOpen(false);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatusFilter(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0)
  const {data, loading, refetch} = useVisitsQuery({
    variables: {
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      pagination: {
        skip,
        take: take
      }
    }
  })
  const handelDelteFilter = async () => {
    const toastId = toast.loading('Borrando filtrado...')
    setSkip(0)
    setStatusFilter('')
    setStartDate('')
    setEndDate('')
    setDescription('')
    setSelectUser('')
    try {
      await refetch({
        orderBy: {
          createdAt: OrderTypes.Desc
        },
        pagination: {
          skip,
          take: take
        },
        where: {}
      })
    }catch {
      toast.error('¡Oops! Ha ocurrido un error al intentar filtrar. Por favor, inténtelo más tarde.')
    }
    toast.dismiss(toastId)
  }
  const handleFilterSubmit = async () => {
    const toastId = toast.loading('Filtando informacion...')
    setSkip(0)
    try {
      await refetch({
        where: {
          ...(statusFilter ? { status: { _eq: statusFilter } } : {}),
          ...(startDate && endDate ? { createdAt: { _between: [`${startDate} 00:00:00`, `${endDate} 23:59:59`] } } : {}),
          ...(description ? { description: { _contains: description } } : {}),
          ...(selectUser ? {user: {_eq: selectUser}} : {})
        },
        orderBy: {
          createdAt: OrderTypes.Desc
        },
        pagination: {
          skip,
          take: take
        }
      })
    } catch {
      toast.error('¡Oops! Ha ocurrido un error al intentar filtrar. Por favor, inténtelo más tarde.')
    }
    toast.dismiss(toastId)
    console.log("Filtros aplicados:", { statusFilter, startDate, endDate, description,selectUser });
  };
  const onShow = (visit: Visit) => {
    setVisit(visit)
    openRegisterModal()
  }
  const onShowComment = (visitComent: VisitComent[]) => {
    setVisitComment(visitComent)
    openCommentModal()
  }
  const onShowMapComment = (visitComent: VisitComent[]) => {
    setVisitCommentMap(visitComent)
    openMapCommentModal()
  }
  const findMockedLocationComent = (visitComent: VisitComent[]) => {
    console.log(visitComent)
    const isMockedInComent = visitComent.find((coment) => coment.mocked);
    console.log(isMockedInComent ? true : false)
    return isMockedInComent ? true : false
  }
  return (
      <>
        <div className="w-full md:w-full lg:w-full">
          <div className="flex justify-between items-center space-x-4">
            {/* Filtro de Estado */}
            <div className="flex space-x-4 flex-1">
              <UserSelect onSelect={(e)=>setSelectUser(e)} clear={selectUser == ''}/>
            </div>
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
              <select
                name="status"
                id="status"
                value={statusFilter}
                onChange={()=>handleFilterChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              >
                <option selected value={''}>Seleccionar Estado</option>
                <option value={StatusVisitEnum.Initiated}>Iniciada</option>
                <option value={StatusVisitEnum.Realized}>Realizada</option>
              </select>
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
              <div className="w-1/2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Fin</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filtro de Descripción */}
            <div className="flex-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={handleFilterChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Escribe una descripción"
              />
            </div>

            {/* Botón de Filtrar */}
            <div className="flex items-end">
              <button
                onClick={handleFilterSubmit}
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Filtrar
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        {/* Filtro Card */}
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                loading
                ?
                <TableSkeleton columns={6} rows={6}/>
                :
                <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Proyecto
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripción
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Mapa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.visits.map((visit)=> {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{visit.user.fullName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{dayjs(visit.dateVisit).format('YYYY-MM-DD HH:mm')}</td>
                        <td>
                          {visit.type ? visit.type.name : 'SIN TIPO'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{visit.project ? visit.project.name : 'SIN PROYECTO'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{visit.description}</td>
                        <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className="h-2.5 w-2.5 rounded-full me-2"
                            style={{ backgroundColor: getRandomColor(visit.status) }}
                          ></div>
                          {getStatusLabel(visit.status)} {/* Mostrar estado en español */}
                        </div>
                      </td>
                        <td className="whitespace-nowrap px-6 py-4">
                           <BsEyeFill className="w-5 h-8 text-gray-500 mr-3 cursor-pointer"title="Ver Más" 
                               // @ts-ignore
                           onClick={()=> onShow(visit)}/>
                           {
                               // @ts-ignore
                            findMockedLocationComent(visit.visitItem)
                            ?
                              <BiSolidCommentError className="w-5 h-8 text-red-500 mr-3 cursor-pointer" 
                              title="Ver Comentario" 
                               // @ts-ignore
                              onClick={()=> onShowComment(visit.visitItem)}/> 
                            :
                              
                              <BiCommentCheck className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver Comentario" 
                               // @ts-ignore
                              onClick={()=> onShowComment(visit.visitItem)}/>
                            }
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {/*  @ts-ignore*/}
                          <TbMapShare className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver Mapa" onClick={()=> onShowMapComment(visit.visitItem)}/>
                        </td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              }
            </div>
            <Card className="w-50 md:w-30 lg:w-50">
               <PaginationTable
                  metadata={data?.visitsCount || {} as MetadataPagination}
                  valueSkip={skip}
                  setSkip={setSkip}
                  valueTake={take}
                  setTake={setTake}
                />
            </Card>
          </div>
        </div>
      </div>
      <ViewActivityModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        visit={visit}
        key={visit?.id}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        comments={visitComment || []}
        key={visitComment?.[0].id}
      />
      <MapsComponentComment
        isOpen={isCommentMapModalOpen}
        onClose={closeMapCommentModal}
        visitComment={visitCommentMap || []}
        key={visitCommentMap?.[0].id}
      />
    </>
    );
  };
  
  export default ActivityTable;
  