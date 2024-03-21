// import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
function NavBar() {
  return (
    <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
      <Container >
        <Navbar.Brand href="#home">Smart Route</Navbar.Brand>
       
          <Nav className="me-auto">

          {/* <NavLink exact to="/createroute" activeClassName="activeClicked">CreateRoute</NavLink> */}

            <Nav.Link href="/CreateRoute">Create Route</Nav.Link>
            <Nav.Link href="/MapSpace">MapSpace</Nav.Link>
            <Nav.Link href="/Directions">Directions</Nav.Link>
            <Nav.Link href="/TabInputButton">Input Tests</Nav.Link>
            <Nav.Link href="/LocationSearch">Location Search</Nav.Link>
            <Nav.Link href="/ParentComponent">parent</Nav.Link>
            <Nav.Link href="/APIComponent">API</Nav.Link>
            <Nav.Link href="/GetDirectionsMapOver">GDMO</Nav.Link>
            <Nav.Link href="/addremovestopoutside">ARSO</Nav.Link>

          </Nav>
       
      </Container>
    </Navbar>
  );
}

export default NavBar;