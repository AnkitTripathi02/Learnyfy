import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import LearnCourse from "./pages/LearnCourse";

import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import CourseManagement from "./pages/Admin/Course/CourseManagement";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import CourseCompleted from "./pages/CourseCompleted";
import Certificate from "./pages/Certificate";


function App() {
    return (
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />

            <Route path="/courses" element={<Courses />} />

            <Route
                path="/courses/:id"
                element={<CourseDetails />}
            />

            <Route
                path="/privacy"
                element={<PrivacyPolicy />}
            />

            <Route
                path="/terms"
                element={<TermsAndConditions />}
            />

            <Route
                path="/faq"
                element={<Faq />}
            />

            {/* ================= STUDENT ROUTES ================= */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-courses"
                element={
                    <ProtectedRoute>
                        <MyCourses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/learn/:id"
                element={
                    <ProtectedRoute>
                        <LearnCourse />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/course/:id/completed"
                element={
                    <ProtectedRoute>
                        <CourseCompleted />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/certificate/:id"
                element={
                    <ProtectedRoute>
                        <Certificate />
                    </ProtectedRoute>
                }
            />

            {/* ================= ADMIN ROUTES ================= */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/courses"
                element={
                    <ProtectedRoute>
                        <CourseManagement />
                    </ProtectedRoute>
                }
            />

            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default App;