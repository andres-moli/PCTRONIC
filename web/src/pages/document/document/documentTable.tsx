import { useEffect, useState } from "react";
import Card from "../../../components/cards/Card";
import TableSkeleton from "../../../components/esqueleto/table";
import { MetadataPagination, OrderTypes, TipoDocumento, Tool, useTiposDocumentoQuery, useToolsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { BsEyeFill } from "react-icons/bs";
import { PaginationTable } from "../../../components/table/PaginationTable";
import ModalUpdateTools from "./modalUpdate";
import useModal from "../../../hooks/useModal";

const DocumentTable = () => {
  const {closeModal, isOpen, openModal} = useModal()
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0)
  const [tipoDocumento,settipoDocumento] = useState<TipoDocumento>()
  const {data, loading, refetch} = useTiposDocumentoQuery({
    variables: {
      pagination: {
        skip,
        take: take
      }
    }
  })
  const onShown = (tool: TipoDocumento) => {
    settipoDocumento(tool)
    openModal()
  }
  return (
      <>
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
                      Descripción
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ¿Es obligatorio?
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ¿Está activo?
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.tiposDocumento.map((doc)=> {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{doc.nombre}</td>
                        <td className="whitespace-nowrap px-6 py-4">{doc.descripcion}</td>
                        <td className="whitespace-nowrap px-6 py-4">{doc.obligatorio ? 'SI' : 'NO'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{doc.activo ? 'SI' : 'NO'}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BsEyeFill className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" title="Ver" 
                          // @ts-ignore
                          onClick={()=> onShown(doc)}/>
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
                metadata={data?.tiposDocumentoCount || {} as MetadataPagination}
                valueSkip={skip}
                setSkip={setSkip}
                valueTake={take}
                setTake={setTake}
              />
            </Card>
          </div>
        </div>
      </div>
      <ModalUpdateTools 
        isOpen={isOpen}
        onClose={closeModal}
        tipoDocumento={tipoDocumento}
        key={tipoDocumento?.id}
      />
    </>
    );
};
  
export default DocumentTable;
  