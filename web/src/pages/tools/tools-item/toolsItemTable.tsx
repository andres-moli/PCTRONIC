import { useEffect, useState } from "react";
import Card from "../../../components/cards/Card";
import TableSkeleton from "../../../components/esqueleto/table";
import { MetadataPagination, OrderTypes, Tool, ToolUnit, useToolsItemsQuery, useToolsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { BsEyeFill } from "react-icons/bs";
import { PaginationTable } from "../../../components/table/PaginationTable";
import useModal from "../../../hooks/useModal";
import { traducirEstadoHerramienta } from "../../../lib/utils";
import ModalUpdateToolsItem from "./modalUpdate";

const ToolsItemTable = () => {
  const {closeModal, isOpen, openModal} = useModal()
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0)
  const [tool,setTool] = useState<ToolUnit>()
  const {data, loading, refetch} = useToolsItemsQuery({
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
  };
  const onShown = (tool: ToolUnit) => {
    setTool(tool)
    openModal()
  }
  return (
      <>
        <div className="w-full md:w-full lg:w-full">
          <div className="flex justify-between items-center space-x-4">
            {/* Filtro de Estado */}
            {/* Filtro de Descripción */}
            <div className="flex-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre o referencia</label>
              <input
                type="text"
                name="description"
                id="description"
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Escribe un nombre..."
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Herramienta
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.ToolsItems.map((tool)=> {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{tool.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{traducirEstadoHerramienta(tool.status)}</td>
                        <td className="whitespace-nowrap px-6 py-4">{tool.tool.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BsEyeFill className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver" 
                          // @ts-ignore
                          onClick={()=> onShown(tool)}/>
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
                  metadata={data?.ToolsItemsCount || {} as MetadataPagination}
                  valueSkip={skip}
                  setSkip={setSkip}
                  valueTake={take}
                  setTake={setTake}
                />
            </Card>
          </div>
        </div>
      </div>
      <ModalUpdateToolsItem 
        isOpen={isOpen}
        onClose={closeModal}
        tool={tool}
        key={tool?.id + tool?.updatedAt}
      />
    </>
    );
};
  
export default ToolsItemTable;
  