import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import UserPage from '../pages/user';
import LoginPage from '../pages/login';
import ProtectedRoute from './ProtectedRoute'; // Importamos el componente ProtectedRoute
import ActivityPage from '../pages/Activity';
import ReportPage from '../pages/report';
import RoutersPage from '../pages/routers';
import TimeRealPage from '../pages/timeReal';
import MapOnePage from '../pages/Map';
import MapMultiplePage from '../pages/Map/mapMulti';
import ToolsPage from '../pages/tools/tools';
import ToolsItemPage from '../pages/tools/tools-item';
import DocumentPage from '../pages/document/document';
import DocumentUserPage from '../pages/document/document-user';
import VisitTypePage from '../pages/visit-tpe';
import ProyectPage from '../pages/project';
import CalendarPage from '../pages/calendar';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="login" element={<LoginPage />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Dashboard />} />
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute element={<UserPage />} />
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute element={<ActivityPage />} />
          }
        />
        <Route
          path="/visit-type"
          element={
            <ProtectedRoute element={<VisitTypePage />} />
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute element={<ReportPage />} />
          }
        />
        <Route
          path="/routers"
          element={
            <ProtectedRoute element={<RoutersPage />} />
          }
        />
        <Route
          path="/location"
          element={
            <ProtectedRoute element={<TimeRealPage />} />
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute element={<ToolsPage />} />
          }
        />
        <Route
          path="/tools-item"
          element={
            <ProtectedRoute element={<ToolsItemPage />} />
          }
        />
        <Route
          path="/document"
          element={
            <ProtectedRoute element={<DocumentPage />} />
          }
        />
        <Route
          path="/document-user"
          element={
            <ProtectedRoute element={<DocumentUserPage />} />
          }
        />
        <Route
          path="/proyect"
          element={
            <ProtectedRoute element={<ProyectPage />} />
          }
        ></Route>
        <Route
          path="/locationFree/:lat/:lon"
          element={
            <MapOnePage/>
          }
        />
        {/* /map/40.7128,-74.0060;34.0522,-118.2437;37.7749,-122.4194 */}
        <Route
          path="/locationMulti/:locations"
          element={
            <MapMultiplePage/>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute element={<CalendarPage />} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
