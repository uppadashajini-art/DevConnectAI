import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

// MAIN
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// PROJECTS
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";

// TASKS
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

// TEAM
import Team from "./pages/Team";

// OTHER
import Notifications from "./pages/Notifications";
import Files from "./pages/Files";
import Profile from "./pages/Profile";
import AIAssistant from "./pages/AIAssistant";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Home />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROJECTS */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >
              <EditProject />
            </ProtectedRoute>
          }
        />

        {/* TASKS */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <EditTask />
            </ProtectedRoute>
          }
        />

        {/* TEAM */}
        <Route
          path="/team"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
              ]}
            >
              <Team />
            </ProtectedRoute>
          }
        />

        {/* AI ASSISTANT */}
        <Route
          path="/ai"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* FILES */}
        <Route
          path="/files"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Files />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "PROJECT_MANAGER",
                "TEAM_MEMBER",
              ]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;