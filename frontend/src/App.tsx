// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <div className='h-[88vh] border bg-gray-400 overflow-y-auto'>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="about" element={<About/>} />
//         <Route path="contact" element={<Contact/>} />
//       </Routes>
//       </div>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Course from "./pages/Course";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import LearnCourse from "./pages/LearnCourse";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
// import AddCourse from "./pages/AddCourse";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        }
      />
      
      <Route
  path="/courses/:id"
  element={
    <ProtectedRoute>
      <CourseDetails />
    </ProtectedRoute>
  }
/>

<Route 
    path="/my-courses" 
    element={<MyCourses />}
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
 path="/admin/dashboard"
 element={<AdminDashboard />}
/>


      {/* <Route
    path="/courses/new"
    element={
        <ProtectedRoute>
            <AddCourse />
        </ProtectedRoute>
    }
/> */}

    </Routes>
  );
}

export default App;