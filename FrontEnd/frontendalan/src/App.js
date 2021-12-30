import React from 'react';
import './App.css';
import Inicio from './Paginas/NavbarUsuario';
import LoginTelefono from './Paginas/LoginCorreo'
import Dashboardadmin from './Paginas/Dashboardadmin';
import Dashboardusuario from './Paginas/Dashboardusuario';
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

          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<LoginTelefono />} />
          <Route path="/admin" element={<Dashboardadmin />} />
          <Route path="/usuario" element={<Dashboardusuario />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>

  );
}

export default App;
