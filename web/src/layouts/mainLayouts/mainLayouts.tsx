import React, { ReactNode } from 'react';
import NavBar from '../../components/navbar/navBar';
import SideBar from '../../components/sidebar/sideBar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-grow ml-64"> {/* Agrega ml-64 para evitar superposición */}
        <NavBar />
        <main className="p-6 bg-gray-100 flex-grow mt-16"> {/* Agrega mt-16 para evitar superposición */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
