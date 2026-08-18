import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import LearnCourse from "./pages/LearnCourse";
import CourseCompleted from "./pages/CourseCompleted";
import Certificate from "./pages/Certificate";

import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import CourseManagement from "./pages/Admin/Course/CourseManagement";

import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminStudents from "./pages/Admin/Students/AdminStudents";
import AdminPayments from "./pages/Admin/Payments/AdminPayments";
import AdminAnalytics from "./pages/Admin/Analytics/AdminAnalytics";
import AdminReports from "./pages/Admin/Reports/AdminReports";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  return (
<Routes>

  {/* Public */}

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Login />} />

  <Route path="/courses" element={<Courses />} />
  <Route path="/courses/:id" element={<CourseDetails />} />

  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsAndConditions />} />
  <Route path="/faq" element={<Faq />} />



  {/* ================= STUDENT ================= */}

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["student"]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />

    <Route
      path="my-courses"
      element={<MyCourses />}
    />

    <Route
      path="learn/:id"
      element={<LearnCourse />}
    />

    <Route
      path="course/:id/completed"
      element={<CourseCompleted />}
    />

    <Route
      path="certificate/:id"
      element={<Certificate />}
    />
  </Route>



  {/* ================= ADMIN ================= */}

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="courses"
    element={<CourseManagement />}
  />

  <Route
    path="students"
    element={<AdminStudents />}
  />

  <Route
    path="payments"
    element={<AdminPayments />}
  />

  <Route
    path="analytics"
    element={<AdminAnalytics />}
  />

<Route
    path="reports"
    element={<AdminReports />}
/>
</Route>



  {/* 404 */}

  <Route path="*" element={<NotFound />} />

</Routes>
  );
}

export default App;