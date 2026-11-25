import { lazy, Suspense } from "react";
import { Navigate, Routes, Route, useParams } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const LearnCourse = lazy(() => import("./pages/LearnCourse"));
const CourseCompleted = lazy(() => import("./pages/CourseCompleted"));
const Certificate = lazy(() => import("./pages/Certificate"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard/AdminDashboard"));
const CourseManagement = lazy(() => import("./pages/Admin/Course/CourseManagement"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Faq = lazy(() => import("./pages/Faq"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminStudents = lazy(() => import("./pages/Admin/Students/AdminStudents"));
const AdminPayments = lazy(() => import("./pages/Admin/Payments/AdminPayments"));
const AdminAnalytics = lazy(() => import("./pages/Admin/Analytics/AdminAnalytics"));
const AdminReports = lazy(() => import("./pages/Admin/Reports/AdminReports"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const Progress = lazy(() => import("./pages/Progress"));
const Certificates = lazy(() => import("./pages/Certificates"));
const GoogleOAuthProvider = lazy(async () => {
  const { GoogleOAuthProvider: Provider } = await import("@react-oauth/google");
  return { default: Provider };
});

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AuthPage = () =>
  googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Login />
    </GoogleOAuthProvider>
  ) : (
    <Login />
  );

const LegacyCertificateRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/dashboard/certificate/${id}`} replace />;
};

function App() {
  return (
<Suspense
  fallback={
    <main
      className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-medium text-slate-800 dark:bg-slate-950 dark:text-slate-200"
      role="status"
      aria-live="polite"
    >
      Loading Learnyfy...
    </main>
  }
>
<Routes>

  {/* Public */}

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<AuthPage />} />
  <Route path="/signup" element={<AuthPage />} />

  <Route path="/courses" element={<Courses />} />
  <Route path="/courses/:id" element={<CourseDetails />} />
  <Route path="/courses/:id/preview" element={<LearnCourse />} />
  <Route
    path="/courses/:id/preview/lesson/:lesson"
    element={<LearnCourse />}
  />

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
      path="progress"
      element={<Progress />}
    />

    <Route
      path="certificates"
      element={<Certificates />}
    />

    <Route
      path="learn/:id"
      element={<LearnCourse />}
    />

    <Route
      path="learn/:id/lesson/:lesson"
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

  <Route
    path="/my-progress"
    element={<Navigate to="/dashboard/progress" replace />}
  />

  <Route
    path="/certificate/:id"
    element={<LegacyCertificateRedirect />}
  />



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


<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>



  {/* 404 */}

  <Route path="*" element={<NotFound />} />

</Routes>
</Suspense>
  );
}

export default App;