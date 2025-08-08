import { BiFile, BiLogOut, BiSolidFile } from "react-icons/bi";
import { FaHome, FaStore, FaBox, FaTags, FaClipboardList, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { FaFileCirclePlus, FaFolderOpen, FaMapLocation } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { BsFillPinMapFill, BsTools, BsTypeBold } from "react-icons/bs";
import { PiMapPinLineFill } from "react-icons/pi";
import { FcDocument } from "react-icons/fc";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { CalendarDaysIcon, FolderArchiveIcon, MapPinCheckIcon, Settings } from "lucide-react";
import { GrSettingsOption } from "react-icons/gr";

const SideBar = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    navigate('/login')
  }
  return (
    <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xs font-bold text-gray-800">INICIO</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaHome className="w-5 h-5 text-gray-500 mr-3" />
              Dashboard
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">ACTIVIDADES</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/activity"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaTags className="w-5 h-5 text-gray-500 mr-3" />
              Actividades
            </a>
          </li>
          <li>
            <a
              href="/visit-type"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <GrSettingsOption className="w-5 h-5 text-gray-500 mr-3" />
              Tipo visita
            </a>
          </li>
          <li>
            <a
              href="/report"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaClipboardList className="w-5 h-5 text-gray-500 mr-3" />
              Reportes
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">Proyecto</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/proyect"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaFolderOpen className="w-5 h-5 text-gray-500 mr-3" />
              Proyectos
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">Mapa</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/routers"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaMapLocation className="w-5 h-5 text-gray-500 mr-3" />
              Rutas
            </a>
          </li>
          {/* <li>
            <a
              href="/location"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <PiMapPinLineFill className="w-5 h-5 text-gray-500 mr-3" />
              Ubicacion
            </a>
          </li> */}
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">Calendario</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/calendar"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <CalendarDaysIcon className="w-5 h-5 text-gray-500 mr-3" />
              Calendario
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">Herramientas</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/tools-item"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BsTools className="w-5 h-5 text-gray-500 mr-3" />
              Herramientas
            </a>
          </li>
          <li>
            <a
              href="/tools"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaTags className="w-5 h-5 text-gray-500 mr-3" />
              Categorias
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">Documentos</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/document"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BiSolidFile className="w-5 h-5 text-gray-500 mr-3" />
              Tipos Documentos
            </a>
          </li>
          <li>
            <a
              href="/document-user"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaFileCirclePlus className="w-5 h-5 text-gray-500 mr-3" />
              Documento usuario
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">USUARIOS </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/user"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FaUser className="w-5 h-5 text-gray-500 mr-3" />
              Usuarios
            </a>
          </li>
        </ul>
        <h2 className="mt-6 text-xs font-bold text-gray-800">LOUGUT</h2>
        <ul className="mt-4 space-y-2">
          <li onClick={onLogout}>
            <a
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <BiLogOut className="w-5 h-5 text-gray-500 mr-3" />
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
