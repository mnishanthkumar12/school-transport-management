import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const InchargeDashboard = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4 p-4 text-center">
        <h2 className="text-primary mb-4 fw-bold"> Incharge Dashboard</h2>
        
        <div className="d-flex flex-column gap-3 align-items-center">
          <Link to="/incharge-tracker">
            <Button variant="success" size="lg" className="px-4 rounded-3">
               Track My Bus
            </Button>
          </Link>

      
        </div>
      </Card>
    </Container>
  );
};

export default InchargeDashboard;
