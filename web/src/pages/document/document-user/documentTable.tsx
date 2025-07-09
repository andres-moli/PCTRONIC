import { useEffect, useState } from "react";
import Card from "../../../components/cards/Card";
import TableSkeleton from "../../../components/esqueleto/table";
import { DocumentoUsuario, MetadataPagination, OrderTypes, TipoDocumento, Tool, useDocumentosUsuarioQuery, useTiposDocumentoQuery, useToolsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { BsEyeFill, BsFiles } from "react-icons/bs";
import { PaginationTable } from "../../../components/table/PaginationTable";
import ModalUpdateTools from "./modalUpdate";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import ModalUpdateDocumentUser from "./modalUpdate";
import { onClickDocument } from "../../../lib/utils";

const DocumentUserTable = () => {
  const {closeModal, isOpen, openModal} = useModal()
  const takeValue = 10
  const [skip, setSkip] = useState(0)
  const [tipoDocumento,settipoDocumento] = useState<DocumentoUsuario>()
  const {data, loading, refetch} = useDocumentosUsuarioQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
    }
  })
  const onShown = (doc: DocumentoUsuario) => {
    settipoDocumento(doc)
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
                      Trabajador
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tipo documento
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Documento
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.documentosUsuario.map((doc)=> {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{doc.usuario.fullName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{doc.tipoDocumento.nombre}</td>
                        <td className="whitespace-nowrap px-6 py-4">{dayjs(doc.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BsFiles className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" 
                          onClick={() => onClickDocument(doc.file.url)}
                          />
                        </td>
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
              <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.documentosUsuarioCount as MetadataPagination} takeValue={takeValue} />
            </Card>
          </div>
        </div>
      </div>
      <ModalUpdateDocumentUser 
        isOpen={isOpen}
        onClose={closeModal}
        documentoUsers={tipoDocumento}
        key={tipoDocumento?.id}
      />
    </>
    );
};
  
export default DocumentUserTable;
  