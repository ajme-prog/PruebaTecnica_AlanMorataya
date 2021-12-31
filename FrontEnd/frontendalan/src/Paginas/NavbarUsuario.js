
import React, {useRef,useContext} from 'react'
import { Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
const NavbarUsuario = () => {
    const {usuario,  cerrarSesion, iniciarSesion}=useContext(AuthContext);
    const navigate = useNavigate();
    function handlecerrarsesion(e){
        e.preventDefault();
        cerrarSesion();
        navigate("/")
    }

    function handleiravermispremios(e) {
      e.preventDefault();
  
      navigate("/mispremios")
    }

    
    function handleiracanjear(e) {
      e.preventDefault();
  
      navigate("/canjearpremios")
    }

    function handleirverpromociones(e) {
      e.preventDefault();
  
      navigate("/verpromocionesusuario")
    }
    return (
  <>
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand >Perfil Usuario</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link onClick={handleiravermispremios}>Ver mis premios</Nav.Link>
      <Nav.Link onClick={handleiracanjear}>Canjear premios</Nav.Link>
      <Nav.Link onClick={handleirverpromociones}>Ver Promociones</Nav.Link>
 
    </Nav>
    <Nav>

      <Nav.Link onClick={handlecerrarsesion}>
        Logout
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</>
    );
}

export default NavbarUsuario