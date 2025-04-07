import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Alert } from 'react-bootstrap';

const user = JSON.parse(localStorage.getItem('user'));

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err.message);
      setError('Failed to fetch students.');
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center fw-bold text-primary">🎓 All Students</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive shadow rounded">
        <Table striped bordered hover className="align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Roll No</th>
              <th>Boarding Point</th>
              <th>Route</th>
              <th>Bus</th>
              <th>Fee</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>{s.section || 'N/A'}</td>
                  <td>{s.rollNumber || 'N/A'}</td>
                  <td>{s.boardingPoint}</td>
                  <td>{s.routePreference?.routeName || 'N/A'}</td>
                  <td>{s.busId?.numberPlate || 'N/A'}</td>
                  <td>₹{s.feeAmount}</td>
                  <td>
                    <span className={`badge ${s.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={user?.role !== 'admin'}
                      onClick={() => deleteStudent(s._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted py-3">No students found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default StudentList;
