import React from 'react';
import './App.css';
import Inicio from './Paginas/NavbarUsuario';
import LoginCorreo from './Paginas/LoginCorreo'
import LoginTelefono from './Paginas/LoginTelefono';
import Dashboardadmin from './Paginas/Dashboardadmin';
import Dashboardusuario from './Paginas/Dashboardusuario';
import Paginainicio from './Paginas/Paginadeincio';
import NuevoUsuario from './Paginas/NuevoUsuario';
import { AuthProvider } from './Context/AuthProvider'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (

    <div className="App">
   <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Paginainicio />} />
          <Route path="/logincorreo" element={<LoginCorreo />} />
          <Route path="/logintelefono" element={<LoginTelefono />} />
          <Route path="/admin" element={<Dashboardadmin />} />
          <Route path="/usuario" element={<Dashboardusuario />} />
          <Route path="/registro" element={<NuevoUsuario />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>

  );
}

export default App;
