import React from 'react';
import { Navigate } from 'react-router-dom';// Asumiendo que esta es la consulta GraphQL generada
import Cookies from 'js-cookie';
import { useValidateUserTokenQuery } from '../domain/graphql';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION);
  if(!token)  return <Navigate to="/login" />;
  const { loading, data, error } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: token,
      },
    },
    onError: () => {
      Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <div className="h-screen bg-[#5DADE2] dark:bg-[#007BFF] w-screen flex justify-center items-center flex-col">
        <img src="/loading.svg" alt="" /> <br />
        <img src="logo.png" alt="" />

      </div>
    );
  }

  // Si no se valida el token correctamente, redirigir al login
  if (!data || !data.validateUserToken) {
    Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
