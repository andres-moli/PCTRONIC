import React, { useEffect, useState } from "react";
import { useUsersQuery } from "../../../domain/graphql";  // Asegúrate de importar correctamente tu consulta de GraphQL

interface UserSelectProps {
  onSelect: (user: any) => void; 
  clear?: boolean; // Recibe una función para manejar la selección
}

const UserSelect: React.FC<UserSelectProps> = ({ onSelect, clear }) => {
  const { data, loading, error, refetch } = useUsersQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 999999,
      },
    },
  });
  const [selectUser,setSelectUser] = useState('')
  useEffect(()=> {
    if(clear){
        setSelectUser('')
    }
  }, [clear])
  // Si hay error o está cargando, mostramos un mensaje
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users. Please try again later.</div>;
  }
  const onSelectFunction = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectUser(e.target.value)
    onSelect(e.target.value)
  }

  return (
    <div className="user-select-container">
      <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Usuario</label>
      <select
        name="user"
        id="user"
        value={selectUser}
        onChange={onSelectFunction}
        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        >
        <option value={''} >Seleccionar Usuario</option>
        {data?.users?.map((user: any) => (
            <option value={user.id} >{user.fullName}</option>
        ))}
        </select>
    </div>
  );
};

export default UserSelect;
