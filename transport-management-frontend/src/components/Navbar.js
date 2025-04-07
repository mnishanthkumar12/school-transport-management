import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: '#003566', 
        padding: '12px 20px',
        fontSize: '18px',
      }}
      variant="dark"
      sticky="top"
      className="shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: '#ffc300',
            fontWeight: '700',
            fontSize: '26px',
          }}
        >
           School Transport
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">

          <Nav className="me-auto" style={{ gap: '15px' }}>
            {user?.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/buses">Manage Buses</Nav.Link>
                <Nav.Link as={Link} to="/routes">Manage Routes</Nav.Link>
                <Nav.Link as={Link} to="/students">Manage Students</Nav.Link>
                <Nav.Link as={Link} to="/add-bus"> Add Bus</Nav.Link>
                <Nav.Link as={Link} to="/add-route"> Add Route</Nav.Link>
                <Nav.Link as={Link} to="/add-student"> Add Student</Nav.Link>
              </>
            )}

            {user?.role === 'incharge' && (
              <>
                <Nav.Link as={Link} to="/incharge-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/buses">Buses</Nav.Link>
                <Nav.Link as={Link} to="/routes">Routes</Nav.Link>
                <Nav.Link as={Link} to="/students">Students</Nav.Link>
              </>
            )}

            {user?.role === 'student' && (
              <>
                <Nav.Link as={Link} to="/student-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/routes">Routes</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <Button
                variant="outline-warning"
                size="sm"
                onClick={handleLogout}
                style={{ fontWeight: 'bold' }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ fontWeight: 'bold', color: '#ffc300' }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ fontWeight: 'bold', color: '#ffc300' }}>Signup</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
