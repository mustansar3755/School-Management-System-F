import {  Routes, Route, Navigate } from "react-router-dom";
// Context ki jagah Redux ka useSelector import karein
import { useSelector } from "react-redux"; 
import ProtectedRoute from "./ProtectedRoute";

// Auth
import LoginPage from "../pages/auth/LoginPage";

// SuperAdmin Pages
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import ManageSchools from "../pages/superadmin/ManageSchools";
import ManageAdmins from "../pages/superadmin/ManageAdmins";
import SystemSettings from "../pages/superadmin/SystemSettings";
import SuperAdminReports from "../pages/superadmin/SuperAdminReports";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageStudents from "../pages/admin/ManageStudents";
import ManageTeachers from "../pages/admin/ManageTeachers";
import ManageClasses from "../pages/admin/ManageClasses";
import ManageFees from "../pages/admin/ManageFees";
import Attendance from "../pages/admin/Attendance";
import AdminReports from "../pages/admin/AdminReports";

// Layouts
import SuperAdminLayout from "../components/superadmin/SuperAdminLayout";
import AdminLayout from "../components/admin/AdminLayout";


const AppRouter = () => {
  // Redux Store se user nikalein. 
  // (Note: Agar aap ki slice ka naam 'auth' ke bajaye kuch aur hai, to state.auth ko us ke mutabiq badal lein)
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "superadmin"
                    ? "/superadmin/dashboard"
                    : "/admin/dashboard"
                }
                replace
              />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* SuperAdmin Routes */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRole="superadmin">
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="schools" element={<ManageSchools />} />
          <Route path="admins" element={<ManageAdmins />} />
          <Route path="reports" element={<SuperAdminReports />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="classes" element={<ManageClasses />} />
          <Route path="fees" element={<ManageFees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? user.role === "superadmin"
                    ? "/superadmin/dashboard"
                    : "/admin/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;