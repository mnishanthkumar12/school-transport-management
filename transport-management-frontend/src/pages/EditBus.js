import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busData, setBusData] = useState({
    numberPlate: '',
    capacity: '',
    driverName: '',
    driverContact: '',
    driverLicense: '',
    cleanerName: '',
    cleanerContact: '',
    inchargeName: '',
    inchargeContact: '',
    inchargeEmail: '',
    routeId: ''
  });

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/routes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/buses/${id}`)
      .then(res => setBusData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/buses/${id}`, busData)
      .then(() => navigate('/buses'))
      .catch(err => console.error(err));
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow rounded-4">
        <h2 className="text-center mb-4"> Edit Bus</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Number Plate</Form.Label>
                <Form.Control
                  type="text"
                  name="numberPlate"
                  value={busData.numberPlate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  value={busData.capacity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Driver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="driverName"
                  value={busData.driverName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Driver Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="driverContact"
                  value={busData.driverContact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Driver License</Form.Label>
                <Form.Control
                  type="text"
                  name="driverLicense"
                  value={busData.driverLicense}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Cleaner Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cleanerName"
                  value={busData.cleanerName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Cleaner Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="cleanerContact"
                  value={busData.cleanerContact}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Incharge Name</Form.Label>
                <Form.Control
                  type="text"
                  name="inchargeName"
                  value={busData.inchargeName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Incharge Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="inchargeContact"
                  value={busData.inchargeContact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Incharge Email</Form.Label>
                <Form.Control
                  type="email"
                  name="inchargeEmail"
                  value={busData.inchargeEmail}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Select Route</Form.Label>
            <Form.Select
              name="routeId"
              value={busData.routeId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Route --</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routeName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary" size="lg">
               Update Bus
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditBus;
