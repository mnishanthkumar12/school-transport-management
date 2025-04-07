// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import BusList from './pages/BusList';
// import RouteList from './pages/RouteList';
// import StudentList from './pages/StudentList';
// import AddBus from './pages/AddBus';
// import AddRoute from './pages/AddRoute';
// import AddStudent from './pages/AddStudent';
// import Navbar from './components/Navbar';
// import EditBus from './pages/EditBus';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// function App() {
//   const [user, setUser] = useState(null);
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/buses" element={<BusList />} />
//         <Route path="/edit-bus/:id" element={<EditBus />} />

//         <Route path="/routes" element={<RouteList />} />
//         <Route path="/students" element={<StudentList />} />
//         <Route path="/add-bus" element={<AddBus />} />
//         <Route path="/add-route" element={<AddRoute />} />
//         <Route path="/add-student" element={<AddStudent />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InchargeTracker from './pages/InchargeTracker'; // ✅ Import this at the top
import ParentTracker from './pages/ParentTracker';
import AppNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import BusList from './pages/BusList';
import RouteList from './pages/RouteList';
import StudentList from './pages/StudentList';
import AddBus from './pages/AddBus';
import AddRoute from './pages/AddRoute';
import AddStudent from './pages/AddStudent';
import EditBus from './pages/EditBus';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import InchargeDashboard from './pages/InchargeDashboard';
import AdminTracker from "./pages/AdminTracker";

const PrivateRoute = ({ children, allowedRoles, user }) => {
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('✅ Loaded user from localStorage:', storedUser);
      const parsedUser = JSON.parse(storedUser);
if (parsedUser.id && !parsedUser._id) parsedUser._id = parsedUser.id;
setUser(parsedUser);

    }
  }, []);

  return (
    <Router>
      <AppNavbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

        {/* Dashboards */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute allowedRoles={['student']} user={user}>
              <StudentDashboard user={user} />
            </PrivateRoute>
          }
        />
        <Route
  path="/parent-tracker/:busId"
  element={
    <PrivateRoute allowedRoles={['student']} user={user}>
      <ParentTracker />
    </PrivateRoute>
  }
/>
<Route
          path="/admin-tracker"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <AdminTracker/>
            </PrivateRoute>
          }
        />
        <Route
          path="/incharge-dashboard"
          element={
            <PrivateRoute allowedRoles={['incharge']} user={user}>
              <InchargeDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin-only Pages */}
        <Route
          path="/buses"
          element={
            <PrivateRoute allowedRoles={['admin','incharge']} user={user}>
              <BusList />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-bus/:id"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <EditBus />
            </PrivateRoute>
          }
        />
        <Route
          path="/incharge-tracker"
          element={
            <PrivateRoute allowedRoles={['incharge']} user={user}>
              <InchargeTracker/>
            </PrivateRoute>
          }
        />

        <Route
          path="/routes"
          element={
            <PrivateRoute allowedRoles={['admin','incharge','student']} user={user}>
              <RouteList />
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute allowedRoles={['admin','incharge']} user={user}>
              <StudentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-bus"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <AddBus />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-route"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <AddRoute />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute allowedRoles={['admin']} user={user}>
              <AddStudent />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

