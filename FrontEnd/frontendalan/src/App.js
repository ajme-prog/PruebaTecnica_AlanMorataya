import React from 'react';
import './App.css';
import Inicio from './Paginas/NavbarUsuario';
import LoginCorreo from './Paginas/LoginCorreo'
import LoginTelefono from './Paginas/LoginTelefono';
import Dashboardadmin from './Paginas/Dashboardadmin';
import Dashboardusuario from './Paginas/Dashboardusuario';
import Paginainicio from './Paginas/Paginadeincio';
import NuevoUsuario from './Paginas/NuevoUsuario';
import NuevoPremio from './Paginas/NuevoPremio';
import VerUsuarios from './Paginas/VerUsuarios';
import VerPremios from './Paginas/VerPremios'
import { AuthProvider } from './Context/AuthProvider'
import VermisPremios from './Paginas/VerMisPremios'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (

  
   <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Paginainicio />} />
          <Route path="/logincorreo" element={<LoginCorreo />} />
          <Route path="/logintelefono" element={<LoginTelefono />} />
          <Route path="/admin" element={<Dashboardadmin />} />
          <Route path="/usuario" element={<Dashboardusuario />} />
          <Route path="/registro" element={<NuevoUsuario />} />
          <Route path="/registropremio" element={<NuevoPremio />} />
          <Route path="/verusuarios" element={<VerUsuarios />} />
          <Route path="/verpremios" element={<VerPremios />} />
          <Route path="/vermispremios" element={<VermisPremios />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>


  );
}

export default App;
