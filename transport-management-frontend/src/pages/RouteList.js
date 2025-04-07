import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Alert } from 'react-bootstrap';

const user = JSON.parse(localStorage.getItem('user'));

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');

  const fetchRoutes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/routes');
      setRoutes(res.data);
    } catch (err) {
      console.error('Error fetching routes:', err.message);
      setError('Failed to load routes.');
    }
  };

  const deleteRoute = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await axios.delete(`http://localhost:5000/api/routes/${id}`);
        fetchRoutes();
      } catch (err) {
        console.error('Error deleting route:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 text-success fw-bold">Route List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive shadow rounded">
        <Table striped bordered hover className="align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Route Name</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Stops</th>
              <th>Driver</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.length > 0 ? (
              routes.map((route) => (
                <tr key={route._id}>
                  <td>{route.routeName}</td>
                  <td>{route.startPoint}</td>
                  <td>{route.endPoint}</td>
                  <td>
                    {route.stops?.map((stop, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        {stop.name}
                      </span>
                    ))}
                  </td>
                  <td>{route.driver}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={user?.role !== 'admin'}
                      onClick={() => deleteRoute(route._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">No routes available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default RouteList;
